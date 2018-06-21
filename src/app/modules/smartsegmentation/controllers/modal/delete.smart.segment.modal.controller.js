(function (angular) {
    'use strict';
    angular
            .module('smartSegmentation')
            .controller('DeleteSmartSegmentationModalController', deleteSmartSegmentationModalController);
    deleteSmartSegmentationModalController.$inject = [
        '$uibModalInstance',
        '$scope',
        'SegmentId',
        'SmartSegmentationService',
        'AuthService',
        '$state',
        '$rootScope',
        'EngagetoAppService',
        '$timeout'
    ];
    function deleteSmartSegmentationModalController(
            $uibModalInstance,
            $scope,
            SegmentId,
            SmartSegmentationService,
            AuthService,
            $state,
            $rootScope,
            EngagetoAppService,
            $timeout) {
        $scope.deleteSegment = {
            close: close,
            remove: remove
        };

        /*
         * @author: sandeep
         * @created: 16 jan 2017
         * @params: no
         * @returns: no
         * @purpose: remove segment with id
         */
        function remove() {
            SmartSegmentationService.deleteSegment(SegmentId).then(function (response) {
                EngagetoAppService.showSuccessMessage(response.data.message);
                $timeout(function () {
                    $uibModalInstance.close('close');
                }, 2000);
            }, function (error) {
                console.log(error);
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
                    $state.go('landing');
                }
            });
        }
        /*
         * @author: sandeep
         * @created: 16 jan 2017
         * @params: no
         * @returns: no
         * @purpose: remove segment with id
         */
        function close() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})(window.angular);