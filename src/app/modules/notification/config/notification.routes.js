(function (angular) {

    'use strict';

    // Setting up route
    angular
            .module('notification')
            .config(notificationConfig);

    notificationConfig.$inject = [
        '$stateProvider'
    ];

    function notificationConfig(
            $stateProvider) {
        // Notification state routing
        $stateProvider.
//                state('notification', {
//                    url: '/notification',
//                    templateUrl: 'app/modules/notification/views/push.notification.html'
//                }).
                state('side-nav-template', {
                    abstract: true,
                    url: '',
                    templateUrl: 'app/shared/navigation/template.html',
                    domainTab: true
                }).
                state('side-nav-template.new-push-notification', {
                    url: '/app/new-push-notification',
                    templateUrl: 'app/modules/notification/views/new.push.notification.html',
                    controller: 'NewPushNotificationController',
                    authenticate: true,
                    domainTab: true
                }).
                state('side-nav-template.send-new-push-notification', {
                    url: '/app/send-new-push-notification/:notificationId/:notificationType',
                    params: {
                        notificationId: {
                            value: null,
                            squash: true
                        },
                        notificationType: {
                            value: null,
                            squash: true
                        }
                    },
                    templateUrl: 'app/modules/notification/views/send.new.push.notification.html',
                    controller: 'SendNewPushNotificationCtrl',
                    authenticate: true,
                    domainTab: true
                }).
                state('side-nav-template.ab-split-test-notification', {
                    url: '/app/ab-split-test-notification',
                    templateUrl: 'app/modules/notification/views/ab.split.test.notification.html',
                    controller: 'AbSplitTestNotificationCtrl',
                    authenticate: true,
                    domainTab: true
                }).
                state('side-nav-template.new-welcome-notification', {
                    url: '/app/new-welcome-notification/:notificationId',
                    params: {
                        notificationId: {
                            value: null,
                            squash: true
                        }
                    },
                    templateUrl: 'app/modules/notification/views/welcome.notification.html',
                    controller: 'WelcomeNotificationCtrl',
                    authenticate: true,
                    domainTab: true
                });
    }
})(window.angular);
