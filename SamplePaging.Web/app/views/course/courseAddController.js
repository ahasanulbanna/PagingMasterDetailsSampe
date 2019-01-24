(function () {
    'use strict';
    var controllerId = 'courseAddController';
    angular.module('app').controller(controllerId, courseAddController);
    courseAddController.$inject = ['$routeParams', 'courseService', 'notificationService', '$location'];

    function courseAddController(routeParams, courseService, notificationService, location) {
        var vm = this;
        vm.courseId = 0;
        vm.title = 'Course Add';
        vm.course = {};
        vm.saveButtonText = 'Save';
        vm.save = save;
        vm.close = close;
        vm.courseForm = {};

        if (routeParams.courseId !== undefined && routeParams.courseId !== '') {
            vm.courseId = routeParams.courseId;
            vm.saveButtonText = 'Update';
            vm.title = 'Course Update';
        }

        Init();
        function Init() {
            courseService.getCourse(vm.courseId).then(function (data) {
                vm.course = data.result;
            },
                function (errorMessage) {
                    notificationService.displayError(errorMessage.message);
                });
        };

        function save() {
            if (vm.courseId !== 0 && vm.courseId !== '') {
                updateCourse();
            } else {
                insertCourse();
            }
        }

        function insertCourse() {
            courseService.saveCourse(vm.course).then(function (data) {
                close();
            },
                function (errorMessage) {
                    notificationService.displayError(errorMessage.message);
                });
        }
        function updateCourse() {
            courseService.updateCourse(vm.courseId, vm.course).then(function (data) {
                close();
            },
                function (errorMessage) {
                    notificationService.displayError(errorMessage.message);
                });
        }

        function close() {
            var url = "/courses";
            location.path(url);
        }

    }
})();
