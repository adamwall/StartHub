'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tag Schema
 */
var TagSchema = new Schema({
	project_id: {
		type: String,
		default: ''
	},
	value: {
		type: String,
		default: ''
	}
});

mongoose.model('Tag', TagSchema);
