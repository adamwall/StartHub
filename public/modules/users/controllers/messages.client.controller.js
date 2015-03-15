'use strict';

angular.module('users').controller('MessagesController', ['$scope', '$http', '$location', 'Authentication', '$modal',
	function($scope, $http, $location, Authentication, $modal) {
        $scope.authentication = Authentication;
        var user = $scope.authentication.user.username;

        $scope.open = function () {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    proj: function () {
                        return $scope.project;
                    }
                }
            });
        };



        $scope.getMessageList = function() {
            $http({
                url: '/messages',
                method: 'GET',
                params: user
            }).success(function(results) {
                $scope.messages = results;
            }).error(function (response) {
                $scope.errorMessage = response.message;
            });
        };

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


angular.module('users').controller('ModalInstanceCtrl', function ($scope, $modalInstance, proj, Authentication, $http) {

    $scope.authentication = Authentication;

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.contactOwner = function() {
        $scope.message.userFrom = $scope.authentication.user.username;
        $scope.message.userTo = proj.user.username;
        $http.post('/messages/', $scope.message).success(function() {
            $scope.errorMessage=null;
            $modalInstance.close();
        }).error(function(response) {
            $scope.errorMessage = response.message;
            });
    };
});
