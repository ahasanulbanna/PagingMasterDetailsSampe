(function () {
    'use strict';
    angular.module('app').service('studentService', ['dataConstants', 'apiHttpService', studentService]);

    function studentService(dataConstants, apiHttpService) {
        var service = {
            getStudents: getStudents,
            getStudent: getStudent,
            saveStudent: saveStudent,
            updateStudent: updateStudent,
            deleteStudent: deleteStudent
        };

        return service;
        function getStudents(pageSize, pageNumber, searchText) {
            var url = dataConstants.STUDENT_URL + 'get-students?pageSize=' + pageSize + "&pageNumber=" + pageNumber + "&searchText=" + searchText;
            return apiHttpService.GET(url);
        }

        function getStudent(studentId) {
            var url = dataConstants.STUDENT_URL + 'get-student?studentId=' + studentId;
            return apiHttpService.GET(url);
        }

        function saveStudent(data) {
            var url = dataConstants.STUDENT_URL + 'save-student';
            return apiHttpService.POST(url, data);
        }

        function updateStudent(studentId, data) {
            var url = dataConstants.STUDENT_URL + 'update-student/' + studentId;
            return apiHttpService.PUT(url, data);
        }

        function deleteStudent(studentId) {
            var url = dataConstants.STUDENT_URL + 'delete-student/' + studentId;
            return apiHttpService.DELETE(url);
        }


    }
})();