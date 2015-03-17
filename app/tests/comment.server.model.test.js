'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Comment = mongoose.model('Comment'),
    Project = mongoose.model('Project');

/**
 * Globals
 */
var user, comment, project;

/**
 * Unit tests
 */
describe('Comment Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

        //project._id = '111';
        //project = new Project({
        //    title: 'test project',
        //    description: 'desc',
        //    industry: 'test ind',
        //    referred: '',
        //    created: Date.now,
        //    user: user
        //});
        //
        //project.save();

		user.save(function() { 
			comment = new Comment({
                projectid: '111111111111',
                message: 'Hello World',
                author: 'username',
                date: Date.now()
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return comment.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Comment.remove().exec();
		User.remove().exec();

		done();
	});
});
