'use strict';

var projectsApp = angular.module('projects');

projectsApp.controller('CommentController', ['$scope', '$http', '$location', 'Authentication',
    function($scope, $http, $location, Authentication) {
        var user = $scope.authentication.user;

        $scope.sendMessage = function() {
            if(user){
                $scope.comment.author = user.username;
                $scope.comment.projectid = $scope.project._id;
                var path = '/projects/' + $scope.project._id + '/comment';
                $http.post(path, $scope.comment).success(function() {
                    $scope.errorMessage=null;
                    $scope.comment.message = '';
                }).error(function(response) {
                    $scope.errorMessage = response.message;
                });
            };
                //$scope.comment.author = user.username;

                //$http.post('/projects/:projectId/comment')
        };
	}
]);
