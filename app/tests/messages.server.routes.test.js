'use strict';

var should = require('should'),
    request = require('supertest'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Messages = mongoose.model('Messages'),
    agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, user2, messages;

describe('Message Route tests', function() {
    beforeEach(function (done) {
        // Create user credentials
        credentials = {
            username: 'username',
            password: 'password'
        };

        // Create a new user
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: credentials.username,
            password: credentials.password,
            provider: 'local'
        });

        user2 = new User({
            firstName: 'Full2',
            lastName: 'Name2',
            displayName: 'Full2 Name2',
            email: 'test2@test2.com',
            username: 'username2',
            password: 'password2',
            provider: 'local'
        });

        user2.save();

        // Save a user to the test db and create new message
        user.save(function () {
            messages = {
                userTo: user.username,
                userFrom: user2.username,
                messageSubject: 'hi',
                messageBody: 'hi world'
            };

            done();
        });
    });

    it('should be able to save Message instance if logged in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);
                // Get the userId
                var userTo = user.username;

                // Save a new message
                agent.post('/messages')
                    .send(messages)
                    .expect(200)
                    .end(function(messagesSaveErr, messagesSaveRes) {
                        // Handle message save error
                        if (messagesSaveErr) done(messagesSaveErr);

                        // Get a list of messages
                        agent.get('/messages')
                            .end(function(messagesGetErr, messagesGetRes) {
                                // Handle messages save error
                                if (messagesGetErr) done(messagesGetErr);

                                // Get Comment list
                                var messages = messagesGetRes.body;

                                // Set assertions
                                (messages[0].userTo).should.equal(userTo);
                                (messages[0].messageSubject).should.match('hi');

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should not be able to save Message instance if not logged in', function(done) {
        messages.userFrom = '';
        agent.post('/messages')
            .send(messages)
            .expect(401)
            .end(function(messagesSaveErr, messagesSaveRes) {
                // Call the assertion callback
                done(messagesSaveErr);
            });
    });

    it('should not be able to save Message instance if userTo does not exist', function(done) {
        messages.userTo = '';
        agent.post('/messages')
            .send(messages)
            .expect(400)
            .end(function(messagesSaveErr, messagesSaveRes) {
                // Call the assertion callback
                done(messagesSaveErr);
            });
    });

    it('should be able to get a list of Messages if signed in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);
                // Get the userId
                var userTo = user.username;

                // Create new Comment model instance
                var messagesObj = new Messages(messages);

                // Save the Comment
                messagesObj.save(function () {
                    // Request messages
                    agent.get('/messages')
                        .end(function (req, res) {
                            // Set assertion
                            res.body.should.be.an.Array.with.lengthOf(2);

                            // Call the assertion callback22
                            done();
                        });

                });
            });
    });

    it('should NOT be able to get message list if not signed in', function(done) {
        // Create new message model instance
        var messagesObj = new Messages(messages);

        // Save the Comment
        messagesObj.save(function() {
            // Request messages
            request(app).get('/messages').expect(400).end(function(req, res) {
                    // Set assertion
                    res.body.should.be.an.Object.with.property('message','You must be logged in to view inbox.');

                    // Call the assertion callback
                    done();
                });

        });
    });
});
