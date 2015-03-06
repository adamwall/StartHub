'use strict';

angular.module('users').controller('MessagesController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
        $scope.authentication = Authentication;


        $scope.sendMessage = function() {

            $scope.successMessage=null;
            if($scope.authentication.user){
                $scope.message.userFrom = $scope.authentication.user.username;
                $http.post('/messages/', $scope.message).success(function() {
                    $scope.errorMessage=null;
                    $scope.message.userTo='';
                    $scope.message.messageBody='';
                    $scope.message.messageSubject='';
                    $scope.successMessage=true;
                }).error(function(response) {
                    $scope.errorMessage = response.message;
                });
            }
            else{
                $scope.errorMessage = 'You must be logged in to send a message.';
            }
        };



	}
]);
