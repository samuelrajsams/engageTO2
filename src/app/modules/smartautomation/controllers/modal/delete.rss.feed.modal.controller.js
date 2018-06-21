(function (angular) {

    'use strict';

    angular
            .module('smartAutomation')
            .controller('DeleteRssFeedController', deleteRssFeedController);

    deleteRssFeedController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'SmartAutomationConstant',
        'SmartAutomationService',
        'AuthService',
        '$state'
    ];

    function deleteRssFeedController(
            $scope,
            $rootScope,
            $uibModalInstance,
            SmartAutomationConstant,
            SmartAutomationService,
            AuthService,
            $state) {
        console.log('deleteRssFeedController');
        $scope.deleteRssFeed = {
            rssFeed: SmartAutomationConstant.delete_rss_feed_values,
            cancel: cancel,
            deleteRssFeed: deleteRssFeed,
            hideSuccessAlert: hideSuccessAlert,
            hideDangerAlert: hideDangerAlert
        };
        /*
         * @author: sandeep
         * @created: 09 dec 2016
         * @params: no
         * @return: no
         * @purpose: cancelled to exit delete rss feed modal
         */
        function cancel() {
            $uibModalInstance.close('cancel');
        }
        /*
         * @author: sandeep
         * @created: 09 dec 2016
         * @params: no
         * @return: no
         * @purpose: delete RSS feed
         */
        function deleteRssFeed() {
            $scope.deleteRssFeed.rssFeed.load = true;
//            SmartAutomationService.deleteRssFeed().then(function (deleteRssFeedResponse) {
//                $scope.deleteRssFeed.rssFeed.load = false;
//                $scope.deleteRssFeed.rssFeed.successAlert = true;
//                $scope.deleteRssFeed.rssFeed.dangerAlert = false;
//                $scope.deleteRssFeed.rssFeed.success = deleteRssFeedResponse.data.data.message;
//            }, function (error) {
//                console.log(error);
//                $scope.deleteRssFeed.rssFeed.load = false;
//                $scope.deleteRssFeed.rssFeed.successAlert = false;
//                $scope.deleteRssFeed.rssFeed.dangerAlert = true;
//                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
//                    AuthService.revokeAuth();
//                    $rootScope.engagetoApp.isAuthenticatedUser = false;
//                    $state.go('landing');
//                } else if (error.code === 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
//                    angular.forEach(error.error.info, function (val, key) {
//                        $scope.deleteRssFeed.rssFeed.danger = val;
//                    });
//                } else {
//                    $scope.deleteRssFeed.rssFeed.danger = error.data.data.message;
//                }
//            });
        }
        /*
         * @author : sandeep
         * @created : 09 dec 2016
         * @params: no
         * @return: no
         * @purpose: closing success alert
         */
        function hideSuccessAlert() {
            $scope.deleteRssFeed.rssFeed.successAlert = false;
        }
        /*
         * @author : sandeep
         * @created : 09 dec 2016
         * @params: no
         * @return: no
         * @purpose: closing danger alert
         */
        function hideDangerAlert() {
            $scope.deleteRssFeed.rssFeed.dangerAlert = false;
        }
    }
})(window.angular);