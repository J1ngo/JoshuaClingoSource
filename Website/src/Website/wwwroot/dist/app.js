var app = angular.module('JoshuaClingo', [
	'ngRoute',
    'ngAnimate',
    'ngMaterial',
    'ngTouch',
	'JCServices',
    'JCFilters',
    'JCDirectives',
    'JCControllers'
]);

app.config(['$locationProvider', '$httpProvider', '$routeProvider', '$logProvider', 'appSettings',
    function ($locationProvider, $httpProvider, $routeProvider, $logProvider, appSettings) {

        // enable html5mode
        $locationProvider.html5Mode(true);

    	$routeProvider.
            when('/base', {
                templateUrl: 'templates/base/base.html',
                controller: 'baseController'
            }).
            otherwise({
                redirectTo: '/base'
            });
        }]);

    app.run(["$rootScope", "$location", function ($rootScope, $location) {
        $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
           
        });
        $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
            
        });
}]);
app.constant('appSettings', {
	//GLOBAL SWITCHES
    'DEBUG': 'FALSE'

});
"use strict";
var services = angular.module("JCServices", []);

'use strict';
var controllers = angular.module('JCControllers', []);
controllers.controller('appController', ['$rootScope', '$scope', '$window', '$location',
function ($rootScope, $scope, $window, $location) {
    //overall loading flag
    $rootScope.loading = 0;

    //handles standard route change requests
    $rootScope.navigate = function (to) {
        $location.path(to);
    };


    $rootScope.getState = function () {
        //pull the session-cached 
        return JSON.parse(sessionStorage.getItem("appState")) || {
            General: $rootScope.general,
            Location: $rootScope.location
        };
    };

    $rootScope.saveState = function () {
        var state = {
            General: $rootScope.general,
            Location: $rootScope.location,
        };
        sessionStorage.setItem("appState", JSON.stringify(state));
    };

    //Stores miscellaneous utility Values in session
    $rootScope.general = {
        //Date constants
        Date: {
            CurrentYear: new Date().getFullYear(),
            Today: new Date(),
            Max: new Date(new Date().getFullYear() + 10, new Date().getMonth(), new Date().getDate())
        }
    };

    $rootScope.relativePath = {
        base: {
            index: '/base'
        },
        writing: {
            index: '/writing'
        },
        projects: {
            index: '/projects'
        }
    };

    //Get session object from browser
    var appState = JSON.parse(sessionStorage.getItem("appState"));

    //Initialize session -- remove this once login is in place
    if (!appState || !appState.Policy) {
        var state = {
            General: $rootScope.general,
            Location: $rootScope.location
        };
        sessionStorage.setItem("appState", JSON.stringify(state));
    }

}]);
controllers.controller("dialogCtrl", ["$scope", "$mdDialog", function ($scope, $mdDialog) {

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };

}]);
controllers.controller("toastCtrl", ["$scope", "$mdToast", function ($scope, $mdToast) {

    $scope.closeToast = function () {
        $mdToast.hide();
    };

}]);
controllers.controller("baseController", ["$rootScope", "$scope", function ($rootScope, $scope) {

   

}]);
"use strict";
var directives = angular.module("JCDirectives", []);

directives.directive("article", ["$timeout", function ($timeout) {
	return {
		restrict: "E",
		replace: true,
		scope: { article: "=" },
        templateUrl: "./templates/news/article.html",
        controller: ['$scope', '$http', '$log', function ($scope, $http, $log) {

            
          
        }],
        link: function($scope, $element, $attributes) {

	    }
	};
}]);
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
directives.directive("jcHeader", ["$timeout", function ($timeout) {
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
directives.directive("viewTitle", ['$rootScope', function ($rootScope) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                var tagName = element[0].tagName.toLowerCase();
                if (tagName === "view-title" || tagName === "viewtitle") {
                    element.remove();
                }

                // Watch the contents of the element and reflect them
                // into the 'viewTitle' variable on the root scope.
                scope.$watch(
                    function() {
                        return element.text();
                    },
                    function(newTitle) {
                        $rootScope.viewTitle = newTitle;
                    }
                );

                // Remove the view-specific title when the view scope
                // is unloaded.
                scope.$on(
                    "$destroy",
                    function () {
                        delete $rootScope.viewTitle;
                    }
                );

            }
        }
    }
]);
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
"use strict";
var filters = angular.module("JCFilters", []);

filters.filter("sanitize", ['$sce', function ($sce) {
    return function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    }
}]);