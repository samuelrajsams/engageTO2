(function (angular) {
    'use strict';

    angular
            .module('fcm.credentials')
            .controller('FcmCredentialsController', fcmCredentialsController);

    fcmCredentialsController.$inject = [
        '$scope',
        '$state',
        '$rootScope',
        'FCMService',
        'AuthService',
        'EngagetoAppService'
    ];

    function fcmCredentialsController(
            $scope,
            $state,
            $rootScope,
            FCMService,
            AuthService,
            EngagetoAppService) {
        //active class for fcm_credentials
        $rootScope.engagetoApp.setting.active = 'fcm_credentials';
        $rootScope.engagetoApp.isPageLoading = false;
        //declering variables
        $scope.fcm = {
            details: {
                number: '',
                key: ''
            },
            save: save
        };

        /*
         * @author: sandeep
         * @created: 07 jun 2017
         * @params: no
         * @return: no
         * @purpose: save fcm details function
         */
        function save() {
            if ($scope.fcm.details.number !== '' && $scope.fcm.details.number && $scope.fcm.details.key !== '' && $scope.fcm.details.key) {
                $rootScope.engagetoApp.isPageLoading = true;
                var data = {
                    number: $scope.fcm.details.number,
                    key: $scope.fcm.details.key
                };
                console.log(data);
                $rootScope.engagetoApp.isPageLoading = false;
//            FCMService.saveFCMDetails(data).then(function (response) {
//                console.log(response)
//                $rootScope.engagetoApp.isPageLoading = false;
//            }, function (error) {
//                console.log(error);
//                var errorMessage = '';
//                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
//                    AuthService.revokeAuth();
//                    $rootScope.engagetoApp.isAuthenticatedUser = false;
//                    $state.go('landing');
//                } else if (error.code == 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
//                    angular.forEach(error.error.info, function (val, key) {
//                        errorMessage = val;
//                    });
//                } else {
//                    errorMessage = error.data.message;
//                }
//                $rootScope.engagetoApp.isLoading = false;
//                EngagetoAppService.showErrorMessage(errorMessage);
//            });
            }
        }
    }
})(window.angular);