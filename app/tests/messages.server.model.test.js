'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Messages = mongoose.model('Messages'),
    request = require('supertest');
/**
 * Globals
 */
var user, messages, user2;

/**
 * Unit tests
 */
describe('Messages Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

        user2 = new User({
            firstName: 'Full2',
            lastName: 'Name2',
            displayName: 'Full2 Name2',
            email: 'test2@test2.com',
            username: 'username2',
            password: 'password2'
        });
        user2.save(function() {});

		user.save(function() { 
			messages = new Messages({
                userTo: user.username,
                userFrom: user2.username,
                messageSubject: 'hi',
                messageBody: 'hi world'
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return messages.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
        it('should be able to show an error when try to save with no userTo', function(done) {
            messages.userTo = '';

            return messages.save(function(err) {
                should.exist(err);
                done();
            });
        });
	});

    describe('Message List Routes', function() {
        it('get message list route', function(done) {
            request('localhost:3001').get(/messages/).expect(400).end(function(err, res){
                if(err){
                    done(err);
                }
                else{
                    done();
                }
            });
        });

        it('should be able to save a message', function(done) {
            request('localhost:3001').post('/messages/', messages).end(function(err, res){
                if(err){
                    done(err);
                }
                else{
                    done();
                }
            });
        });
    });

	afterEach(function(done) { 
		Messages.remove().exec();
		User.remove().exec();

		done();
	});
});
