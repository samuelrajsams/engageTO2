(function (angular) {
    'use strict';

    // Setting up route
    angular
            .module('allNotifications')
            .config(allNotificationsConfig);

    allNotificationsConfig.$inject = [
        '$stateProvider'
    ];

    function allNotificationsConfig(
            $stateProvider) {
        // API Credential Routing
        $stateProvider
                .state('side-nav-template.all-notifications', {
                    url: '/app/all-notifications',
                    params: {
                        tabType: 'sent'
                    },
                    templateUrl: 'app/modules/all_notifications/views/all.notifications.html',
                    controller: 'AllNotificationsController',
                    authenticate: true,
                    domainTab: true
                })
                .state('side-nav-template.welcome-notification-insight', {
                    url: '/app/welcome-notification-insight',
                    templateUrl: 'app/modules/all_notifications/views/welcome-notification-insight.html',
                    controller: 'WelcomeNotificationInsightController',
                    authenticate: true,
                    domainTab: true
                })
                .state('side-nav-template.ab-split-test-notification-insight', {
                    url: '/app/ab-split-test-notification-insight',
                    templateUrl: 'app/modules/all_notifications/views/ab-split-test-notification-insight.html',
                    controller: 'AbSplitNotificationInsightController',
                    authenticate: true,
                    domainTab: true
                })
                .state('side-nav-template.sent-notification-insight', {
                    url: '/app/sent-notification-insight/:notificationId',
                    templateUrl: 'app/modules/all_notifications/views/sent-notification-insight.html',
                    controller: 'SentNotificationInsightController',
                    authenticate: true,
                    domainTab: true
                });
    }
})(window.angular);


