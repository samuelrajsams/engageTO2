(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('AndroidPushNotificationController', androidPushNotificationController);

    androidPushNotificationController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService'
    ];

    function androidPushNotificationController(
            $scope,
            $rootScope,
            AuthService) {
        $rootScope.engagetoApp.isPageLoading = false;
        console.log('Android push notification controller');
    }
})(window.angular);