'use strict';

module.exports = function(app) {
    var messages = require('../../app/controllers/messages.server.controller');
    var users = require('../../app/controllers/users.server.controller');

    //Setting up the messaging system
    app.route('/messages/').post(users.requiresLogin ,messages.sendMessage);
    app.route('/messages/').get(users.requiresLogin ,messages.getMessageList);
};
