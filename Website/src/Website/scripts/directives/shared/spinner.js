directives.directive('dcgSpinner', ['$timeout', function ($timeout) {
	var navigator = null;
    return {
        restrict: 'EA',
        replace: false,
        templateUrl: './templates/shared/spinner.html',
        scope:{},
        link: function (scope, element, attrs) {
            //parse attrs
            if (attrs.theater) scope.showTheater = true;
            if (attrs.button) scope.isButton = true;
        }
    };
}]);