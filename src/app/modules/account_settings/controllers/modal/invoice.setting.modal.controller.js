(function (angular) {

    'use strict';

    angular
            .module('accountSettings')
            .controller('InvoiceSettingModalController', invoiceSettingModalController);

    invoiceSettingModalController.$inject = [
        '$scope',
        '$uibModalInstance'
    ];

    function invoiceSettingModalController(
            $scope,
            $uibModalInstance) {
        $scope.invoiceSetting = {
            close: close
        };

        /*
         * @author: sandeep
         * @created: 01 dec 2016
         * @params: no
         * @return: no
         * @purpose: close modal popup
         */
        function close() {
            $uibModalInstance.close('close');
        }
    }
})(window.angular);