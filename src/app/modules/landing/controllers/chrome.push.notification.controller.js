(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('ChromePushNotificationController', chromePushNotificationController);

    chromePushNotificationController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService'
    ];

    function chromePushNotificationController(
            $scope,
            $rootScope,
            AuthService) {
        $rootScope.engagetoApp.isPageLoading = false;
        console.log('Chrome push notification controller');
    }
})(window.angular);