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
	score: {
		type: Number,
		require: 'vote required'
	},
	date: {
		type: Date,
		default: Date.now
	}

});

mongoose.model('Vote', VoteSchema);
