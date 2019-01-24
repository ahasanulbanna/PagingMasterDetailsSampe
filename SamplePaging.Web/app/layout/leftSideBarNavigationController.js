(function () {
    'use strict';
    var controllerId = 'LeftSideBarNavigationController';
    angular
        .module('app')
        .controller(controllerId, ['$scope', '$sce', '$route', 'routes', leftSideBarNavigation]);

    function leftSideBarNavigation($scope, $sce, $route, routes) {
      


    }

})();