'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var projects = require('../../app/controllers/projects.server.controller');
    var comment = require('../../app/controllers/comment.server.controller');
    var multipart = require('connect-multiparty');
    var multipartMiddleware = multipart();
    var fs = require('fs');
    var path = require('path');

	// Projects Routes
	app.route('/projects')
		.get(projects.list)
		.post(users.requiresLogin, projects.create);

    app.post('/projects/img/:projectId', multipartMiddleware, function(req, res){

        var mkdirSync = function (path) {
            try {
                fs.mkdirSync(path);
            } catch(e) {
                if ( e.code != 'EEXIST' ) throw e;
            }
        };

        var file_ = req.files.file;
        console.log(file_);
        console.log(req.files.file.path);
        var projectId = req.project._id;
        var img_dir = path.join(__dirname, '../img/' + projectId + '/');
        mkdirSync(img_dir);
        var img_path = path.join(img_dir, file_.originalFilename);
        console.log(img_path);
        fs.rename(req.files.file.path, img_path, function(err){
            if(err) console.log('ERROr ' + err);
            console.log('completed')
        })
    });

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
