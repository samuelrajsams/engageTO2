(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('FirefoxPushNotificationController', firefoxPushNotificationController);

    firefoxPushNotificationController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService'
    ];

    function firefoxPushNotificationController(
            $scope,
            $rootScope,
            AuthService) {
        $rootScope.engagetoApp.isPageLoading = false;
        console.log('Firefox push notification controller');
    }
})(window.angular);