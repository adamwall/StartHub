'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Project = mongoose.model('Project'),
	_ = require('lodash');

var fs = require('fs');
var path = require('path');

/**
 * Create a Project
 */
exports.create = function(req, res) {
	var project = new Project(req.body);
	project.user = req.user;

	project.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(project);
		}
	});
};

/**
 * Show the current Project
 */
exports.read = function(req, res) {
	res.jsonp(req.project);
};

/**
 * Update a Project
 */
exports.update = function(req, res) {
	var project = req.project ;

	project = _.extend(project , req.body);

	project.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(project);
		}
	});
};

/**
 * Delete an Project
 */
exports.delete = function(req, res) {
	var project = req.project ;

	project.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(project);
		}
	});
};

/**
 * List of Projects
 */
exports.list = function(req, res) { 
	Project.find().sort('-created').populate('user', 'displayName username').exec(function(err, projects) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(projects);
		}
	});
};

/**
 * Project middleware
 */
exports.projectByID = function(req, res, next, id) { 
	Project.findById(id).populate('user', 'displayName username').exec(function(err, project) {
		if (err) return next(err);
		if (! project) return next(new Error('Failed to load Project ' + id));
		req.project = project ;
		next();
	});
};

/**
 * Project authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.project.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

exports.saveImg = function(req, res){

    var mkdirSync = function (path) {
        try {
            fs.mkdirSync(path);
        } catch(e) {
            if ( e.code !== 'EEXIST' ) throw e;
        }
    };

    console.log(req.file_name);
    var projectId = req.project._id;
    var img_dir = path.join(__dirname, '../img/' + projectId + '/');
    mkdirSync(img_dir);
    var img_path = path.join(img_dir, req.fileName);
    fs.rename(req.files.file.path, img_path, function(err){
        if(err){
            console.log('ERROr ' + err);
            res.sendStatus(400);
        }
        else {
            console.log('completed');
            res.sendStatus(200);
        }
    });
};

exports.getImg =  function(req, res){
    var projectId = req.project._id;
    console.log(req.fileName);
    console.log(projectId);
    fs.exists(path.join(__dirname, '../img/' + projectId + '/'+ req.fileName), function(exists){
        if(exists){
            res.statusCode= 200;
            res.sendFile(path.join(__dirname, '../img/' + projectId + '/'+ req.fileName));
        }
        else{
            //we want the default logo
            res.statusCode = 200;
            res.sendFile(path.join(__dirname, '../img/default.jpg'));
        }
    });
};

/* Image name middleware*/
exports.getFileName = function(req, res, next, fileName) {
    req.fileName = fileName;
    next();
};
