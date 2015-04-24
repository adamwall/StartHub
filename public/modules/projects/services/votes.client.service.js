'use strict';

angular.module('projects').factory('Votes', ['$resource',
	function($resource) {
		return $resource('projects/:projectId/votes', { projectId: '@projectid'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
