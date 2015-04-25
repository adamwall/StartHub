'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Project = mongoose.model('Project');

/**
 * Globals
 */
var user, project;

/**
 * Unit tests
 */
describe('Project Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			city: 'city',
			state: 'state',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			project = new Project({
                title: 'test project',
                description: 'desc',
                industry: 'test ind',
                referred: '',
                created: Date.now(),
				tags: 'tags',
				location: 'location',
                user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return project.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) {
			project.title = '';

			return project.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	describe('Create Tags', function() {
		it('should show tag when project created with one tags', function(done) {
			project.tags.should.equal('tags');
			done();
		});

		it('should not show tag when project created with no tags', function(done) {
			var projectObj = new Project({
				title: 'test project',
				description: 'desc',
				industry: 'test ind',
				referred: '',
				created: Date.now(),
				tags: '',
				user: user
			});
			projectObj.tags.should.equal('');
			done();
		});

		it('should show multiple tags when project created with tags separated by spaces', function(done) {
			var projectObj = new Project({
				title: 'test project',
				description: 'desc',
				industry: 'test ind',
				referred: '',
				created: Date.now(),
				tags: 'tag1 tag2 tag3',
				user: user
			});
			projectObj.tags.should.equal('tag1 tag2 tag3');
			done();
		});
	});

	describe(' Project Location', function() {
		it('should show location in view project page when project is created with location', function(done) {
			project.location.should.equal('location');
			done();
		});

		it('should not show location when project created with no location', function(done) {
			var projectObj = new Project({
				title: 'test project',
				description: 'desc',
				industry: 'test ind',
				referred: '',
				created: Date.now(),
				tags: 'tags',
				location: '',
				user: user
			});
			projectObj.location.should.equal('');
			done();
		});
	});

	describe('Method Find', function() {
		it('should be able to save without problems', function(done) {
			return project.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) {
			project.title = '';

			return project.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Project.remove().exec();
		User.remove().exec();

		done();
	});
});
