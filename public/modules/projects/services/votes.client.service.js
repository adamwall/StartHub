'use strict';

angular.module('projects').factory('Votes', ['$resource',
	function($resource) {
		return $resource('votes', { voteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
