(function () {

    'use strict';

    var controllerId = 'studentsControler';
    angular.module('app').controller(controllerId, studentsControler);
    studentsControler.$inject = ['$routeParams','studentService', 'notificationService', '$location'];

    function studentsControler($routeParams, studentService, notificationService, location) {

        /* jshint validthis:true */
        var vm = this;
        vm.students = [];
        vm.addStudent = addStudent;
        vm.updateStudent = updateStudent;
        vm.deleteStudent = deleteStudent;
        vm.pageChanged = pageChanged;
        vm.searchText = "";
        vm.pageSize = 3;
        vm.onSearch = onSearch;
        vm.pageNumber = 1;
        vm.total = 0;

        if (location.search().ps !== undefined && location.search().ps !== null && location.search().ps !== '') {
            vm.pageSize = location.search().ps;
        }

        if (location.search().pn !== undefined && location.search().pn !== null && location.search().pn !== '') {
            vm.pageNumber = location.search().pn;
        }
        if (location.search().q !== undefined && location.search().q !== null && location.search().q !== '') {
            vm.searchText = location.search().q;
        }
        init();
        function init() {
            studentService.getStudents(vm.pageSize, vm.pageNumber, vm.searchText).then(function (data) {
                vm.students = data.result;
                vm.total = data.total;
            },
                function (errorMessage) {
                    notificationService.displayError(errorMessage.message);
                });
        }

        function addStudent() {
            var url = "/student-create";
            location.path(url);
        }

        function updateStudent(student) {
            var url = location.url('/student-modify/' + student.studentId);
            location.path(url.$$url);
        }

        function deleteStudent(student) {
            studentService.deleteStudent(student.studentId).then(function (data) {
                init();
            });
        }

        function pageChanged() {
            var url = location.url('/students');
            location.path(url.$$url).search('pn', vm.pageNumber).search('ps', vm.pageSize).search('q', vm.searchText);
        }

        function onSearch() {
            vm.pageNumber = 1;
            pageChanged();
        }
    }

})();
