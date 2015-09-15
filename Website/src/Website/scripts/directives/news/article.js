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