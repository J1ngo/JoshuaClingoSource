directives.directive("projects", ["$timeout", function ($timeout) {
	return {
		restrict: "A",
		replace: true,
        scope: false,
        templateUrl: "./templates/projects/base.html",
        controller: ['$scope', function ($scope) {
          
        }],
        link: function($scope, $element, $attributes) {

	    }
	};
}]);