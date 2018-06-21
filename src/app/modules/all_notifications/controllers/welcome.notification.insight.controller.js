(function (angular) {
    'use strict';

    angular
            .module('allNotifications')
            .controller('WelcomeNotificationInsightController', welcomeNotificationInsightController);

    welcomeNotificationInsightController.$inject = [
        '$scope',
        '$rootScope',
        '$state',
        '$uibModal',
        'AllNotificationsService',
        'DTOptionsBuilder',
        'DTColumnDefBuilder'
    ];

    function welcomeNotificationInsightController(
            $scope,
            $rootScope,
            $state,
            $uibModal,
            AllNotificationsService,
            DTOptionsBuilder,
            DTColumnDefBuilder) {
        //active class for allNotification
        $rootScope.engagetoApp.setting.active = 'allNotifications';
        $rootScope.engagetoApp.isPageLoading = false;
    }
})(window.angular);