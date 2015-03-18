'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Vote Schema
 */
var VoteSchema = new Schema({
	projectid: {
		type: String,
		required: 'projectid required',
		trim: true
	},
	userid: {
		type: String,
		require: 'userid required',
		trim: true
	},
	upOrDown: {
		type: String,
		require: 'vote required',
		trim: true
	},
	date: {
		type: Date,
		default: Date.now
	}

});

mongoose.model('Vote', VoteSchema);