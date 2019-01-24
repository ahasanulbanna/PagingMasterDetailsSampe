(function () {
    'use strict';
    var controllerId = 'studentAddController';
    angular.module('app').controller(controllerId, studentAddController);
    studentAddController.$inject = ['$routeParams', 'studentService', 'notificationService', '$location'];

    function studentAddController(routeParams, studentService, notificationService, location) {
        var vm = this;
        vm.studentId = 0;
        vm.title = 'Student Add';
        vm.student = {};
        vm.saveButtonText = 'Save';
        vm.save = save;
        vm.close = close;
        vm.studentForm = {};

        if (routeParams.studentId !== undefined && routeParams.studentId !== '') {
            vm.studentId = routeParams.studentId;
            vm.saveButtonText = 'Update';
            vm.title = 'Student Update';
        }

        Init();
        function Init() {
            studentService.getStudent(vm.studentId).then(function (data) {
                vm.student = data.result;
            },
                function (errorMessage) {
                    notificationService.displayError(errorMessage.message);
                });
        };

        function save() {
            if (vm.studentId !== 0 && vm.studentId !== '') {
                updateStudent();
            } else {
                insertStudent();
            }
        }

        function insertStudent() {
            studentService.saveStudent(vm.student).then(function (data) {
                close();
            },
                function (errorMessage) {
                    notificationService.displayError(errorMessage.message);
                });
        }
        function updateStudent() {
            studentService.updateStudent(vm.studentId, vm.student).then(function (data) {
                close();
            },
                function (errorMessage) {
                    notificationService.displayError(errorMessage.message);
                });
        }

        function close() {
            var url = "/students";
            location.path(url);
        }

    }
})();
