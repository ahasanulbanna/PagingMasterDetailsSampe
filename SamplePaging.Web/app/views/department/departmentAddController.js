(function () {
    'use strict';
    var controllerId = 'departmentAddController';
    angular.module('app').controller(controllerId, departmentAddController);
    departmentAddController.$inject = ['$routeParams', 'departmentService', 'notificationService', '$location'];

    function departmentAddController(routeParams, departmentService, notificationService, location) {
        var vm = this;
        vm.departmentId = 0;
        vm.title = 'Department Add';
        vm.department = {};
        vm.saveButtonText = 'Save';
        vm.save = save;
        vm.close = close;
        vm.departmentForm = {};

        if (routeParams.departmentId !== undefined && routeParams.departmentId !== '') {
            vm.departmentId = routeParams.departmentId;
            vm.saveButtonText = 'Update';
            vm.title = 'Department Update';
        }

        Init();
        function Init() {
            departmentService.getDepartment(vm.departmentId).then(function (data) {
                vm.department = data.result;
            },
                function (errorMessage) {
                    notificationService.displayError(errorMessage.message);
                });
        };

        function save() {
            if (vm.departmentId !== 0 && vm.departmentId !== '') {
                updateDepartment();
            } else {
                insertDepartment();
            }
        }

        function insertDepartment() {
            departmentService.saveDepartment(vm.department).then(function (data) {
                close();
            },
                function (errorMessage) {
                    notificationService.displayError(errorMessage.message);
                });
        }
        function updateDepartment() {
            departmentService.updateDepartment(vm.departmentId, vm.department).then(function (data) {
                close();
            },
                function (errorMessage) {
                    notificationService.displayError(errorMessage.message);
                });
        }

        function close() {
            var url = "/departments";
            location.path(url);
        }

    }
})();
