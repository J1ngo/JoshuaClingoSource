controllers.controller("newsCtrl", ["$rootScope", "$scope", "$anchorScroll", "$http", "$routeParams", function ($rootScope, $scope, $anchorScroll, $http, $routeParams) {
    $scope.articles = [];
   
    $scope.selectedArticle = null;

    //load articles
    $http.get('./json/news/articles.json')
       .success(function (data) {
           $scope.articles = data;
           initialize();
       })
       .error(function (data, status, error, config) {
           $log.warn(error);
       });
    
    function initialize() {

        if ($routeParams.articleId) {
            //set article to the one specified in the route
            setArticle($routeParams.articleId);
        }
        else {
            //set the selected article to the last one published
            $scope.selectedArticle = $scope.articles[$scope.articles.length-1];
        }

        function setArticle(id) {
            $scope.articles.forEach(function (article) {
                if (article.id === id) $scope.selectedArticle = article;
            });
        };

        
        //appends a selected state to all articles

        if ($scope.selectedArticle && $scope.selectedArticle.id) {
            $scope.articles.forEach(function (article) {
                if (article.id === $scope.selectedArticle.id) article.selected = true;
                else article.selected = false;
            });
        }
        else { $scope.articles.map(function (article) { article.selected = false; })}

    };

    $scope.selectArticle = function (id) {
        $scope.articles.forEach(function(article) {
            if (article.id === id) {
                $scope.selectedArticle = article;
                article.selected = true;
            } else {
                article.selected = false;
            }

        });
    }

}]);