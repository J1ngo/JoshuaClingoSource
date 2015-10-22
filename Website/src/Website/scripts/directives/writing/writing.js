directives.directive("writing", ["$timeout", function ($timeout) {
	return {
		restrict: "A",
		replace: true,
        scope: false,
        templateUrl: "./templates/writing/base.html",
        controller: ['$scope', function ($scope) {
          
        }],
        link: function($scope, $element, $attributes) {

	    }
	};
}]);