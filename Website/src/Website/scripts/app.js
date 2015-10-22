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