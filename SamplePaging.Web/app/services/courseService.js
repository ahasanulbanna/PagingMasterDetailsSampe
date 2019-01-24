(function () {
    'use strict';
    angular.module('app').service('courseService', ['dataConstants', 'apiHttpService', courseService]);

    function courseService(dataConstants, apiHttpService) {
        var service = {
            getCourses: getCourses,
            getCourse: getCourse,
            saveCourse: saveCourse,
            updateCourse: updateCourse,
            deleteCourse: deleteCourse
        };

        return service;
        function getCourses(pageSize, pageNumber, searchText) {
            var url = dataConstants.COURSE_URL + 'get-courses?pageSize=' + pageSize + "&pageNumber=" + pageNumber + "&searchText=" + searchText;
            return apiHttpService.GET(url);
        }

        function getCourse(courseId) {
            var url = dataConstants.COURSE_URL + 'get-course?courseId=' + courseId;
            return apiHttpService.GET(url);
        }

        function saveCourse(data) {
            var url = dataConstants.COURSE_URL + 'save-course';
            return apiHttpService.POST(url, data);
        }

        function updateCourse(courseId, data) {
            var url = dataConstants.COURSE_URL + 'update-course/' + courseId;
            return apiHttpService.PUT(url, data);
        }

        function deleteCourse(courseId) {
            var url = dataConstants.COURSE_URL + 'delete-course/' + courseId;
            return apiHttpService.DELETE(url);
        }


    }
})();