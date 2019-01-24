(function () {
    'use strict';

    var controllerId = 'ShellController';
    angular.module('app').controller(controllerId, ['$location', '$rootScope', 'common', 'config', '$routeParams', shell]);

    function shell($location, $rootScope, common,config, $routeParams) {

        var vm = this;

        vm.check = false;

        //vm.showLayout = true;


        //if ($location.path() === '/preview')
        //{
        //    vm.showLayout = false;
        //}
        vm.title = 'shell';
        var events = config.events;
        vm.busyMessage = 'Please wait ...';

        vm.spinnerOptions = {
            radius: 30,
            lines: 7,
            length: 0,
            width: 15,
            speed: 1.7,
            corners: 1.0,
            trail: 70,
            color: '#F58A00'
        };

        activate();

        function activate() {
            common.activateController([], controllerId);
        }
    }
})();
