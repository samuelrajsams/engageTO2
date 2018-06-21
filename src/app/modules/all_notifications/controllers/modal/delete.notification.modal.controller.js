(function (angular) {

    'use strict';

    angular
            .module('allNotifications')
            .controller('DeleteNotificationModalController', deleteNotificationModalController);

    deleteNotificationModalController.$inject = [
        '$scope',
        '$rootScope',
        'typeOfNotification',
        '$uibModalInstance',
        'AllNotificationsService',
        'EngagetoAppService',
        '$state',
        'AuthService',
        'notificationId',
        '$timeout'
    ];

    function deleteNotificationModalController(
            $scope,
            $rootScope,
            typeOfNotification,
            $uibModalInstance,
            AllNotificationsService,
            EngagetoAppService,
            $state,
            AuthService,
            notificationId,
            $timeout) {
        $scope.deleteNotification = {
            typeOfNotification: typeOfNotification,
            cancel: cancel,
            deleteNotification: deleteNotification
        };
        /*
         * @author: sandeep
         * @created: 28 dec 2016
         * @params: no
         * @return: no
         * @purpose: cancelled to exit delete notification modal
         */
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
        /*
         * @author: sandeep
         * @created: 17 may 2017
         * @params: no
         * @return: no
         * @purpose: deleteNotification function
         */
        function deleteNotification() {
            if (typeOfNotification === 'sent') {
                AllNotificationsService.deleteSentPushNotification(notificationId).then(function (response) {
                    EngagetoAppService.showSuccessMessage(response.data.data.message);
                    $timeout(function () {
                        $uibModalInstance.close('sent');
                    }, 500);
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
            if (typeOfNotification === 'saved') {
                AllNotificationsService.deleteSavedPushNotification(notificationId).then(function (response) {
                    EngagetoAppService.showSuccessMessage(response.data.data.message);
                    $timeout(function () {
                        $uibModalInstance.close('saved');
                    }, 500);
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
            if (typeOfNotification === 'welcome') {
                AllNotificationsService.deleteWelcomeNotification(notificationId).then(function (response) {
                    EngagetoAppService.showSuccessMessage(response.data.data.message);
                    $timeout(function () {
                        $uibModalInstance.close('welcome');
                    }, 500);
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
            if (typeOfNotification === 'schedule') {
                AllNotificationsService.deleteScheduleNotification(notificationId).then(function (response) {
                    EngagetoAppService.showSuccessMessage(response.data.data.message);
                    $timeout(function () {
                        $uibModalInstance.close('schedule');
                    }, 500);
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

    }
})(window.angular);