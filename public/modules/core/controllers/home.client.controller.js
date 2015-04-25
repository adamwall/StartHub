'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$http',
	function($scope, Authentication, $http) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        $http.get('projects/').success(function(result){
            $scope.alerts.push({
                icon: 'glyphicon-folder-open',
                colour: 'btn-primary',
                total: result.length,
                description: 'TOTAL PROJECTS'
            });
            console.log(result.length);
        });

        $scope.alerts = [
            {
                icon: 'glyphicon-asterisk',
                colour:'btn-success',
                total: '1',
                description: 'AMAZING WEBSITES CALLED STARTHUB'
            }
        ];
	}
]);

