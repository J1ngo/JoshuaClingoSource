directives.directive("navigation", ["$timeout", function ($timeout) {
	return {
		restrict: "E",
		replace: true,
		transclude: true,
        scope: false,
        templateUrl: "./templates/shared/navigation.html",
        controller: ['$scope', '$location', function ($scope, $location) {
            
        }],
        link: function($scope, $element, $attributes) {

	    }
	};
}]);