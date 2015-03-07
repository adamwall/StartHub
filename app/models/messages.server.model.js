'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Messages Schema
 */
var MessagesSchema = new Schema({
    userFrom: {
        type: String,
        required: 'Please fill in a username',
        trim: true
    },
    userTo: {
        type: String,
        required: 'Please fill in a username to send',
        trim: true
    },
    messageSubject: {
        type: String,
        required: 'Please fill in a subject',
        trim: true
    },
    messageBody: {
        type: String,
        trim: true
    },
    dateSent:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('Messages', MessagesSchema);
