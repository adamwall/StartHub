'use strict';

angular.module('projects').factory('Votes', ['$resource',
	function($resource) {
		return $resource('/projects/:projectId/comment/:voteId', { projectId: '@projectid', voteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
