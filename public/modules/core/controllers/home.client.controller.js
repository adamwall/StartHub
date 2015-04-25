'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        $scope.alerts = [
            {
                icon: 'glyphicon-user',
                colour:'btn-success',
                total: '20,408',
                description: 'TOTAL USERS'
            },
            {
                icon: 'glyphicon-folder-open',
                colour: 'btn-primary',
                total: '8,382',
                description: 'TOTAL PROJECTS'
            },
            {
                icon: 'glyphicon-asterisk',
                colour: 'btn-warning',
                total: '527',
                description: 'NEW PROJECTS IN 24H'
            },
            {
                icon: 'glyphicon-record',
                colour: 'btn-info',
                total: '85,000',
                description: 'EMAILS SENT'
            }
        ];
	}
]);

