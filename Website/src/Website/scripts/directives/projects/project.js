directives.directive("project", ["$timeout", function ($timeout) {
	return {
		restrict: "E",
		replace: true,
		scope: { project: "=" },
        templateUrl: "./templates/projects/project.html",
        controller: ['$scope', '$http', '$log', function ($scope, $http, $log) {
            
          
        }],
        link: function($scope, $element, $attributes) {

	    }
	};
}]);