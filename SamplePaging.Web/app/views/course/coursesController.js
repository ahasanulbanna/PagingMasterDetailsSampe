(function () {

    'use strict';

    var controllerId = 'coursesController';
    angular.module('app').controller(controllerId, coursesController);
    coursesController.$inject = ['$routeParams','courseService', 'notificationService', '$location'];

    function coursesController($routeParams, courseService, notificationService, location) {

        /* jshint validthis:true */
        var vm = this;
        vm.courses = [];
        vm.addCourse = addCourse;
        vm.updateCourse = updateCourse;
        vm.deleteCourse = deleteCourse;
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
            courseService.getCourses(vm.pageSize, vm.pageNumber, vm.searchText).then(function (data) {
                vm.courses = data.result;
                vm.total = data.total;
            },
                function (errorMessage) {
                    notificationService.displayError(errorMessage.message);
                });
        }

        function addCourse() {
            var url = "/course-create";
            location.path(url);
        }
        function updateCourse(course) {
            var url = location.url('/course-modify/' + course.courseId);
            location.path(url.$$url);
        }

        function deleteCourse(course) {
            courseService.deleteCourse(course.courseId).then(function (data) {
                init();
            });
        }

        function pageChanged() {
            var url = location.url('/courses');
            location.path(url.$$url).search('pn', vm.pageNumber).search('ps', vm.pageSize).search('q', vm.searchText);
        }

        function onSearch() {
            vm.pageNumber = 1;
            pageChanged();
        }
     
    }

})();
