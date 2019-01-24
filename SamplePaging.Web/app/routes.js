
(function () {
    'use strict';

    var app = angular.module('app');
    app.constant('routes', getRoutes());
    app.config(['$routeProvider', 'routes', routeConfigurator]);

    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            setRoute(r.url, r.config);
        });
   
        $routeProvider.otherwise({ redirectTo: '/' });
        function setRoute(url, definition) {
            definition.resolve = angular.extend(definition.resolve || {});
            $routeProvider.when(url, definition);
        }
    }

    function getRoutes() {

        return [

            //-------------Department-------
            {
                url: '/departments',
                config: {
                  templateUrl: 'app/views/department/departments.html',
                  controller: 'departmentsController',
                    controllerAs: 'vm',
                    title: 'Department'
                }
            }, {
                url: '/department-create',
                config: {
                    templateUrl: 'app/views/department/departmentAdd.html',
                    controller: 'departmentAddController',
                    controllerAs: 'vm',
                    title: 'Department'
                }
            }, {
            url: "/department-modify/:departmentId",
                config: {
                  templateUrl: 'app/views/department/departmentAdd.html',
                    controller: 'departmentAddController',
                    controllerAs: 'vm',
                    title: 'Department'
                }
            },

           //-------------Course---------
            {
                url: '/courses',
                config: {
                    templateUrl: 'app/views/course/courses.html',
                    controller: 'coursesController',
                    controllerAs: 'vm',
                    title:'Course'
                }
            }, {
                url: '/course-create',
                config: {
                    templateUrl: 'app/views/course/courseAdd.html',
                    controller: 'courseAddController',
                    controllerAs: 'vm',
                    title: 'Course'
                }

            }, {
                url: '/course-modify/:courseId',
                config: {
                    templateUrl: 'app/views/course/courseAdd.html',
                    controller: 'courseAddController',
                    controllerAs: 'vm',
                    title: 'Course'
                }
            },
              //-------------Student---------
            {
                url: '/students',
                config: {
                    templateUrl: 'app/views/student/students.html',
                    controller: 'studentsControler',
                    controllerAs: 'vm',
                    title: 'Student'
                }
            }, {
                url: '/student-create',
                config: {
                    templateUrl: 'app/views/student/StudentAdd.html',
                    controller: 'studentAddController',
                    controllerAs: 'vm',
                    title: 'Student'
                }
            }, {
                url: '/student-modify/:studentId',
                config: {
                    templateUrl: 'app/views/student/StudentAdd.html',
                    controller: 'studentAddController',
                    controllerAs: 'vm',
                    title: 'Student'
                }
            },
             //-------------Invoice---------
            {
                url: '/invoices',
                config: {
                    templateUrl: 'app/views/invoice/invoices.html',
                    controller: 'invoicesController',
                    controllerAs: 'vm',
                    title:'Invoice'
                }
            }, {
                url: '/invoice-create',
                config: {
                    templateUrl: 'app/views/invoice/invoiceAdd.html',
                    controller: 'invoiceAddController',
                    controllerAs: 'vm',
                    title: 'Invoice'
                }
            },{
                url: '/invoice-modify/:invoiceId',
                config: {
                    templateUrl: 'app/views/invoice/invoiceAdd.html',
                    controller: 'invoiceAddController',
                    controllerAs: 'vm',
                    title: 'Invoice'
                }
            }, {
                url: '/invoice-view/:invoiceId',
                config: {
                    templateUrl: 'app/views/invoice/invoiceView.html',
                    controller: 'invoiceAddController',
                    controllerAs: 'vm',
                    title: 'Invoice'
                }
            }

        ];
    }


})();
