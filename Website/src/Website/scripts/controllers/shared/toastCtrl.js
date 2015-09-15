controllers.controller("toastCtrl", ["$scope", "$mdToast", function ($scope, $mdToast) {

    $scope.closeToast = function () {
        $mdToast.hide();
    };

}]);