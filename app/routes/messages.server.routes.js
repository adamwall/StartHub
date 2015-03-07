'use strict';

module.exports = function(app) {
    var messages = require('../../app/controllers/messages.server.controller');

    //Setting up the messaging system
    app.route('/messages/').post(messages.sendMessage);
    app.route('/messages/').get(messages.getMessageList);
};
