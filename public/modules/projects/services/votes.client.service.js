'use strict';

angular.module('projects').factory('Votes', ['$resource',
	function($resource) {
		return $resource('/projects/:projectId/votes/:voteId', { projectId: '@projectid', voteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
