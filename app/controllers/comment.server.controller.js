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
    console.log('comment create');
    var comment = new Comment(req.body);
    comment.author = req.user.username;
    console.log(comment);

        comment.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
            else {
                res.jsonp(comment);
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
    var comment = req.comment ;

    comment.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(comment);
        }
    });
};

exports.commentByID = function(req, res, next, id) {
    Comment.findById(id).exec(function(err, comment) {
        if (err) return next(err);
        if (! comment) return next(new Error('Failed to load Project ' + id));
        req.comment = comment ;
        next();
    });
};

/**
 * List of Comments
 */
exports.list = function(req, res) {
    Comment.find({ $query: {projectid: ''+req.project._id}, $orderby: { date : -1 } }, function (err, results) {
        res.json(results);
    });
};
