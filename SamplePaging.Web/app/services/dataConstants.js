
(function () {
  "use strict";

     angular.module("app").constant("dataConstants", {
         DEPARTMENT_URL: baseAPIUrl + 'api/departments/',
         COURSE_URL: baseAPIUrl + 'api/courses/',
         STUDENT_URL: baseAPIUrl + 'api/students/',
         INVOICE_URL: baseAPIUrl +'api/invoices/'


  });
})();