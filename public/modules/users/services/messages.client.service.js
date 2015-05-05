'use strict';

angular.module('users').factory('Messages', ['$resource',
    function($resource) {
        return $resource('/messages/:messageId', { messageId: '@_id'
        });
    }
]);
