controllers.controller("projectsCtrl", ["$rootScope", "$scope", "$http", "$anchorScroll", "$routeParams", function ($rootScope, $scope, $http, $anchorScroll, $routeParams) {
    $scope.projects = [];

    $scope.selectedProject = null;

    function initialize() {

        function setProject(id) {
            $scope.projects.forEach(function (project) {
                if (project.id === id) $scope.selectedProject = project;
            });
        };

        if ($routeParams.projectId) {
            //set project to the one specified in the route
            setProject($routeParams.projectId);
        }
        else {
            //set the selected project to the last one published
            $scope.selectedProject = $scope.projects[$scope.projects.length - 1];
        }

        //appends a selected state to all projects

        if ($scope.selectedProject && $scope.selectedProject.id) {
            $scope.projects.forEach(function (project) {
                if (project.id === $scope.selectedProject.id) project.selected = true;
                else project.selected = false;
            });
        }
        else { $scope.projects.map(function (project) { project.selected = false; }) }

    };

    //load projects
    $http.get('./json/projects/projects.json')
       .success(function (data) {
           $scope.projects = data;
           initialize();
       })
       .error(function (data, status, error, config) {
           $log.warn(error);
       });

    

    $scope.selectProject = function (id) {
        $scope.projects.forEach(function (project) {
            if (project.id === id) {
                $scope.selectedProject = project;
                project.selected = true;
            } else {
                project.selected = false;
            }

        });
    }
}]);