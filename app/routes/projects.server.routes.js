'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var projects = require('../../app/controllers/projects.server.controller');
	var votes = require('../../app/controllers/votes.server.controller');

	// Projects Routes
	app.route('/projects')
		.get(projects.list)
		.post(users.requiresLogin, projects.create);

	app.route('/projects/:projectId')
		.get(projects.read)
		.put(users.requiresLogin, projects.hasAuthorization, projects.update)
		.delete(users.requiresLogin, projects.hasAuthorization, projects.delete);

	app.route('/projects/:projectId/votes')
		.get(votes.list)
		.post(users.requiresLogin, votes.create);

	//advanced for later
	/*
	app.route('/projects/:projectId/votes/:voteId')
		.put(users.requiresLogin, votes.hasAuthorization, votes.update)
		.delete(users.requiresLogin, votes.hasAuthorization, votes.delete);
	*/

	// Finish by binding the Project middleware
	app.param('projectId', projects.projectByID);
};
