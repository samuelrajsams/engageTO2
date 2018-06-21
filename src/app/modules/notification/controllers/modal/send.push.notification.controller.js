(function (angular) {

    'use strict';

    angular
            .module('notification')
            .controller('SendPushNotificationModalController', sendPushNotificationModalController);

    sendPushNotificationModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'sendNewPushNotification',
        'NotificationService',
        '$localStorage',
        'AuthService',
        '$state',
        'Send_Push_Notification_Form_Tabs',
        'EngagetoAppService',
        '$timeout',
        '$filter'
    ];

    function sendPushNotificationModalController(
            $scope,
            $rootScope,
            $uibModalInstance,
            sendNewPushNotification,
            NotificationService,
            $localStorage,
            AuthService,
            $state,
            Send_Push_Notification_Form_Tabs,
            EngagetoAppService,
            $timeout,
            $filter) {
        $scope.sendNewPushNotification = sendNewPushNotification;
        $scope.sendNewPushNotification.send = send,
                $scope.sendNewPushNotification.isSend = false,
                $scope.sendNewPushNotification.close = close,
                $scope.sendNewPushNotification.modify = modify;
        /*
         * @author: sandeep
         * @created: 02 nov 2016
         * @params: no
         * @return: no
         * @purpose: send notification
         */
        function send() {
            $rootScope.engagetoApp.isLoading = true;
            $scope.sendNewPushNotification.isSend = true;
            var notificationUrl = sendNewPushNotification.notification.url;
            var expiryValue = sendNewPushNotification.advanceOptions.expiryValue;
            if ($scope.sendNewPushNotification.notification.isUTMParametersRequired) {
                notificationUrl = sendNewPushNotification.notification.url.indexOf('?') === -1 ? sendNewPushNotification.notification.url + '?utm_source=' + $scope.sendNewPushNotification.notification.uTMSource :
                        sendNewPushNotification.notification.url + '&utm_source=' + $scope.sendNewPushNotification.notification.uTMSource;
                $scope.sendNewPushNotification.notification.uTMMedium != '' ? notificationUrl += '&utm_medium=' + $scope.sendNewPushNotification.notification.uTMMedium : '';
                $scope.sendNewPushNotification.notification.uTMCampaign != '' ? notificationUrl += '&utm_campaign=' + $scope.sendNewPushNotification.notification.uTMCampaign : '';
                $scope.sendNewPushNotification.notification.uTMTerm != '' ? notificationUrl += '&utm_term=' + $scope.sendNewPushNotification.notification.uTMTerm : '';
                $scope.sendNewPushNotification.notification.uTMContent != '' ? notificationUrl += '&utm_content=' + $scope.sendNewPushNotification.notification.uTMContent : '';
            }
            if (notificationUrl !== '' && typeof notificationUrl !== undefined) {
                notificationUrl.indexOf('https://') !== -1 ? '' : notificationUrl.indexOf('http://') !== -1 ? '' : notificationUrl = 'http://' + notificationUrl;
            }
            if (sendNewPushNotification.advanceOptions.expiryType !== 'Seconds') {
                sendNewPushNotification.advanceOptions.expiryType === 'Days' ? expiryValue *= 86400 :
                        sendNewPushNotification.advanceOptions.expiryType === 'Hours' ? expiryValue *= 3600 :
                        sendNewPushNotification.advanceOptions.expiryType === 'Minutes' ? expiryValue *= 60 : '';
            }
            var sendNewNotification = {
                title: sendNewPushNotification.notification.title,
                message: sendNewPushNotification.notification.message,
                logo: sendNewPushNotification.notification.image,
                timeZone: sendNewPushNotification.timeZoneValue
            };
//            sendNewPushNotification.notification.imageType === 'default' ? sendNewNotification.default = sendNewPushNotification.notification.image :
//                    sendNewPushNotification.notification.imageType === 'upload' ? sendNewNotification.logo = sendNewPushNotification.notification.image : '';
            //assigning url for notification
            if (notificationUrl !== '') {
                sendNewNotification.url = notificationUrl;
            }
            //assigning duration for notification
            if (sendNewPushNotification.advanceOptions.isDurationInSecs === 'limited') {
                sendNewNotification.duration = 20;
            }
            //assigning expiry in secounds for notification
            if (expiryValue !== null && expiryValue !== '' && expiryValue) {
                sendNewNotification.expiry = expiryValue;
            }
            var cta = [];
            if (sendNewPushNotification.advanceOptions.cta.length > 0 && sendNewPushNotification.advanceOptions.isAddButtonOpened) {
                angular.forEach(sendNewPushNotification.advanceOptions.cta, function (v, k) {
                    if (v.url !== '' && v.text !== '') {
                        var url = v.url;
                        url.indexOf('https://') !== -1 ? '' : url.indexOf('http://') !== -1 ? '' : url = 'http://' + url;
                        cta.push({
                            cta: v.text,
                            url: url
                        });
                    }
                });
            }
            //assigning cta values for notification
            if (cta.length > 0) {
                sendNewNotification.cta = cta;
            }
            if (sendNewPushNotification.scheduleOrSend.isScheduleNotificationRequired) {
                var scheduleData = {};
                if (sendNewPushNotification.scheduleOrSend.scheduleType === 'one-time' ||
                        sendNewPushNotification.scheduleOrSend.scheduleType === 'multiple-date') {
                    var dates = [];
                    if (sendNewPushNotification.scheduleOrSend.scheduleType === 'one-time') {
                        scheduleData.type = 'single';
                        dates.push({
                            date: $filter('date')(sendNewPushNotification.scheduleOrSend.ones.selectedDate, 'yyyy-MM-dd'),
                            time: $filter('date')(sendNewPushNotification.scheduleOrSend.ones.selectedTime, 'H:mm:ss')
                        });
                    } else {
                        scheduleData.type = 'multiple';
                        angular.forEach(sendNewPushNotification.scheduleOrSend.multiple.dateTimeObejctList, function (dateTime, key) {
                            dates.push({
                                date: $filter('date')(dateTime.selectedDate, 'yyyy-MM-dd'),
                                time: $filter('date')(dateTime.selectedTime, 'H:mm:ss')
                            });
                        });
                    }
                    scheduleData.dates = dates;
                } else {
                    scheduleData.type = 'recurring';
                    scheduleData.repeat = sendNewPushNotification.scheduleOrSend.recurring.repeatedOn.toLowerCase();
                    scheduleData.time = $filter('date')(sendNewPushNotification.scheduleOrSend.recurring.selectedTime, 'H:mm:ss');
                    scheduleData.start_date = $filter('date')(sendNewPushNotification.scheduleOrSend.recurring.startDate, 'yyyy-MM-dd');
                    scheduleData.end_date = sendNewPushNotification.scheduleOrSend.recurring.dateLimit === 'end-date' ?
                            $filter('date')(sendNewPushNotification.scheduleOrSend.recurring.endDate, 'yyyy-MM-dd') : null;
                    if (sendNewPushNotification.scheduleOrSend.recurring.repeatedOn !== 'Daily') {
                        var days = [], repeatedType = sendNewPushNotification.scheduleOrSend.recurring.repeatedOn === 'Weekly' ? 'daysList' : 'datesList';
                        angular.forEach(sendNewPushNotification.scheduleOrSend.recurring[repeatedType], function (day, key) {
                            if (day.status)
                                days.push(day.value);
                        });
                        scheduleData.days = days;
                    }
                }
                sendNewNotification.scheduled = scheduleData;
            }
            NotificationService.sendNewPushNotification(sendNewNotification, sendNewPushNotification.notification.id).then(function (sendNotificationResponse) {
                $rootScope.engagetoApp.isLoading = false;
                EngagetoAppService.showSuccessMessage(sendNotificationResponse.data.data.message);
                if (sendNewPushNotification.notification.id) {
                    $timeout(function () {
                        $uibModalInstance.close('close');
                    }, 1000);
                }
            }, function (error) {
                console.log(error);
                var errorMessage = '';
                $scope.sendNewPushNotification.isSend = false;
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
                    $uibModalInstance.dismiss('close');
                    $state.go('landing');
                } else if (error.code == 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                    angular.forEach(error.error.info, function (val, key) {
                        errorMessage = val;
                    });
                } else {
                    errorMessage = error.data.message;
                }
                $rootScope.engagetoApp.isLoading = false;
                EngagetoAppService.showErrorMessage(errorMessage);
            });
        }
        /*
         * @author: sandeep
         * @created: 02 nov 2016
         * @params: no
         * @return: no
         * @purpose: modify notification
         */
        function modify() {
            $uibModalInstance.dismiss('cancel');
        }
        /*
         * @author: sandeep
         * @created: 02 nov 2016
         * @params: no
         * @return: no
         * @purpose: close notification modal
         */
        function close() {
            $uibModalInstance.close('cancel');
        }
    }
})(window.angular);