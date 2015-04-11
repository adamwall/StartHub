'use strict';

// Projects controller

var projectsApp = angular.module('projects');

projectsApp.controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects', 'FileUploader',
	function($scope, $stateParams, $location, Authentication, Projects, FileUploader) {
        $scope.authentication = Authentication;

        var uploader = $scope.uploader = new FileUploader();
        // FILTERS
        var logo;
        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            logo = fileItem;
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);

        // Create new Project
        $scope.create = function() {
            // Create new Project object
            var project = new Projects ({
                title: this.title,
                description: this.description,
                industry: this.industry,
                referred: this.referred
            });

            // Redirect after save
            project.$save(function(response) {
                uploader.onBeforeUploadItem = function(item) {
                    console.log('before upload')
                    uploader.url = '/projects/img/' + response._id;
                    item.url = '/projects/img/' + response._id;
                };
                console.log(uploader);
                uploader.uploadItem(uploader.queue[0]);
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
