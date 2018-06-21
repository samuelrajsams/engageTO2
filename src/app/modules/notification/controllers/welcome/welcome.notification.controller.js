(function (angular) {
    'use strict';
    angular
            .module('notification')
            .controller('WelcomeNotificationCtrl', welcomeNotificationCtrl);
    welcomeNotificationCtrl.$inject = [
        '$scope',
        '$rootScope',
        '$state',
        'NotificationService',
        '$uibModal',
        '$localStorage',
        'AuthService',
        '$document',
        'EngagetoAppService',
        '$stateParams',
        'Engageto_Default_Image'
    ];

    function welcomeNotificationCtrl(
            $scope,
            $rootScope,
            $state,
            NotificationService,
            $uibModal,
            $localStorage,
            AuthService,
            $document,
            EngagetoAppService,
            $stateParams,
            Engageto_Default_Image) {
        //Initializing Send New Push Notification
        $scope.welcomeNotification = {
            activeTab: 0,
            isWelcomeEnabled: false,
            browserPreviewTab: 'Chrome',
            notification: NotificationService.getWelcomeNotificationValues(),
            errorMessage: '',
            uploadImageList: [],
            uploadImageModal: uploadImageModal,
            exitWelcomeNotificationModal: exitWelcomeNotificationModal,
            onClickSelectImage: onClickSelectImage,
            createdWelcomeNotification: createdWelcomeNotification,
            openSuccessCreatedWelcomeModal: openSuccessCreatedWelcomeModal,
            navigateToAll: navigateToAll,
            hideDangerAlert: hideDangerAlert
        };
        var uploadedImageList = [], defaultImageList = [], onSuccessModalInstance;
        //for displaying image show on select
        $rootScope.engagetoApp.notification.image = $scope.welcomeNotification.notification.image;
        /*
         * @author: sandeep
         * @created: 13 dec 2016
         * @params: no
         * @return: no
         * @purpose: uploadImageModal modal popup
         */
        function uploadImageModal() {
            var uploadImageModalInstance = $uibModal.open({
                templateUrl: 'app/modules/notification/views/modal/upload.images.manager.modal.html',
                controller: 'UploadImageManagerModalController',
                windowClass: 'upload-image-manager-modal',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    defaultImageList: function () {
                        return defaultImageList;
                    },
                    uploadedImageList: function () {
                        return uploadedImageList;
                    }
                }
            });

            uploadImageModalInstance.result.then(function (response) {
                console.log($scope.welcomeNotification.uploadImageList);
                if (response.hasOwnProperty('file')) {
                    $scope.welcomeNotification.notification.image = response.file;
                    var index = $scope.welcomeNotification.uploadImageList.indexOf(response.file);
                    if (index === -1) {
                        if ($scope.welcomeNotification.uploadImageList.length < 5)
                            $scope.welcomeNotification.uploadImageList.push(response.file);
                        else {
                            $scope.welcomeNotification.uploadImageList.shift();
                            $scope.welcomeNotification.uploadImageList.push(response.file);
                        }
                        $scope.welcomeNotification.notification.logo = '';
                        $scope.welcomeNotification.notification.imageType = 'upload';
                    } else {
                        var image = $scope.welcomeNotification.uploadImageList[4];
                        $scope.welcomeNotification.uploadImageList[4] = $scope.welcomeNotification.uploadImageList[index];
                        $scope.welcomeNotification.uploadImageList[index] = image;
                    }
                }
                if (response.hasOwnProperty('upload')) {
                    uploadedImageList.push(response.file);
                }
            }, function (error) {
                $rootScope.engagetoApp.notification.image = $scope.welcomeNotification.notification.image;
            });
        }

        /*
         * @author: sandeep
         * @created: 14 dec 2016
         * @params: no
         * @return: no
         * @purpose: exit welcome notification modal popup
         */
        function exitWelcomeNotificationModal() {
            var exitWelcomeNotificationModalInstance = $uibModal.open({
                templateUrl: 'app/modules/notification/views/modal/exit.notification.modal.html',
                controller: 'ExitNotificationController',
                windowClass: 'custom-push-notification-modal'
            });

            exitWelcomeNotificationModalInstance.result.then(function (successResponse) {
                if (successResponse === 'except') {
                    $state.reload();
                }
            }, function (error) {
                console.log(error);
            });
        }
        /*
         * @author: sandeep
         * @created: 14 dec 2016
         * @params: no
         * @return: no
         * @purpose: createdWelcomeNotification
         */
        function createdWelcomeNotification() {
            if ($scope.welcomeNotification.notification.title === '' || !$scope.welcomeNotification.notification.title || !$scope.welcomeNotification.notification.isTitleShorter || $scope.welcomeNotification.notification.title.trim() == '') {
                $scope.welcomeNotification.notification.isTitleRequired = true;
                var someElement = angular.element(document.getElementById('notificationTitle'));
                $document.scrollToElementAnimated(someElement);
            } else if ($scope.welcomeNotification.notification.description === '' || !$scope.welcomeNotification.notification.description || !$scope.welcomeNotification.notification.isDescriptionShorter || $scope.welcomeNotification.notification.description.trim() == '') {
                $scope.welcomeNotification.notification.isDescriptionRequired = true;
                var someElement = angular.element(document.getElementById('notificationMessage'));
                $document.scrollToElementAnimated(someElement);
            } else if ($scope.welcomeNotification.notification.url === '' || !$scope.welcomeNotification.notification.url || $scope.welcomeNotification.notification.url.trim() == '') {
                $scope.welcomeNotification.notification.isURLRequired = true;
                var someElement = angular.element(document.getElementById('notificationURL'));
                $document.scrollToElementAnimated(someElement);
            } else if ($scope.welcomeNotification.notification.isUrlValid === false) {
                var someElement = angular.element(document.getElementById('notificationURL'));
                $document.scrollToElementAnimated(someElement);
            } else if ($scope.welcomeNotification.notification.isUTMParametersRequired &&
                    ($scope.welcomeNotification.notification.uTMSource === '' ||
                            !$scope.welcomeNotification.notification.uTMSource ||
                            !$scope.welcomeNotification.notification.isUtmSourceShorter ||
                            $scope.welcomeNotification.notification.invalidUTMSourcePattern)) {
                $scope.welcomeNotification.notification.isUtmSourceRequired = true;
                var someElement = angular.element(document.getElementById('utmSource'));
                $document.scrollToElementAnimated(someElement);
            } else if ($scope.welcomeNotification.notification.isUTMParametersRequired &&
                    (!$scope.welcomeNotification.notification.isUtmMediumShorter ||
                            $scope.welcomeNotification.notification.invalidUTMMediumPattern ||
                            !$scope.welcomeNotification.notification.isUtmCompaignShorter ||
                            $scope.welcomeNotification.notification.invalidUTMCompaignPattern ||
                            !$scope.welcomeNotification.notification.isUtmTermShorter ||
                            $scope.welcomeNotification.notification.invalidUTMTermPattern ||
                            !$scope.welcomeNotification.notification.isUtmContentShorter ||
                            $scope.welcomeNotification.notification.invalidUTMContentPattern)) {
                var someElement = angular.element(document.getElementById('utmMedium'));
                $document.scrollToElementAnimated(someElement);
            } else {
                $rootScope.engagetoApp.isLoading = true;
                var notificationUrl = $scope.welcomeNotification.notification.url;
                if ($scope.welcomeNotification.notification.isUTMParametersRequired) {
                    notificationUrl = $scope.welcomeNotification.notification.url.indexOf('?') === -1 ? $scope.welcomeNotification.notification.url + '?utm_source=' + $scope.welcomeNotification.notification.uTMSource :
                            $scope.welcomeNotification.notification.url + '&utm_source=' + $scope.welcomeNotification.notification.uTMSource;
                    $scope.welcomeNotification.notification.uTMMedium != '' ? notificationUrl += '&utm_medium=' + $scope.welcomeNotification.notification.uTMMedium : '';
                    $scope.welcomeNotification.notification.uTMCampaign != '' ? notificationUrl += '&utm_campaign=' + $scope.welcomeNotification.notification.uTMCampaign : '';
                    $scope.welcomeNotification.notification.uTMTerm != '' ? notificationUrl += '&utm_term=' + $scope.welcomeNotification.notification.uTMTerm : '';
                    $scope.welcomeNotification.notification.uTMContent != '' ? notificationUrl += '&utm_content=' + $scope.welcomeNotification.notification.uTMContent : '';
                }
                if (notificationUrl !== '' && typeof notificationUrl !== undefined) {
                    notificationUrl.indexOf('https://') !== -1 ? '' : notificationUrl.indexOf('http://') !== -1 ? '' : notificationUrl = 'http://' + notificationUrl;
                }
                //perparing request structure for creating welcome notification
                var welcomeNotification = {
//                    segment_uuid: '0',
                    title: $scope.welcomeNotification.notification.title,
                    message: $scope.welcomeNotification.notification.description,
                    logo: $scope.welcomeNotification.notification.image
                };
                //adding url to request structure if exists
                if (notificationUrl !== '') {
                    welcomeNotification.url = notificationUrl;
                }
                NotificationService.createWelcomeNotification(welcomeNotification, $scope.welcomeNotification.notification.id).then(function (response) {
                    $rootScope.engagetoApp.isLoading = false;
                    openSuccessCreatedWelcomeModal();
                }, function (error) {
                    console.log(error);
                    var errorMessage = '';
                    if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                        AuthService.revokeAuth();
                        $rootScope.engagetoApp.isAuthenticatedUser = false;
                        $state.go('landing');
                    } else if (error.code === 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
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
         * @created: 28 dec 2016
         * @retunr: no
         * @params: no
         * @purpose: openSuccessCreatedWelcomeModal popup
         */
        function openSuccessCreatedWelcomeModal() {
            onSuccessModalInstance = $uibModal.open({
                templateUrl: 'app/modules/notification/views/modal/success.welcome.notification.modal.html',
                windowClass: 'verify-code-installation-modal',
                scope: $scope
            });
        }
        /*
         * @author: sandeep
         * @created: 28 dec 2016
         * @retunr: no
         * @params: no
         * @purpose: navigateToAll Notification
         */
        function navigateToAll() {
            onSuccessModalInstance.opened.then(function () {
                onSuccessModalInstance.close('dismiss');
                $state.go('side-nav-template.all-notifications', {tabType: 'welcome'});
            });
        }
        /*
         * @author: sandeep
         * @created: 19 may 2017
         * @params: index(number)
         * @return: no
         * @purpose: onClickSelectImage function
         */
        function onClickSelectImage(index) {
            $scope.welcomeNotification.notification.image = $scope.welcomeNotification.uploadImageList[index];
            $rootScope.engagetoApp.notification.image = $scope.welcomeNotification.uploadImageList[index];
        }
        /*
         * @author: sandeep
         * @created: 28 dec 2016
         * @retunr: no
         * @params: no
         * @purpose: hideDangerAlert
         */
        function hideDangerAlert() {
            $scope.welcomeNotification.errorMessage = '';
        }
        /*
         * @author: sandeep
         * @params: no
         * @return: no
         * @created: 18 feb 20017
         * @purpose: getting segment list by type
         */
        NotificationService.getUploadedImageList().then(function (response) {
            $scope.welcomeNotification.uploadImageList = response.data.data.slice(0, 5);
            uploadedImageList = response.data.data;
            NotificationService.getDefaultImage().then(function (response) {
                defaultImageList = response.data.data;
                if ($stateParams['notificationId']) {
                    NotificationService.getNotificationById($stateParams.notificationId, 'welcome').then(function (response) {
                        console.log(response.data.data);
                        $scope.welcomeNotification.isWelcomeEnabled = true;
                        $scope.welcomeNotification.notification.id = response.data.data.notification_referer;
                        $scope.welcomeNotification.notification.title = response.data.data.title;
                        $scope.welcomeNotification.notification.description = response.data.data.message;
                        $scope.welcomeNotification.notification.image = response.data.data.logo || Engageto_Default_Image;
                        $rootScope.engagetoApp.notification.image = response.data.data.logo || Engageto_Default_Image;
                        if (response.data.data['url']) {
                            var splitUTMUrl = response.data.data.url.split('?');
                            $scope.welcomeNotification.notification.url = splitUTMUrl[0];
                            if (splitUTMUrl.length > 1) {
                                $scope.welcomeNotification.notification.isUTMParametersRequired = true;
                                var urlWithOnlyParams = splitUTMUrl[1].replace('?', '');
                                angular.forEach(urlWithOnlyParams.split('&'), function (params, key) {
                                    var valueKeyParams = params.split('=');
                                    if (valueKeyParams[0] === 'utm_source') {
                                        $scope.welcomeNotification.notification.uTMSource = valueKeyParams[1];
                                        $scope.welcomeNotification.notification.utmSourceCharaLength = 50 - valueKeyParams[1].trim().length;
                                    }
                                    if (valueKeyParams[0] === 'utm_medium') {
                                        $scope.welcomeNotification.notification.uTMMedium = valueKeyParams[1];
                                        $scope.welcomeNotification.notification.utmMediumCharaLength = 50 - valueKeyParams[1].trim().length;
                                    }
                                    if (valueKeyParams[0] === 'utm_campaign') {
                                        $scope.welcomeNotification.notification.uTMCampaign = valueKeyParams[1];
                                        $scope.welcomeNotification.notification.utmCompaignCharaLength = 50 - valueKeyParams[1].trim().length;
                                    }
                                    if (valueKeyParams[0] === 'utm_content') {
                                        $scope.welcomeNotification.notification.uTMContent = valueKeyParams[1];
                                        $scope.welcomeNotification.notification.utmContentCharaLength = 50 - valueKeyParams[1].trim().length;
                                    }
                                    if (valueKeyParams[0] === 'utm_term') {
                                        $scope.welcomeNotification.notification.uTMTerm = valueKeyParams[1];
                                        $scope.welcomeNotification.notification.utmTermCharaLength = 50 - valueKeyParams[1].trim().length;
                                    }
                                });
                            }
                        }
                        $rootScope.engagetoApp.isPageLoading = false;
                    }, function (error) {
                        console.log(error);
                        var errorMessage = '';
                        if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                            AuthService.revokeAuth();
                            $rootScope.engagetoApp.isAuthenticatedUser = false;
                            $state.go('landing');
                        } else if (error.code === 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                            angular.forEach(error.error.info, function (val, key) {
                                errorMessage = val;
                            });
                        } else {
                            errorMessage = error.data.message;
                        }
                        $rootScope.engagetoApp.isPageLoading = false;
                        EngagetoAppService.showErrorMessage(errorMessage);
                    });
                } else
                    $rootScope.engagetoApp.isPageLoading = false;
            }, function (error) {
                console.log(error);
                var errorMessage = '';
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
                    $state.go('landing');
                } else if (error.code === 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                    angular.forEach(error.error.info, function (val, key) {
                        errorMessage = val;
                    });
                } else {
                    errorMessage = error.data.message;
                }
                $rootScope.engagetoApp.isLoading = false;
                EngagetoAppService.showErrorMessage(errorMessage);
            });
        }, function (error) {
            console.log(error);
            var errorMessage = '';
            if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                AuthService.revokeAuth();
                $rootScope.engagetoApp.isAuthenticatedUser = false;
                $state.go('landing');
            } else if (error.code === 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
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
})(window.angular);