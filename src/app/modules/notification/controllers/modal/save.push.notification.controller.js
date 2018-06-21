(function (angular) {

    'use strict';

    angular
            .module('notification')
            .controller('SavePushNotificationModalController', savePushNotificationModalController);

    savePushNotificationModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'sendNewPushNotification',
        'NotificationService',
        'AuthService',
        '$state',
        '$localStorage',
        'EngagetoAppService',
        '$timeout'
    ];

    function savePushNotificationModalController(
            $scope,
            $rootScope,
            $uibModalInstance,
            sendNewPushNotification,
            NotificationService,
            AuthService,
            $state,
            $localStorage,
            EngagetoAppService,
            $timeout) {
        $scope.saveNewPushNotification = sendNewPushNotification;
        $scope.saveNewPushNotification.name = sendNewPushNotification.notification.name || '';
        $scope.saveNewPushNotification.save = save,
                $scope.saveNewPushNotification.close = close;
        /*
         * @author: sandeep
         * @created: 02 nov 2016
         * @params: no
         * @return: no
         * @purpose: save notification
         */
        function save() {
            $rootScope.engagetoApp.isLoading = true;
            var notificationUrl = sendNewPushNotification.notification.url;
            var expiryValue = sendNewPushNotification.advanceOptions.expiryValue;
            if ($scope.saveNewPushNotification.notification.isUTMParametersRequired) {
                notificationUrl = sendNewPushNotification.notification.url.indexOf('?') === -1 ? sendNewPushNotification.notification.url + '?utm_source=' + $scope.saveNewPushNotification.notification.uTMSource :
                        sendNewPushNotification.notification.url + '&utm_source=' + $scope.saveNewPushNotification.notification.uTMSource;
                $scope.saveNewPushNotification.notification.uTMMedium != '' ? notificationUrl += '&utm_medium=' + $scope.saveNewPushNotification.notification.uTMMedium : '';
                $scope.saveNewPushNotification.notification.uTMCampaign != '' ? notificationUrl += '&utm_campaign=' + $scope.saveNewPushNotification.notification.uTMCampaign : '';
                $scope.saveNewPushNotification.notification.uTMTerm != '' ? notificationUrl += '&utm_term=' + $scope.saveNewPushNotification.notification.uTMTerm : '';
                $scope.saveNewPushNotification.notification.uTMContent != '' ? notificationUrl += '&utm_content=' + $scope.saveNewPushNotification.notification.uTMContent : '';
            }
            if (notificationUrl !== '' && typeof notificationUrl !== undefined) {
                notificationUrl.indexOf('https://') !== -1 ? '' : notificationUrl.indexOf('http://') !== -1 ? '' : notificationUrl = 'http://' + notificationUrl;
            }
            if (sendNewPushNotification.advanceOptions.expiryType !== 'Seconds') {
                sendNewPushNotification.advanceOptions.expiryType === 'Days' ? expiryValue *= 86400 :
                        sendNewPushNotification.advanceOptions.expiryType === 'Hours' ? expiryValue *= 3600 :
                        sendNewPushNotification.advanceOptions.expiryType === 'Minutes' ? expiryValue *= 60 : '';
            }
            var saveNewNotification = {
                title: sendNewPushNotification.notification.title,
                message: sendNewPushNotification.notification.message,
                logo: sendNewPushNotification.notification.image,
                is_save: true
            };
            if ($scope.saveNewPushNotification.name !== '') {
                saveNewNotification.name = $scope.saveNewPushNotification.name;
            }
//            sendNewPushNotification.notification.imageType === 'default' ? saveNewNotification.default = sendNewPushNotification.notification.image :
//                    sendNewPushNotification.notification.imageType === 'upload' ? saveNewNotification.logo = sendNewPushNotification.notification.image : '';
            //assigning url for notification
            if (notificationUrl !== '') {
                saveNewNotification.url = notificationUrl;
            }
            //assigning duration for notification
            if (sendNewPushNotification.advanceOptions.isDurationInSecs === 'limited') {
                saveNewNotification.duration = 20;
            }
            //assigning expiry in secounds for notification
            if (expiryValue !== null && expiryValue !== '' && expiryValue) {
                saveNewNotification.expiry = expiryValue;
            }
            var cta = [];
            if (sendNewPushNotification.advanceOptions.cta.length > 0) {
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
                saveNewNotification.cta = cta;
            }
            if (sendNewPushNotification.notification.hasOwnProperty('id') && sendNewPushNotification.notification['type'] === 'save') {
                NotificationService.updateSavedPushNotification(saveNewNotification, sendNewPushNotification.notification.id).then(function (saveNotificationResponse) {
                    $rootScope.engagetoApp.isLoading = false;
                    EngagetoAppService.showSuccessMessage('Notification has been updated');
                    $timeout(function () {
                        $uibModalInstance.close('close');
                    }, 2000);
                }, function (error) {
                    console.log(error);
                    var errorMessage = '';
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
            } else {
                NotificationService.sendNewPushNotification(saveNewNotification).then(function (saveNotificationResponse) {
                    $rootScope.engagetoApp.isLoading = false;
                    EngagetoAppService.showSuccessMessage('Notification has been saved and you can view it under All Push Notifications');
                    $timeout(function () {
                        $uibModalInstance.close('close');
                    }, 2000);
                }, function (error) {
                    console.log(error);
                    var errorMessage = '';
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
        }
        /*
         * @author: sandeep
         * @created: 02 nov 2016
         * @params: no
         * @return: no
         * @purpose: close notification modal
         */
        function close() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})(window.angular);