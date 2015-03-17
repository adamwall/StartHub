'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Comment = mongoose.model('Comment');

/**
 * Globals
 */
var user, comment;

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

        it('should have error when saving without projectid', function(done) {
            comment.projectid ='';
            return comment.save(function(err) {
                should.exist(err);
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
