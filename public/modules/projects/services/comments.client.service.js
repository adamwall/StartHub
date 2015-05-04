'use strict';

angular.module('projects').factory('Comments', ['$resource',
    function($resource) {
        return $resource('/projects/:projectId/comment/:commentId', { projectId: '@projectid', commentId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
