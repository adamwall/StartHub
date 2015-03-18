'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	mongoose = require('mongoose'),
	Vote = mongoose.model('Vote'),
    _ = require('lodash');

/**
 * Create a Vote
 */
exports.create = function(req, res) {
	var vote = new Vote(req.body);
	Vote.find( {projectid: vote.projectid, userid: vote.userid}, function (err, docs) {
		if (docs.length){
			//if user exist, just update
			//do nothing for now

		} else {
			//if user does not exist, 
			vote.save(function (err) {
				if(err) {
					return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                    });
				} else {
					res.json(vote);
				}
			});
		}
	})
};

/**
 * Show the current Vote
 */
exports.read = function(req, res) {

};

/**
 * Update a Vote
 */
exports.update = function(req, res) {

};

/**
 * Delete an Vote
 */
exports.delete = function(req, res) {

};

/**
 * List of Votes
 */
exports.list = function(req, res) {

};