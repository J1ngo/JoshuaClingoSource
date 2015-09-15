controllers.controller('appCtrl', ['$rootScope', '$scope', '$window', '$location', '$timeout', '$anchorScroll', '$mdDialog', '$mdSidenav', '$mdUtil', '$log',
function ($rootScope, $scope, $window, $location, $timeout, $anchorScroll, $mdDialog, $mdSidenav, $mdUtil, $log) {
    $rootScope.loading = 0;

    $rootScope.getErrorMessage = function (error) {
        if (error && error.data && error.data.ExceptionMessage) {
            return error.data.ExceptionMessage;
        }
        else {
            return "An unexpected error has occurred, please try again later.";
        }
    };

    $rootScope.handleUnexpectedResult = function (error) {
        console.log(JSON.stringify(error));

    };

    $scope.scrollTo = function (id) {
        $location.hash(id);
        console.log($location.hash());
        $anchorScroll();
    };

    $rootScope.navigate = function (to) {
        $location.path(to);
    };

    $rootScope.relativePath = {
        welcome:
        {
            base: '/welcome/'
        },
        organization:
        {
            base: '/organization/'
        },
        software:
        {
            base: '/software/'
        },
        projects:
        {
            base: '/projects/'
        },
        news : 
        {
            base: '/news/'
        },
        contact:
        {
            base: '/contact/'
        }
    };

    //returns whether or not the current browser location contains the given path
    //param: relativePath.base
    $scope.containsPath = function (path) {
        return ($location.$$path.indexOf(path) != -1);
    }

    function setHeaderOn() {
        $scope.header.on = true;
        $scope.header.off = false;
    }

    function setHeaderOff() {
        $scope.header.off = true;
        $scope.header.on = false;
    }

    $scope.header = { on: true, off: false };
    $timeout(function () {
        $scope.$watch(function (scope) {
            return scope.waypoint;
        }, function (newValue, oldValue) {
            if (newValue && newValue.content && newValue.content.flags) {
                //scrolled up to element
                if (newValue.content.flags.off) {
                    if (newValue.content.flags.off) setHeaderOn();
                    else setHeaderOff();
                }
                //scrolled down to element
                if (newValue.content.flags.on) {
                    if (newValue.content.flags.on) setHeaderOff();
                    else setHeaderOn();
                }
            }

        }, true);
    }, 0);


}]);