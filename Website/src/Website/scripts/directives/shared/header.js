directives.directive("dcgHeader", ["$timeout", function ($timeout) {
	return {
		restrict: "A",
		replace: true,
        scope: false,
        templateUrl: "./templates/shared/header.html",
        controller: ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {

            $scope.showNavigation = false;

            $scope.toggleNavigation = function () {
                $scope.showNavigation = !$scope.showNavigation;
            }

            $scope.isSelected = function (path) {
                var currentPath = $location.path();
                if (currentPath.indexOf(path) === -1) return false;
                else return true;
            };
        }],
        link: function($scope, $element, $attributes) {

	    }
	};
}]);