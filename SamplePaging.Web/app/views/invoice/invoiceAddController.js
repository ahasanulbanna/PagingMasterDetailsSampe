(function () {
    'use strict';
    var controllerId = 'invoiceAddController';
    angular.module('app').controller(controllerId, invoiceAddController);
    invoiceAddController.$inject = ['$routeParams', 'invoiceService', 'notificationService', '$location','$scope'];

    function invoiceAddController(routeParams, invoiceService, notificationService, location, $scope) {
        var vm = this;
        vm.invoiceId = 0;
        vm.index = -1;
        vm.title = 'Invoice Add';
        vm.invoice = {};
        vm.invoiceDetails = [];
        vm.invoiceDetail = {};
        vm.saveButtonText = 'Save';
        vm.addButtonText = 'Add';
        vm.save = save;
        vm.add = add;
        vm.update = update;
        vm.remove = remove;
        vm.updateInvoice = updateInvoice;
        vm.close = close;
        vm.getTotal = getTotal;
        vm.invoiceForm = {};
        vm.itemForm = {};
        vm.invoice.date = new Date();
        vm.invoice.grandTotal = 0;

        if (routeParams.invoiceId !== undefined && routeParams.invoiceId !== '') {
            vm.invoiceId = routeParams.invoiceId;
            vm.saveButtonText = 'Update';
            vm.title = 'Invoice Update';
        }




        Init();
        function Init() {
            invoiceService.getInvoice(vm.invoiceId).then(function (data) {
                if (data.message === "InvoiceNo") {
                    vm.invoice.invoiceNo = data.result;
                } else {
                    vm.invoice = data.result;
                    vm.invoiceDetails = data.result.invoiceDetails;
                }
               
            },
                function (errorMessage) {
                    notificationService.displayError(errorMessage.message);
                });
        };

        function add() {
            if (vm.index >= 0) {
                vm.invoiceDetails[vm.index] = vm.invoiceDetail;
                vm.index = -1;
                vm.invoiceDetail = {};
                vm.addButtonText = 'Add';
                vm.invoice.grandTotal = getTotal();
            } else {
                vm.invoiceDetails.push(vm.invoiceDetail);
                vm.invoiceDetail = {};
                vm.invoice.grandTotal=getTotal();
            }
          
        }
        function remove(index) {
            vm.invoiceDetails.splice(index, 1);
            vm.invoice.grandTotal = getTotal();
        };
        function update(index, invoiceDetail) {
            vm.addButtonText = 'Update';
            vm.invoiceDetail = invoiceDetail;
            vm.index = index;
            vm.invoice.grandTotal = getTotal();
        };

        function getTotal() {
            vm.invoice.grandTotal = 0;
            for (var i = 0; i <= vm.invoiceDetails.length-1; i++) {
                var product = vm.invoiceDetails[i];
                vm.invoice.grandTotal += (product.rate * product.quantity);
            }
            return vm.invoice.grandTotal;
        }  

        //================================DateTime Picker Start========================================================

            $scope.today = function () {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };

            $scope.inlineOptions = {
                //customClass: getDayClass,
                minDate: new Date(),
                showWeeks: true
            };

            $scope.dateOptions = {
                //dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2050, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

            // Disable weekend selection
            //function disabled(data) {
            //    var date = data.date,
            //        mode = data.mode;
            //    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            //}

            $scope.toggleMin = function () {
                $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
            };

            $scope.toggleMin();

            $scope.open1 = function () {
                $scope.popup1.opened = true;
            };

            $scope.setDate = function (year, month, day) {
                $scope.dt = new Date(year, month, day);
            };

            //$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = 'dd-MMMM-yyyy';
            $scope.altInputFormats = ['M!/d!/yyyy'];

            $scope.popup1 = {
                opened: false
            };


        //================================DateTime Picker End========================================================

        function save() {
            if (vm.invoiceId !== 0 && vm.invoiceId !== '') {
                updateInvoice();
            } else {
                insertInvoice();
            }
        }

        function insertInvoice() {
            vm.invoice.invoiceDetails = vm.invoiceDetails
            invoiceService.saveInvoice(vm.invoice).then(function (data) {
                close();
            },
                function (errorMessage) {
                    notificationService.displayError(errorMessage.message);
                });
        }
        function updateInvoice() {
            invoiceService.updateInvoice(vm.invoiceId, vm.invoice).then(function (data) {
                close();
            },
                function (errorMessage) {
                    notificationService.displayError(errorMessage.message);
                });
        }

        function close() {
            var url = "/invoices";
            location.path(url);
        }

    }
})();
