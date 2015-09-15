var app = angular.module('JoshuaClingo', [
	'ngRoute',
    'ngAnimate',
    'ngMaterial',
    'ngTouch',
    'zumba.angular-waypoints',
    'smoothScroll',
	'JCServices',
    'JCFilters',
    'JCDirectives',
    'JCControllers'
]);

app.config(['$locationProvider', '$httpProvider', '$routeProvider', '$logProvider', 'appSettings',
    function ($locationProvider, $httpProvider, $routeProvider, $logProvider, appSettings) {
    	$logProvider.debugEnabled(appSettings.DEBUG);

        $routeProvider.
            // error routes
            //when('/error/500', {
            //    templateUrl: 'templates/shared/500.html'
            //}).
            //when('/error/404', {
            //    templateUrl: 'templates/shared/404.html'
            //}).

            //main routes
            when('/welcome/', {
                templateUrl: 'templates/welcome/welcome.html'
            }).

            when('/organization/', {
                templateUrl: 'templates/organization/organization.html'
            }).

            when('/projects/', {
                templateUrl: 'templates/projects/projects.html'
            }).
            when('/projects/:projectId', {
                templateUrl: 'templates/projects/projects.html'
            }).
            
            when('/software/', {
                templateUrl: 'templates/software/software.html'
            }).
            when('/software/:projectId', {
                templateUrl: 'templates/software/software.html'
            }).

            when('/news/', {
                templateUrl: 'templates/news/news.html'
            }).
            when('/news/:articleId', {
                templateUrl: 'templates/news/news.html'
            }).

            when('/contact/', {
                templateUrl: 'templates/contact/contact.html'
            }).

			otherwise({
			    redirectTo: '/welcome/'
			});

    }]);

app.run(["$rootScope", "$location", function ($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        //if (eventObj.authenticated === false) {
        //    var redirect = $location.$$path;
        //    $location.path("/provider/login").search('redirect', redirect);
        //}
    });
    $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
        //if (authService.LoggedIn()) {
        //    $rootScope.showNextRequiredStep();
        //}
    });
}]);