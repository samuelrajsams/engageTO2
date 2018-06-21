(function (angular) {
    'use strict';

    angular
            .module('allNotifications')
            .controller('AbSplitNotificationInsightController', abSplitNotificationInsightController);

    abSplitNotificationInsightController.$inject = [
        '$scope',
        '$rootScope',
        '$state',
        '$uibModal',
        'AllNotificationsService',
        'DTOptionsBuilder',
        'DTColumnDefBuilder'
    ];

    function abSplitNotificationInsightController(
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