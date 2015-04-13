'use strict';

// Projects controller

var projectsApp = angular.module('projects');

projectsApp.controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects',
	function($scope, $stateParams, $location, Authentication, Projects) {
        $scope.authentication = Authentication;

        // Create new Project
        $scope.create = function() {
            // Create new Project object
            var project = new Projects ({
                title: this.title,
                description: this.description,
                industry: this.industry,
                referred: this.referred,
                tags: this.tags
            });

            // Redirect after save
            project.$save(function(response) {
                $location.path('projects/' + response._id);

                // Clear form fields
                $scope.title = '';
                $scope.description = '';
                $scope.industry = '';
                $scope.referred = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Project
        $scope.remove = function(project) {
            if ( project ) {
                project.$remove();

                for (var i in $scope.projects) {
                    if ($scope.projects [i] === project) {
                        $scope.projects.splice(i, 1);
                    }
                }
            } else {
                $scope.project.$remove(function() {
                    $location.path('projects');
                });
            }
        };

        // Update existing Project
        $scope.update = function() {
            var project = $scope.project;

            project.$update(function() {
                $location.path('projects/' + project._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Projects
        $scope.find = function() {
            $scope.projects = Projects.query();

            var upVoteCount = 3;
            var downVoteCount = 7;
            $scope.upVoteCount = upVoteCount;
            $scope.downVoteCount = downVoteCount;
        };

		// Find existing Project
		$scope.getSelectedProject = function() {
			$scope.project = Projects.get({ 
				projectId: $stateParams.projectId
			});
		};
        

        //Votes =============
        /*
        $scope.changeVote = function(vote, flag) {
            $scope.vote = vote == flag ? 'None' : flag;
            alert($scope.vote);
        };
        */

        $scope.vote = function(param) {
            if (param === 1 ) {
                alert('up');
            }
            if (param === 2 ) {
                alert('down');
            }
        };
        /*

        $scope.upVote = function() {
            alert("up");
        }

        $scope.downVote =function() {
            alert("down");
        }
*/
    }
]);

