(function (angular) {

    'use strict';

    angular
            .module('accountSettings')
            .controller('UpgradeDegradeAccountModalController', upgradeDegradeAccountModalController);

    upgradeDegradeAccountModalController.$inject = [
        '$scope',
        '$uibModalInstance'
    ];

    function upgradeDegradeAccountModalController(
            $scope,
            $uibModalInstance) {
        $scope.upgradeDegrade = {
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