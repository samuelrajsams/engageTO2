(function (angular) {

    'use strict';

    angular
            .module('website')
            .controller('VerifyCodeInstallationModalController', verifyCodeInstallationModalController);

    verifyCodeInstallationModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance'
    ];

    function verifyCodeInstallationModalController(
            $scope,
            $rootScope,
            $uibModalInstance) {
        $scope.website = {
            close: close
        };
        /*
         * @author: sandeep
         * @created: 18 nov 2016
         * @params: no
         * @return: no
         * @purpose: close verify code installation modal popup
         * @modified: 29 dec 2016
         * @modified by: sandeep(change function type of modal)
         */
        function close() {
            $uibModalInstance.dismiss('cancle');
        }
    }
})(window.angular);