'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
    projectid: {
        type: String,
        required: 'projectid required',
        trim: true
    },
    message: {
        type: String,
        required: 'comments required',
        trim: true
    },
    author: {
        type: String,
        required: 'must be logged in to post',
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Comment', CommentSchema);
