'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('./errors.server.controller'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    Messages = mongoose.model('Messages'),
    User = mongoose.model('User');

/**
 * Create a Message
 */
exports.sendMessage = function(req, res) {
    var message = new Messages(req.body);

    //check if the user the message is sent to exists
    User.find({username : message.userTo}, function (err, docs) {
        if (docs.length){
            //the user exists
            message.save(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
                else {
                    res.json(message);
                }
            });
        }else{
            return res.status(400).send({
               message: 'User does not exist'
            });
        }
    });


};

/**
 * Show the current Message
 */
exports.read = function(req, res) {

};

/**
 * Update a Message
 */
exports.update = function(req, res) {

};

/**
 * Delete an Message
 */
exports.delete = function(req, res) {

};

/**
 * Get a list of Messages
 */
exports.getMessageList = function(req, res) {
    if(req.user !== undefined) {
        Messages.find({ $query: {userTo: req.user.username}, $orderby: { dateSent : -1 } }, function (err, results) {
            res.json(results);
        });
    }
    else {
        return res.status(400).send({
            message: 'You must be logged in to view inbox.'
        });
    }
};
