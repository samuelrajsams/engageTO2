(function (angular) {

    'use strict';

    angular
            .module('accountSettings')
            .controller('CancelAccountModalController', cancelAccountModalController);

    cancelAccountModalController.$inject = [
        '$scope',
        '$uibModalInstance'
    ];

    function cancelAccountModalController(
            $scope,
            $uibModalInstance) {
        console.log('cancelAccountModalController');
        $scope.cancelAccount = {
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