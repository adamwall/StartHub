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
	//console.log('middlewear');
	var vote = new Vote(req.body);
	vote.userid = req.user._id;
	Vote.find({projectid: vote.projectid, userid: vote.userid}, function (err, docs) {
		//console.log(docs);
		//console.log(docs.length);
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
	var vote = req.vote;
	vote = _.extend(vote , req.body);

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

exports.voteByID = function(req, res, next, id){
	Vote.findById(id).exec(function(err, vote) {
		if (err) return next(err);
		if (! vote) return next(new Error('Failed to load Project ' + id));
		req.vote = vote ;
		next();
	});
};

/**
 * Delete an Vote
 */
exports.delete = function(req, res) {
	var vote = req.vote ;

	vote.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(vote);
		}
	});
};

/**
 * List of Votes
 */
exports.list = function(req, res) {
	Vote.find({projectid: req.project._id}).exec(function(err, votes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(votes);
		}
	});
};
