'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var projects = require('../../app/controllers/projects.server.controller');
    var comment = require('../../app/controllers/comment.server.controller');
    var multipart = require('connect-multiparty');
    var multipartMiddleware = multipart();


	// Projects Routes
	app.route('/projects')
		.get(projects.list)
		.post(users.requiresLogin, projects.create);


    app.get('/projects/img/:projectId', function(req, res){
        var projectId = req.project._id;
        fs.exists(path.join(__dirname, '../img/' + projectId + '/logo.jpg'), function(exists){
            if(exists){
                res.sendFile(path.join(__dirname, '../img/' + projectId + '/logo.jpg'));
            }
            else{
                //we want the default logo
                res.sendFile(path.join(__dirname, '../img/default.jpg'));
            }
        });
    });

    app.route('/projects/img/:projectId')
        .post(multipartMiddleware, projects.saveImg);


	app.route('/projects/:projectId')
		.get(projects.read)
		.put(users.requiresLogin, projects.hasAuthorization, projects.update)
		.delete(users.requiresLogin, projects.hasAuthorization, projects.delete);

    app.route('/projects/:projectId/comment')
        .post(comment.create)
        .get(comment.list)
        .put(comment.delete);
	// Finish by binding the Project middleware
	app.param('projectId', projects.projectByID);
};
