(function () {
    'use strict';
    angular.module('app').service('invoiceService', ['dataConstants', 'apiHttpService', invoiceService]);

    function invoiceService(dataConstants, apiHttpService) {
        var service = {
            getInvoices: getInvoices,
            getInvoice: getInvoice,
            saveInvoice: saveInvoice,
            updateInvoice: updateInvoice,
            //deleteDepartment: deleteDepartment
        };

        return service;
        function getInvoices(pageSize, pageNumber, searchText) {
            var url = dataConstants.INVOICE_URL + 'get-invoices?pageSize=' + pageSize + "&pageNumber=" + pageNumber + "&searchText=" + searchText;
            return apiHttpService.GET(url);
        }

        function getInvoice(invoiceId) {
            var url = dataConstants.INVOICE_URL + 'get-invoice?invoiceId=' + invoiceId;
            return apiHttpService.GET(url);
        }

        function saveInvoice(data) {
            var url = dataConstants.INVOICE_URL + 'save-invoice';
            return apiHttpService.POST(url, data);
        }

        function updateInvoice(invoiceId, data) {
            var url = dataConstants.INVOICE_URL + 'update-invoice/' + invoiceId;
            return apiHttpService.PUT(url, data);
        }

        //function deleteDepartment(departmentId) {
        //    var url = dataConstants.INVOICE_URL + 'delete-department/' + departmentId;
        //    return apiHttpService.DELETE(url);
        //}


    }
})();