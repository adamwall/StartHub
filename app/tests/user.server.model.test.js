'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * Globals
 */
var user, user2;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function() {
	before(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			city: 'Naperville',
			state: 'Illinois',
			username: 'username',
			password: 'password',
			provider: 'local'
		});
		user2 = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			city: 'Addison',
			state: 'Illinois',
			username: 'username',
			password: 'password',
			provider: 'local'
		});

		done();
	});

	describe('User City', function() {
		it('should show user city in database when user is created with city', function(done) {
			user.city.should.equal('Naperville');
			done();
		});

		it('should not show user state when user created with no location', function(done) {
			var userObj = new User({
				firstName: 'Full',
				lastName: 'Name',
				displayName: 'Full Name',
				email: 'test@test.com',
				city: '',
				state: 'Illinois',
				username: 'username',
				password: 'password',
				provider: 'local'
			});
			userObj.city.should.equal('');
			done();
		});
	});

	describe('User State', function() {
		it('should show user state in database when user is created with state', function(done) {
			user.state.should.equal('Illinois');
			done();
		});

		it('should not show user state when user created with no state', function(done) {
			var userObj = new User({
				firstName: 'Full',
				lastName: 'Name',
				displayName: 'Full Name',
				email: 'test@test.com',
				city: '',
				state: '',
				username: 'username',
				password: 'password',
				provider: 'local'
			});
			userObj.state.should.equal('');
			done();
		});
	});

	describe('Method Save', function() {
		it('should begin with no users', function(done) {
			User.find({}, function(err, users) {
				users.should.have.length(0);
				done();
			});
		});

		it('should be able to save without problems', function(done) {
			user.save(done);
		});

		it('should fail to save an existing user again', function(done) {
			user.save();
			return user2.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without first name', function(done) {
			user.firstName = '';
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	after(function(done) {
		User.remove().exec();
		done();
	});
});
