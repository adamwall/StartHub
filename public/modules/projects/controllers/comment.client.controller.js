'use strict';

var projectsApp = angular.module('projects');

projectsApp.controller('CommentController', ['$scope', '$http', '$location', 'Authentication', '$stateParams',
    function($scope, $http, $location, Authentication, $stateParams) {
        var user = $scope.authentication.user;
        var pid = $stateParams.projectId;

        $scope.sendComment = function() {
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
            }
        };

        $scope.getComments = function()
        {
            var path = '/projects/' + pid + '/comment';
            $http({
                url: path,
                method: 'GET',
                params: pid
            }).success(function(results) {
                $scope.comments = results;
                console.log(results);
            }).error(function (response) {
                $scope.errorMessage = response.message;
            });//asdas
        };
	}
]);
