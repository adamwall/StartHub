'use strict';

(function() {
	// Comment Controller Spec
	describe('Comment Controller Tests', function() {
		// Initialize global variables
		var CommentController,
            ProjectController,
            AuthenticationController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Comment controller.
			CommentController = $controller('CommentController', {
				$scope: scope
			});

            ProjectController = $controller('ProjectsController', {
                $scope: scope
            })

            AuthenticationController = $controller('AuthenticationController', {
                $scope: scope
            })

		}));

		it('Should post comments on existing projects while logged in', inject(function(Projects) {
            // Create sample Project using the Projects service
            var sampleProject = new Projects({
                name: 'New Project'
            });

            // Create a sample Projects array that includes the new Project
            var sampleProjects = [sampleProject];

            // Set GET response
            $httpBackend.expectGET('projects').respond(sampleProjects);

            // Signin the user
            scope.credentials = {
                username: 'username',
                password: 'password'
            }
            scope.signin();
            
            scope.sendComment();
            console.log(scope);
		})
		);
	});
});
