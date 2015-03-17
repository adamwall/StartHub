'use strict';

var should = require('should'),
    request = require('supertest'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Comment = mongoose.model('Comment'),
    Project = mongoose.model('Project'),
    agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, comment, project;
describe('Comment Route tests', function() {
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

        user.save();

        project = new Project({
            title: 'Project Name',
            description: 'desc',
            industry: 'test ind',
            referred: '',
            created: Date.now(),
            user: user._id
        });

        // Save a project to the test db and create new comment
        project.save(function () {
            comment = {
                author: user.username,
                message: 'hello comment',
                projectid: project._id,
                date: Date.now()
            };

            done();
        });
    });

    it('should be able to save Comment instance if logged in on a project page', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);
                // Get the userId
                var author = user.username;
                var projectObj = new Project(project);

                // Save a new comment
                agent.post('/projects/' + projectObj._id + '/comment')
                    .send(comment)
                    .expect(200)
                    .end(function(commentSaveErr, commentSaveRes) {
                        // Handle comment save error
                        if (commentSaveErr) done(commentSaveErr);

                        // Get a list of comments
                        agent.get('/projects/' + projectObj._id + '/comment')
                            .end(function(commentGetErr, commentGetRes) {
                                // Handle comment save error
                                if (commentGetErr) done(commentGetErr);

                                // Get Comment list
                                var comments = commentGetRes.body;

                                // Set assertions
                                (comments[0].author).should.equal(author);
                                (comments[0].projectid).should.match((projectObj._id).toHexString());

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should be able to get a list of Comments if not signed in', function(done) {
        // Create new Project model instance
        var projectObj = new Project(project);
        projectObj.save(function() {
            //create new comment
            var commentObj = new Comment({
                author: user.username,
                message: 'hello comment',
                projectid: projectObj._id,
                date: Date.now()
            });
            // Save the Comment
            commentObj.save(function() {
                // Request Comments
                request(app).get('/projects/' + projectObj._id + '/comment')
                    .end(function(req, res) {
                        // Set assertion
                        res.body.should.be.an.Array.with.lengthOf(1);

                        // Call the assertion callback
                        done();
                    });

            });
        });
    });

    it('should give an error if trying to comment while not logged in', function(done) {
        comment.author=undefined;
        agent.post('/projects/' + comment.projectid + '/comment')
            .send(comment)
            .expect(401)
            .end(function(commentSaveErr, commentSaveRes) {
                // Call the assertion callback
                done(commentSaveErr);
            });
    });

    it('should be able to delete a comment if logged in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);
                // Get the userId
                var author = user.username;
                var projectObj = new Project({
                    title: 'Project Name2',
                    description: 'desc2',
                    industry: 'test ind2',
                    referred: '',
                    created: Date.now(),
                    user: user._id
                });
                projectObj.save();

                // Save a new comment
                agent.post('/projects/' + projectObj._id + '/comment')
                    .send(comment)
                    .expect(200)
                    .end(function (commentSaveErr, commentSaveRes) {
                        // Handle comment save error
                        if (commentSaveErr) done(commentSaveErr);

                        //delete the comment
                        agent.put('/projects/' + projectObj._id + '/comment')
                            .send(comment)
                            .expect(200)
                            .end(function (commentDelErr, commentDelRes) {
                                if(commentDelErr) done(commentDelErr);

                                agent.get('/projects/' + projectObj._id + '/comment')
                                    .end(function(req, res) {
                                        // Set assertion
                                        res.body.should.be.an.Array.with.lengthOf(0);

                                        // Call the assertion callback
                                        done();
                                    });
                            });
                    });
            });
    });
});
