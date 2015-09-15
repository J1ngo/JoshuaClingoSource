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