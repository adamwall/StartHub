'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill Project name',
		trim: true
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill Project description',
		trim: true
	},
	industry: {
		type: String,
		default: '',
		trim: true
	},
	referred: {
		type: Boolean,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Project', ProjectSchema);