directives.directive("jcFooter", ["$timeout", function ($timeout) {
    return {
        restrict: "A",
        replace: true,
        templateUrl: "./templates/shared/footer.html",
        controller: ['$scope', '$location', function ($scope, $location) {

            //$scope.isSelected = function (path) {
            //    var currentPath = $location.path();
            //    return path == currentPath;
            //};
        }],
        link: function ($scope, $element, $attributes) {

        }
    };
}]);