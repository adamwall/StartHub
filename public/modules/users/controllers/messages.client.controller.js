'use strict';

angular.module('users').controller('MessagesController', ['$scope', '$http', '$location', 'Authentication', '$modal', 'Messages', '$stateParams',
	function($scope, $http, $location, Authentication, $modal, Messages, $stateParams) {
        //opens the modal on project page
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

        //gets a list of messages for the logged in user
        $scope.getMessageList = function() {
            $scope.messages = Messages.query();
        };

        //sends a message
        $scope.sendMessage = function() {
            var message = new Messages({
                userTo: this.userTo,
                messageSubject: this.messageSubject,
                messageBody: this.messageBody
            });
            message.$save(function(response) {
                $scope.successMessage=true;
                $scope.errorMessage = null;
                $scope.userTo='';
                $scope.messageBody='';
                $scope.messageSubject='';
            }, function(errorResponse) {
                $scope.successMessage=false;
                $scope.errorMessage = errorResponse.data.message;
            });
        };

        //gets a single message
        $scope.getMessage = function() {
            $scope.message = Messages.get({
                    messageId: $stateParams.messageId
            }, function(response){
                $scope.replyUserTo = response.userFrom;
                $scope.replyMessageSubject = 're: ' + response.messageSubject;
            });
        };

        //sends a message
        $scope.reply = function() {
            var message = new Messages({
                userTo: this.replyUserTo,
                messageSubject: this.replyMessageSubject,
                messageBody: this.replyMessageBody
            });
            message.$save(function(response) {
                $scope.successMessage=true;
                $scope.isCollapsed=false;
                $scope.errorMessage = null;
                $scope.userTo='';
                $scope.messageBody='';
                $scope.messageSubject='';
            }, function(errorResponse) {
                $scope.successMessage=false;
                $scope.errorMessage = errorResponse.data.message;
            });
        };
	}
]);


angular.module('users').controller('ModalInstanceCtrl', function ($scope, $modalInstance, proj, Authentication, Messages) {

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    //modal version of sendMessage
    $scope.contactOwner = function() {
            var message = new Messages({
                userTo: proj.user.username,
                messageSubject: this.messageSubject,
                messageBody: this.messageBody
            });
            message.$save(function(response) {
                $scope.errorMessage=null;
                $modalInstance.close();
                $scope.messageBody='';
                $scope.messageSubject='';
            }, function(errorResponse) {
                $scope.errorMessage = errorResponse.data.message;
            });
    };
});
