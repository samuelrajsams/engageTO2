(function (angular) {
    'use strict';
    angular
            .module('landing')
            .controller('WatchVideoModalController', watchVideoModalController);
    watchVideoModalController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService',
        '$stateParams',
        '$state',
        '$uibModalInstance'
    ];
    function watchVideoModalController(
            $scope,
            $rootScope,
            AuthService,
            $stateParams,
            $state,
            $uibModalInstance) {
        //initializing variables
        $scope.watchVideo = {
        };
        /*
         * @purpose: closing modal popup
         * @author: sandeep
         * @created: 26-09-2016
         */
        $scope.closeModal = function () {
            console.log('closeModal');
            $uibModalInstance.close('close');
        };
    }

})(window.angular);