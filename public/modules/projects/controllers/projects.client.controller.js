'use strict';

// Projects controller

var projectsApp = angular.module('projects');

projectsApp.controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects', 'FileUploader',
	function($scope, $stateParams, $location, Authentication, Projects, FileUploader) {
        $scope.authentication = Authentication;
        
        //image uploader
        var uploader = $scope.uploader = new FileUploader();
        // FILTERS
        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|tiff|'.indexOf(type) !== -1;
            }
        });
        uploader.filters.push({
            name: 'sizeFilter',
            fn: function (item) {
                return item.size < 1000000;
            }
        });
        uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            $scope.error_img = 'There was a problem with your image, make sure it is the right type(jpg, jpeg, png, bmp, gif)' +
            ' or that it is less than 1MB';
        };
        uploader.onAfterAddingFile = function (fileItem) {
            $scope.error_img = null;
        };


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
                //upload image logo after save(need project id for routing)
                if(uploader.queue.length>0) {
                    uploader.onBeforeUploadItem = function (item) {
                        uploader.url = '/projects/img/' + response._id;
                        item.url = '/projects/img/' + response._id;
                    };
                    uploader.uploadItem(uploader.queue[uploader.queue.length - 1]);
                }
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

            project.$update(function(response) {
                //upload image logo after save(need project id for routing)
                if(uploader.queue.length>0) {
                    uploader.onBeforeUploadItem = function (item) {
                        uploader.url = '/projects/img/' + response._id;
                        item.url = '/projects/img/' + response._id;
                    };
                    uploader.uploadItem(uploader.queue[uploader.queue.length - 1]);
                }
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
