(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('JoomlaPushNotificationController', joomlaPushNotificationController);

    joomlaPushNotificationController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService'
    ];

    function joomlaPushNotificationController(
            $scope,
            $rootScope,
            AuthService) {
        $rootScope.engagetoApp.isPageLoading = false;
        console.log('Joomla push notification controller');
    }
})(window.angular);