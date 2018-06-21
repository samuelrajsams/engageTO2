(function (angular) {

    'use strict';

    angular
            .module('smartAutomation')
            .controller('AddRssFeedController', addRssFeedController);

    addRssFeedController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'SmartAutomationService',
        'AuthService',
        '$state'
    ];

    function addRssFeedController(
            $scope,
            $rootScope,
            $uibModalInstance,
            SmartAutomationService,
            AuthService,
            $state) {
        $scope.addRssFeed = {
            rssFeed: SmartAutomationService.getSmartAutomationValues(),
            cancel: cancel,
            saveRssFeed: saveRssFeed,
            hideSuccessAlert: hideSuccessAlert,
            hideDangerAlert: hideDangerAlert
        };
        /*
         * @author: sandeep
         * @created: 09 dec 2016
         * @params: no
         * @return: no
         * @purpose: cancelled to exit add rss feed modal
         */
        function cancel() {
            $uibModalInstance.close('cancel');
        }
        /*
         * @author: sandeep
         * @created: 09 dec 2016
         * @params: no
         * @return: no
         * @purpose: Add RSS feed
         * @modified: 17 feb 2017
         * @modified by: sandeep(added validation)
         */
        function saveRssFeed() {
            $scope.addRssFeed.rssFeed.load = true;
            if($scope.addRssFeed.rssFeed.name === ''){
                $scope.addRssFeed.rssFeed.isNameRequired = true;
                $scope.addRssFeed.rssFeed.isNameBlured = true;
            } else if($scope.addRssFeed.rssFeed.url === '' || !$scope.addRssFeed.rssFeed.isUrlValid){
                $scope.addRssFeed.rssFeed.isUrlRequired = true;
                $scope.addRssFeed.rssFeed.isUrlBlured = true;
            } else {
                var rssFeedDetails = {
                    rss_feed_name: $scope.addRssFeed.rssFeed.name,
                    rss_feed_url: $scope.addRssFeed.rssFeed.url,
                    logo: $scope.addRssFeed.rssFeed.logo
                };
                console.log(rssFeedDetails);
//                SmartAutomationService.addRssFeed(rssFeedDetails).then(function (addRssFeedResponse) {
//                    $scope.addRssFeed.rssFeed.load = false;
//                    $scope.addRssFeed.rssFeed.successAlert = true;
//                    $scope.addRssFeed.rssFeed.dangerAlert = false;
//                    $scope.addRssFeed.rssFeed.success = addRssFeedResponse.data.data.message;
//                }, function (error) {
//                    console.log(error);
//                    $scope.addRssFeed.rssFeed.load = false;
//                    $scope.addRssFeed.rssFeed.successAlert = false;
//                    $scope.addRssFeed.rssFeed.dangerAlert = true;
//                    if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
//                        AuthService.revokeAuth();
//                        $rootScope.engagetoApp.isAuthenticatedUser = false;
//                        $state.go('landing');
//                    } else if (error.code === 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
//                        angular.forEach(error.error.info, function (val, key) {
//                            $scope.addRssFeed.rssFeed.danger = val;
//                        });
//                    } else {
//                        $scope.addRssFeed.rssFeed.danger = error.data.data.message;
//                    }
//                });
            }
        }
        /*
         * @author : sandeep
         * @created : 09 dec 2016
         * @params: no
         * @return: no
         * @purpose: closing success alert
         */
        function hideSuccessAlert() {
            $scope.addRssFeed.rssFeed.successAlert = false;
        }
        /*
         * @author : sandeep
         * @created : 09 dec 2016
         * @params: no
         * @return: no
         * @purpose: closing danger alert
         */
        function hideDangerAlert() {
            $scope.addRssFeed.rssFeed.dangerAlert = false;
        }
    }
})(window.angular);