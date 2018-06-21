(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('WordpressPushNotificationController', wordpressPushNotificationController);

    wordpressPushNotificationController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService'
    ];

    function wordpressPushNotificationController(
            $scope,
            $rootScope,
            AuthService) {
        $rootScope.engagetoApp.isPageLoading = false;
        console.log('Wordpress push notification controller');
    }
})(window.angular);