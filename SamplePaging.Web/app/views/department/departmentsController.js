(function () {

    'use strict';

    var controllerId = 'departmentsController';
    angular.module('app').controller(controllerId, departmentsController);
    departmentsController.$inject = ['$routeParams', 'departmentService', 'notificationService', '$location'];

    function departmentsController($routeParams, departmentService, notificationService, location) {

        /* jshint validthis:true */
      var vm = this;
        vm.departments = [];
        vm.addDepartment = addDepartment;
        vm.updateDepartment = updateDepartment;
        vm.deleteDepartment = deleteDepartment;
        vm.pageChanged = pageChanged;
        vm.searchText = "";
        vm.pageSize = 3;
        vm.onSearch = onSearch;
        vm.pageNumber = 1;
        vm.total = 0;

        if (location.search().ps !== undefined && location.search().ps !== null && location.search().ps!== '') {
          vm.pageSize = location.search().ps;
        }

        if (location.search().pn !== undefined && location.search().pn !== null && location.search().pn !== '') {
          vm.pageNumber = location.search().pn;
        }
        if (location.search().q !== undefined && location.search().q !== null && location.search().q!== '') {
          vm.searchText = location.search().q;
        }
        init();
        function init() {
          departmentService.getDepartments(vm.pageSize, vm.pageNumber, vm.searchText).then(function (data) {
                vm.departments = data.result;
            vm.total = data.total;
            },
                function (errorMessage) {
                    notificationService.displayError(errorMessage.message);
                });
        }

        function addDepartment() {
            var url = "/department-create";
            location.path(url);
        }

        function updateDepartment(department) {
            var url = location.url('/department-modify/' + department.departmentId);
          location.path(url.$$url);
        }

        function deleteDepartment(department) {
            departmentService.deleteDepartment(department.departmentId).then(function (data) {
                init();
            });
        }

        function pageChanged() {
          var url = location.url('/departments');
          location.path(url.$$url).search('pn', vm.pageNumber).search('ps', vm.pageSize).search('q', vm.searchText);
        }

        function onSearch() {
          vm.pageNumber = 1;
          pageChanged();
        }
    }

})();
