'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('./errors.server.controller'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    Comment = mongoose.model('Comment');

/**
 * Create a Comment
 */
exports.create = function(req, res) {
    var comment = new Comment(req.body);
    comment.save(function (err) {
       if(err) {
           return res.status(400).send;
       }
        else{
           res.json(comment);
       }
    });
};

/**
 * Show the current Comment
 */
exports.read = function(req, res) {

};

/**
 * Update a Comment
 */
exports.update = function(req, res) {

};

/**
 * Delete an Comment
 */
exports.delete = function(req, res) {

};

/**
 * List of Comments
 */
exports.list = function(req, res) {
    Comment.find({ $query: {projectid: ''+req.project._id}, $orderby: { date : -1 } }, function (err, results) {
        res.json(results);
    });
};
