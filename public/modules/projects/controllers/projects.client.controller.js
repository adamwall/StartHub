'use strict';

// Projects controller

var projectsApp = angular.module('projects');

projectsApp.controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects', 'Votes', 'FileUploader',
	function($scope, $stateParams, $location, Authentication, Projects, Votes, FileUploader) {
        $scope.authentication = Authentication;
        
        //image uploader
        var uploader = $scope.uploader = new FileUploader();
        // FILTERS
        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
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

            project.$update(function() {
                $location.path('projects/' + project._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Projects
        $scope.find = function() {
            $scope.projects = Projects.query();
        };

		// Find existing Project
		$scope.getSelectedProject = function() {
			$scope.project = Projects.get({
				projectId: $stateParams.projectId
			});
		};

/////////////////////////VOTES//////////////////////////////////

        $scope.vote = function(param, project) {
            var vote = new Votes({
                'projectid': project._id,
                'score': param
            });
            vote.$save(function(respone) {
                $scope.getVotes(project);
            }, function(errorMessage){
                alert(errorMessage);
            });

        };

        $scope.getVotes = function(project){
          Votes.query({projectId: project._id}, function(votes){
              project.userHasVoted = false;
              project.userVote = null;
              var user = Authentication.user;
              var up = 0;
              var down = 0;
              angular.forEach(votes, function(vote){
                  if(vote.userid == ''+user._id){
                      project.userHasVoted=true;
                      project.userVote = vote;
                  }
                  if(vote.score==1) up++;
                  else down++;
              });
              project.upCount = up;
              project.downCount = down;
          });
        };

        $scope.updateVote = function(score, project){
            project.userVote.score = score;
            project.userVote.$update({ voteId: project.userVote._id },function() {
                console.log('updated');
                $scope.getVotes(project);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.deleteVote = function(project){
          if(project.userVote){
              project.userVote.$remove(function() {
                  $scope.getVotes(project);
              });
          }
        };
    }
]);
