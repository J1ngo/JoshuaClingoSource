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