'use strict';

var projectsApp = angular.module('projects');

projectsApp.controller('CommentController', ['$scope', '$http', '$location', 'Authentication', '$stateParams', 'Comments',
    function($scope, $http, $location, Authentication, $stateParams, Comments) {

        //creates a new comment
        $scope.sendComment = function(){
            var comment = new Comments({
                message: this.message,
                projectid: $stateParams.projectId
            });
            comment.$save(function(response) {
                $scope.message = '';
                $scope.comments.unshift(response);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        //gets a list of comments
        $scope.getComments = function(){
            $scope.comments = Comments.query({projectId: $stateParams.projectId});
        };

        //removes the comment at {index} in the comments array
        $scope.remove = function(index) {
            var comment = $scope.comments.splice(index, 1);
            comment[0].$remove();
        };
	}
]);
