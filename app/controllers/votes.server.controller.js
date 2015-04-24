'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Vote = mongoose.model('Vote'),
    _ = require('lodash');

/**
 * Create a Vote
 */
exports.create = function(req, res) {
	var vote = new Vote(req.body);
	vote.userid = req.user._id;
	vote.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vote);
		}
	});

};

exports.hasVoted = function(req, res, next) {
	console.log('middlewear');
	var vote = new Vote(req.body);
	vote.userid = req.user._id;
	Vote.find({projectid: vote.projectid, userid: vote.userid}, function (err, docs) {
		console.log(docs);
		console.log(docs.length);
		if (docs.length) {
			/*return res.status(400).send({
			 message: 'Vote already exists'*/
			res.statusCode = 400;
			res.end('Vote already exists');
		}
		else{
			next();
		}
	});
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
	Vote.aggregate([
		{$match:{projectid: ''+req.project._id}},
	{$group:{ _id:"$score" , total:{$sum:"$score"}}}],
		function(err,result){
			if(err){
				console.log(err);
			}
			else{
				console.log(result);
				res.jsonp(result);
			}
		}
		);
};
