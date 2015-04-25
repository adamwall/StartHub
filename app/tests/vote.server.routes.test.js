'use strict';

var should = require('should'),
    request = require('supertest'),
    app = require('../../server'),
    async = require('async'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Vote = mongoose.model('Vote'),
    Project = mongoose.model('Project'),
    agent = request.agent(app);


var credentials, user, vote, project;
describe('Vote Route tests', function() {
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

        // Save a project to the test db and create new vote
        project.save(function () {
            vote = {
                userid: user._id,
                score: 1,
                projectid: project._id,
                date: Date.now()
            };

            done();
        });
    });

    it('should be able to save Vote if logged in on projects', function (done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function (signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);
                // Get the userId
                var author = user._id;
                var projectObj = new Project(project);

                // Save a new vote
                agent.post('/projects/' + projectObj._id + '/votes')
                    .send(vote)
                    .expect(200)
                    .end(function (voteSaveErr, voteSaveRes) {
                        // Handle vote save error
                        if (voteSaveErr) done(voteSaveErr);

                        // Get a list of votes
                        agent.get('/projects/' + projectObj._id + '/votes')
                            .end(function (voteGetErr, voteGetRes) {
                                // Handle vote save error
                                if (voteGetErr) done(voteGetErr);

                                // Get vote list
                                var votes = voteGetRes.body;

                                // Set assertions
                                (votes[0].userid).should.equal(author.toHexString());
                                (votes[0].projectid).should.match((projectObj._id).toHexString());

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should be able to get a list of votes if not signed in', function(done) {
        // Create new Project model instance
        var projectObj = new Project(project);
        projectObj.save(function() {
            //create new vote
            var voteObj = new Vote({
                userid: user._id,
                score: 1,
                projectid: projectObj._id,
                date: Date.now()
            });
            // Save the vote
            voteObj.save(function() {
                // Request votes
                request(app).get('/projects/' + projectObj._id + '/votes')
                    .end(function(req, res) {
                        // Set assertion
                        res.body.should.be.an.Array.with.lengthOf(1);

                        // Call the assertion callback
                        done();
                    });

            });
        });
    });

    it('should give an error if trying to vote while not logged in', function(done) {
        agent.post('/projects/' + vote.projectid + '/votes')
            .send(vote)
            .expect(401)
            .end(function(voteSaveErr, voteSaveRes) {
                // Call the assertion callback
                done(voteSaveErr);
            });
    });

    it('should be able to delete vote instance if signed in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                var projectObj = new Project(project);

                // Save a new vote
                agent.post('/projects/' + projectObj._id + '/votes')
                    .send(vote)
                    .expect(200)
                    .end(function (voteSaveErr, voteSaveRes) {
                        // Handle vote save error
                        if (voteSaveErr) done(voteSaveErr);
                        //delete Vote
                        agent.delete('/projects/' + projectObj._id + '/votes/' + voteSaveRes.body._id)
                            .send(vote)
                            .expect(200)
                            .end(function(voteDeleteErr, voteDeleteRes) {
                                if(voteDeleteErr) done(voteDeleteErr);

                                // Set assertions
                                (voteDeleteRes.body._id).should.equal(voteSaveRes.body._id);

                                done();
                            });
                    });
            });
    });


    it('should be able to update vote instance if signed in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;
                var projectObj = new Project(project);

                // Save a new vote
                agent.post('/projects/' + projectObj._id + '/votes')
                    .send(vote)
                    .expect(200)
                    .end(function (voteSaveErr, voteSaveRes) {
                        // Handle vote save error
                        if (voteSaveErr) done(voteSaveErr);

                        // Update Vote score
                        vote.score = -1;

                        // Update existing vote
                        agent.put('/projects/' + projectObj._id + '/votes/' + voteSaveRes.body._id)
                            .send(vote)
                            .expect(200)
                            .end(function(voteUpdateErr, voteUpdateRes) {
                                // Handle Project update error
                                if (voteUpdateErr) done(voteUpdateErr);

                                // Set assertions
                                (voteUpdateRes.body._id).should.equal(voteSaveRes.body._id);
                                (voteUpdateRes.body.score).should.match(-1);

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });


    afterEach(function(done) {
        User.remove().exec();
        Project.remove().exec();
        done();
    });
});




var project1 = new Project({
    title: 'project1',
    description: 'desc1',
    industry: 'ind1',
    referred: '',
    created: Date.now()
}),
    project2 = new Project({
    title: 'project2',
    description: 'desc2',
    industry: 'ind2',
    referred: '',
    created: Date.now()
}),
    project3 = new Project({
    title: 'project3',
    description: 'desc3',
    industry: 'ind3',
    referred: '',
    created: Date.now()
});

async.each([project1, project2, project3], function(project, callback) {
    describe('Param Test', function() {
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

            // Save a user to the test db and create new Project
            user.save(function () {
                project.user = user._id;
            });

            // Save a project to the test db and create new vote
            project.save(function () {
                vote = {
                    userid: user._id,
                    score: 1,
                    projectid: project._id,
                    date: Date.now()
                };

                done();
            });
        });

        it('should be able to save vote instance with project title:' + project.title +' if logged in', function (done) {
            agent.post('/auth/signin')
                .send(credentials)
                .expect(200)
                .end(function (signinErr, signinRes) {
                    // Handle signin error
                    if (signinErr) done(signinErr);
                    // Get the userId
                    var author = user._id;
                    var projectObj = new Project(project);

                    // Save a new vote
                    agent.post('/projects/' + projectObj._id + '/votes')
                        .send(vote)
                        .expect(200)
                        .end(function (voteSaveErr, voteSaveRes) {
                            // Handle vote save error
                            if (voteSaveErr) done(voteSaveErr);

                            // Get a list of votes
                            agent.get('/projects/' + projectObj._id + '/votes')
                                .end(function (voteGetErr, voteGetRes) {
                                    // Handle vote save error
                                    if (voteGetErr) done(voteGetErr);

                                    // Get vote list
                                    var votes = voteGetRes.body;

                                    // Set assertions
                                    (votes[0].userid).should.equal(author.toHexString());
                                    (votes[0].projectid).should.match((projectObj._id).toHexString());

                                    // Call the assertion callback
                                    done();
                                });
                        });
                });
        });
        afterEach(function(done) {
            User.remove().exec();
            Project.remove().exec();
            done();
        });
    });
    callback();
});
