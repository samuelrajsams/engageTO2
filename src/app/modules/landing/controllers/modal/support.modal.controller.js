(function (angular) {
    'use strict';

    angular
            .module('notification')
            .controller('SupportModalController', supportModalController);

    supportModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'AuthService',
        '$window'
    ];

    function supportModalController(
            $scope,
            $rootScope,
            $uibModalInstance,
            AuthService,
            $window) {
        $scope.support = {
            submit: submit,
            close: close
        };
        
        /*
         * @author: sandeep
         * @created: 12 jul 2017
         * @params: no
         * @return: no
         * @purpose: close function
         */
        function close() {
            $uibModalInstance.dismiss('close');
        }
        
        /*
         * @author: sandeep
         * @created: 12 jul 2017
         * @params: no
         * @return: no
         * @purpose: close function
         */
        function submit() {
            $uibModalInstance.dismiss('close');
        }
    }
})(window.angular);