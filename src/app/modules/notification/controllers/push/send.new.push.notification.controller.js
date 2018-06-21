(function (angular) {

    'use strict';

    angular
        .module('notification')
        .controller('SendNewPushNotificationCtrl', sendNewPushNotificationCtrl);

    sendNewPushNotificationCtrl.$inject = [
        '$scope',
        '$uibModal',
        '$state',
        'NotificationService',
        '$q',
        'AuthService',
        '$rootScope',
        '$timeout',
        '$document',
        'EngagetoAppService',
        '$stateParams',
        'Engageto_Default_Image',
        'DaysList',
        'DatesList'
    ];

    function sendNewPushNotificationCtrl(
        $scope,
        $uibModal,
        $state,
        NotificationService,
        $q,
        AuthService,
        $rootScope,
        $timeout,
        $document,
        EngagetoAppService,
        $stateParams,
        Engageto_Default_Image,
        DaysList,
        DatesList) {
        //active class for allNotification
        $rootScope.engagetoApp.setting.active = 'sendNotifications';
        //Initializing Send New Push Notification
        $scope.sendPushNotification = {
            activeTab: 0,
            browserPreviewTab: 'Chrome',
            notification: {
                title: '',
                message: '',
                url: '',
                isUTMParametersRequired: false,
                uTMMedium: 'push-notification',
                uTMSource: 'browser',
                uTMCampaign: 'engageto-notification',
                uTMTerm: '',
                uTMContent: '',
                uTMParameterLength: 3,
                image: Engageto_Default_Image,
                logo: '',
                imageType: 'default',
                subscriberErrorMsg: false,
                validateTitle: false,
                visitedTitle: undefined,
                validateMessage: false,
                visitedMsg: undefined,
                visitedUrl: undefined,
                validateUrl: false,
                isUrlRequired: false,
                isUrlValidated: true,
                visitedMedium: undefined,
                isUTMMediumValid: true,
                visitedSource: undefined,
                validateUTMSource: false,
                isUTMSourceValid: true,
                visitedCampaign: undefined,
                isUTMCampaignValid: true,
                visitedTerm: undefined,
                isUTMTermValid: true,
                visitedContent: undefined,
                isUTMContentValid: true,
                title_text_remaining: null,
                msg_text_remaining: null,
                medium_text_remaining: null,
                source_text_remaining: null,
                compaign_text_remaining: null,
                term_text_remaining: null,
                content_text_remaining: null,
                showTitleSuccess: true,
                showMsgSuccess: true,
                showMediumSuccess: true,
                showSourceSuccess: true,
                showCampaignSuccess: true,
                showTermSuccess: true,
                showContentSuccess: true,
                utmUrlMsg: false,
                errorMsg: ''
            },
            advanceOptions: {
                cta: [
                    {
                        text: '',
                        url: '',
                        visitedCtaText: undefined,
                        visitedCtaUrl: undefined,
                        invalidCtaUrlPattern: false,
                        isUrlValidated: false,
                        showCtaTextSuccess: true,
                        text_remaining: null
                    },
                    {
                        text: '',
                        url: '',
                        visitedCtaText: undefined,
                        visitedCtaUrl: undefined,
                        invalidCtaUrlPattern: false,
                        isUrlValidated: false,
                        showCtaTextSuccess: true,
                        text_remaining: null
                    }
                ],
                isAddButtonOpened: false,
                expiryType: 'Days',
                expiryValue: null,
                visitedExpiryValue: undefined,
                numLimitMsg: false,
                isDurationInSecs: 'unlimited',
                advanceSegment: 'Include',
                advanceSegmentValue: '',
                subscribersList: [],
                subscriberErrorMsg: false,
                errorMsg: ''
            },
            scheduleOrSend: {
                isScheduleNotificationRequired: false,
                scheduleType: 'one-time',
                ones: {
                    selectedDate: new Date(),
                    selectedDateOptions: {
                        minDate: new Date()
                    },
                    selectedTime: new Date(new Date().getTime() + 300000),
                    minTime: new Date(new Date().getTime() + 300000),
                    showDateTimePicker: false,
                    isLocalTimeSelected: false,
                    openDateTimePicker: openDateTimePicker
                },
                multiple: {
                    dateTimeObejctList: [{
                        selectedDate: new Date(),
                        selectedDateOptions: {
                            minDate: new Date()
                        },
                        selectedTime: new Date(new Date().getTime() + 300000),
                        minTime: new Date(new Date().getTime() + 300000),
                        showDateTimePicker: false
                    }],
                    openDateTimePicker: openDateTimePicker,
                    addDateTimeInline: addDateTimeInline,
                    removeDateTimeInline: removeDateTimeInline
                },
                recurring: {
                    startDate: new Date(),
                    startDateOptions: {
                        minDate: new Date()
                    },
                    showDatePicker: false,
                    endDate: null,
                    endDateOptions: {
                        minDate: new Date()
                    },
                    showTimePicker: false,
                    selectedTime: new Date(),
                    dateLimit: 'never-end',
                    repeatedOn: 'Daily',
                    errorMessage: '',
                    daysList: DaysList,
                    datesList: DatesList,
                    openPicker: openPicker,
                    onChangeLimit: onChangeLimit,
                    onChangeDatePicker: onChangeDatePicker
                },
                onChangeScheduleType: onChangeScheduleType
            },
            uploadImageList: [],
            showNotification: false,
            notificationPreview: notificationPreview,
            sendPushNotificationModal: sendPushNotificationModal,
            savePushNotificationModal: savePushNotificationModal,
            exitPushNotificationModal: exitPushNotificationModal,
            uploadImageModal: uploadImageModal,
            exitUTMParams: exitUTMParams,
            enteringUTMParams: enteringUTMParams,
            keypress: keypress,
            checkValue: checkValue,
            onClickSelectImage: onClickSelectImage,
            timeZoneValue: timeZoneValue
        };
        var uploadedImageList = [], defaultImageList = [];
        var timeZoneValue;
        $scope.zones = {};
        $scope.segments = {};
        function timeZoneList() {
            NotificationService.timeZoneList().then(function (resp, err) {
                if (err) {
                    console.log(err);
                } else {
                    $scope.timeZoneList = resp.data;
                    $scope.zones.value = resp.data.data[0].value;
                    $scope.sendPushNotification.timeZoneValue = resp.data.data[0].value;
                }
            })
        }
        function getSegmentsList() {
            NotificationService.getSegments().then(function (resp, err) {
                if (err) {
                    console.log(err);
                } else {
                    $scope.segmentsList = resp.data;
                    // $scope.zones.value = resp.data.data[0].value;
                    // $scope.sendPushNotification.timeZoneValue = resp.data.data[0].value;
                }
            })
        }

        timeZoneList();
        getSegmentsList();

        $scope.timeZoneChange = function (timeZoneValue) {
            $scope.sendPushNotification.timeZoneValue = timeZoneValue;
        }
        $rootScope.engagetoApp.notification.image = $scope.sendPushNotification.notification.image;
        /* Notification Preview Display on Button Tap */
        function notificationPreview() {
            $scope.sendPushNotification.showNotification = !$scope.sendPushNotification.showNotification;
        }
        /*
         * @author: ahextech
         * @created: 08-09-2016
         * @purpose: send push notification modal popup
         * @modified: 08 nov 2016
         * @modified by: sandeep(added response functionality)
         */
        function sendPushNotificationModal() {
            var emptyData = false;
            angular.forEach($scope.sendPushNotification.advanceOptions.cta, function (v, k) {
                if (((v.text != '' && v.url == '') || (v.text == '' && v.url != '') ||
                    !v.showCtaTextSuccess || v.invalidCtaUrlPattern) && $scope.sendPushNotification.advanceOptions.isAddButtonOpened) {
                    emptyData = true;
                }
            });
            if ($scope.sendPushNotification.notification.title === '' || !$scope.sendPushNotification.notification.title || !$scope.sendPushNotification.notification.title.trim()) {
                $scope.sendPushNotification.notification.validateTitle = true;
                var someElement = angular.element(document.getElementById('notificationTitle'));
                $document.scrollToElementAnimated(someElement);
            } else if (!$scope.sendPushNotification.notification.url && $scope.sendPushNotification.notification.url !== '') {
                var someElement = angular.element(document.getElementById('notificationURL'));
                $document.scrollToElementAnimated(someElement);
            } else if ($scope.sendPushNotification.notification.message === '' || !$scope.sendPushNotification.notification.message || !$scope.sendPushNotification.notification.message.trim()) {
                $scope.sendPushNotification.notification.validateMessage = true;
                var someElement = angular.element(document.getElementById('notificationMessage'));
                $document.scrollToElementAnimated(someElement);
            } else if ($scope.sendPushNotification.notification.url === '' || !$scope.sendPushNotification.notification.url || !$scope.sendPushNotification.notification.url.trim()) {
                $scope.sendPushNotification.notification.isUrlRequired = true;
                var someElement = angular.element(document.getElementById('notificationURL'));
                $document.scrollToElementAnimated(someElement);
            } else if ($scope.sendPushNotification.notification.isUTMParametersRequired &&
                ($scope.sendPushNotification.notification.uTMSource === '' ||
                    !$scope.sendPushNotification.notification.uTMSource ||
                    !$scope.sendPushNotification.notification.showSourceSuccess)) {
                $scope.sendPushNotification.notification.validateUTMSource = true;
                var someElement = angular.element(document.getElementById('utmSource'));
                $document.scrollToElementAnimated(someElement);
            } else if ($scope.sendPushNotification.notification.isUTMParametersRequired &&
                (!$scope.sendPushNotification.notification.showMediumSuccess || (!$scope.sendPushNotification.notification.uTMMedium && $scope.sendPushNotification.notification.uTMMedium !== '') || !$scope.sendPushNotification.notification.isUTMMediumValid ||
                    !$scope.sendPushNotification.notification.showCampaignSuccess || (!$scope.sendPushNotification.notification.uTMCampaign && $scope.sendPushNotification.notification.uTMCampaign !== '') || !$scope.sendPushNotification.notification.isUTMCampaignValid ||
                    !$scope.sendPushNotification.notification.showTermSuccess || (!$scope.sendPushNotification.notification.uTMTerm && $scope.sendPushNotification.notification.uTMTerm !== '') || !$scope.sendPushNotification.notification.isUTMTermValid ||
                    !$scope.sendPushNotification.notification.showContentSuccess || (!$scope.sendPushNotification.notification.uTMContent && $scope.sendPushNotification.notification.uTMContent !== '') || !$scope.sendPushNotification.notification.isUTMContentValid)) {
                var someElement = angular.element(document.getElementById('utmMedium'));
                $document.scrollToElementAnimated(someElement);
            } else if (emptyData) {
                var someElement = angular.element(document.getElementById('cmn-toggle-2'));
                $document.scrollToElementAnimated(someElement);
            } else if ($scope.sendPushNotification.scheduleOrSend.recurring.errorMessage !== '') {
                var someElement = angular.element(document.getElementById('schedule-notification-picker'));
                $document.scrollToElementAnimated(someElement);
            } else {
                var sendPushNotificationModalInstance = $uibModal.open({
                    templateUrl: 'app/modules/notification/views/modal/send.push.notification.modal.html',
                    controller: 'SendPushNotificationModalController',
                    resolve: {
                        sendNewPushNotification: function () {
                            return $scope.sendPushNotification;
                        }
                    },
                    windowClass: 'custom-push-notification-modal'
                });

                sendPushNotificationModalInstance.result.then(function (response) {
                    console.log(response);
                    if (!$stateParams['notificationId'])
                        $state.reload();
                    else
                        $state.go('side-nav-template.all-notifications', { tabType: 'schedule' });
                }, function (error) {
                    console.log(error);
                });
            }
        }

        /*
         * @author: ahextech
         * @created: 08-09-2016
         * @purpose: save push notification modal popup
         * @modified: 02 nov 2016
         * @modified by: sandeep(save modal controller)
         */
        function savePushNotificationModal() {
            var emptyData = false;
            angular.forEach($scope.sendPushNotification.advanceOptions.cta, function (v, k) {
                if (((v.text != '' && v.url == '') || (v.text == '' && v.url != '') ||
                    !v.showCtaTextSuccess || v.invalidCtaUrlPattern) && $scope.sendPushNotification.advanceOptions.isAddButtonOpened) {
                    emptyData = true;
                }
            });
            if ($scope.sendPushNotification.notification.title === '' || !$scope.sendPushNotification.notification.title || !$scope.sendPushNotification.notification.title.trim()) {
                $scope.sendPushNotification.notification.validateTitle = true;
                var someElement = angular.element(document.getElementById('notificationTitle'));
                $document.scrollToElementAnimated(someElement);
            } else if (!$scope.sendPushNotification.notification.url && $scope.sendPushNotification.notification.url !== '') {
                var someElement = angular.element(document.getElementById('notificationURL'));
                $document.scrollToElementAnimated(someElement);
            } else if ($scope.sendPushNotification.notification.message === '' || !$scope.sendPushNotification.notification.message || !$scope.sendPushNotification.notification.message.trim()) {
                $scope.sendPushNotification.notification.validateMessage = true;
                var someElement = angular.element(document.getElementById('notificationMessage'));
                $document.scrollToElementAnimated(someElement);
            } else if ($scope.sendPushNotification.notification.url === '' || !$scope.sendPushNotification.notification.url || !$scope.sendPushNotification.notification.url.trim()) {
                $scope.sendPushNotification.notification.isUrlRequired = true;
                var someElement = angular.element(document.getElementById('notificationURL'));
                $document.scrollToElementAnimated(someElement);
            } else if ($scope.sendPushNotification.notification.isUTMParametersRequired &&
                ($scope.sendPushNotification.notification.uTMSource === '' ||
                    !$scope.sendPushNotification.notification.uTMSource ||
                    !$scope.sendPushNotification.notification.showSourceSuccess)) {
                console.log('asdasd');
                $scope.sendPushNotification.notification.validateUTMSource = true;
                var someElement = angular.element(document.getElementById('utmSource'));
                $document.scrollToElementAnimated(someElement);
            } else if ($scope.sendPushNotification.notification.isUTMParametersRequired &&
                (!$scope.sendPushNotification.notification.showMediumSuccess || (!$scope.sendPushNotification.notification.uTMMedium && $scope.sendPushNotification.notification.uTMMedium !== '') || !$scope.sendPushNotification.notification.isUTMMediumValid ||
                    !$scope.sendPushNotification.notification.showCampaignSuccess || (!$scope.sendPushNotification.notification.uTMCampaign && $scope.sendPushNotification.notification.uTMCampaign !== '') || !$scope.sendPushNotification.notification.isUTMCampaignValid ||
                    !$scope.sendPushNotification.notification.showTermSuccess || (!$scope.sendPushNotification.notification.uTMTerm && $scope.sendPushNotification.notification.uTMTerm !== '') || !$scope.sendPushNotification.notification.isUTMTermValid ||
                    !$scope.sendPushNotification.notification.showContentSuccess || (!$scope.sendPushNotification.notification.uTMContent && $scope.sendPushNotification.notification.uTMContent !== '') || !$scope.sendPushNotification.notification.isUTMContentValid)) {
                var someElement = angular.element(document.getElementById('utmMedium'));
                $document.scrollToElementAnimated(someElement);
            } else if (emptyData) {
                var someElement = angular.element(document.getElementById('cmn-toggle-2'));
                $document.scrollToElementAnimated(someElement);
            } else {
                var savePushNotificationModalInstance = $uibModal.open({
                    templateUrl: 'app/modules/notification/views/modal/save.push.notification.modal.html',
                    controller: 'SavePushNotificationModalController',
                    resolve: {
                        sendNewPushNotification: function () {
                            return $scope.sendPushNotification;
                        }
                    },
                    windowClass: 'custom-push-notification-modal'
                });

                savePushNotificationModalInstance.result.then(function (successResponse) {
                    if (!$stateParams['notificationId'])
                        $state.reload();
                    else
                        $state.go('side-nav-template.all-notifications', { tabType: 'save' });
                }, function (error) {
                    console.log(error);
                });
            }
        }

        /*
         * @author: sandeep
         * @created: 08 sep 2016
         * @parmas: no
         * @returns: no
         * @purpose: exit push notification modal popup
         */
        function exitPushNotificationModal() {
            //            $uibModalInstance.close('close');
            var exitPushNotificationModalInstance = $uibModal.open({
                templateUrl: 'app/modules/notification/views/modal/exit.notification.modal.html',
                controller: 'ExitNotificationController',
                windowClass: 'custom-push-notification-modal'
            });

            exitPushNotificationModalInstance.result.then(function (successResponse) {
                if (successResponse === 'except') {
                    $state.reload();
                }
            }, function (error) {
                console.log(error);
            });
        }
        /*
         * @author: sandeep
         * @created: 04 nov 2016
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
                if (response.hasOwnProperty('file')) {
                    $scope.sendPushNotification.notification.image = response.file;
                    $rootScope.engagetoApp.notification.image = response.file;
                    var index = $scope.sendPushNotification.uploadImageList.indexOf(response.file);
                    console.log(index);
                    if (index === -1) {
                        if ($scope.sendPushNotification.uploadImageList.length < 5)
                            $scope.sendPushNotification.uploadImageList.push(response.file);
                        else {
                            $scope.sendPushNotification.uploadImageList.shift();
                            $scope.sendPushNotification.uploadImageList.push(response.file);
                        }
                        $scope.sendPushNotification.notification.logo = '';
                        $scope.sendPushNotification.notification.imageType = 'upload';
                    } else {
                        console.log('i know u');
                        var image = $scope.sendPushNotification.uploadImageList[$scope.sendPushNotification.uploadImageList.length - 1];
                        $scope.sendPushNotification.uploadImageList[$scope.sendPushNotification.uploadImageList.length - 1] = $scope.sendPushNotification.uploadImageList[index];
                        $scope.sendPushNotification.uploadImageList[index] = image;
                    }
                }
                if (response.hasOwnProperty('upload')) {
                    uploadedImageList.push(response.file);
                }
            }, function (error) {
                $rootScope.engagetoApp.notification.image = $scope.sendPushNotification.notification.image;
            });
        }
        /*
         * @author: sandeep
         * @created: 16 may 2017
         * @params: index(number)
         * @return: no
         * @purpose: onClickSelectImage function
         */
        function onClickSelectImage(index) {
            $scope.sendPushNotification.notification.image = $scope.sendPushNotification.uploadImageList[index];
            $rootScope.engagetoApp.notification.image = $scope.sendPushNotification.uploadImageList[index];
        }
        /*
         * @author: sandeep
         * @created: 03 nov 2016
         * @params:  elements max value, title(integer,string)
         * @return: no
         * @purpose: Checking no'of characters entered by user
         */
        function keypress(text_max, name) {
            var text_length;
            if (name == 'title') {
                if ($scope.sendPushNotification.notification.title === undefined) {
                    text_length = 0;
                } else {
                    text_length = $scope.sendPushNotification.notification.title.length;
                }
                $scope.sendPushNotification.notification.title_text_remaining = text_max - text_length;
                if ($scope.sendPushNotification.notification.title_text_remaining >= 0) {
                    $scope.sendPushNotification.notification.showTitleSuccess = true;
                } else {
                    $scope.sendPushNotification.notification.title_text_remaining = 0;
                    $scope.sendPushNotification.notification.showTitleSuccess = false;
                }
            }
            if (name == 'message') {
                if ($scope.sendPushNotification.notification.message === undefined) {
                    text_length = 0;
                } else {
                    text_length = $scope.sendPushNotification.notification.message.length;
                }
                $scope.sendPushNotification.notification.msg_text_remaining = text_max - text_length;
                if ($scope.sendPushNotification.notification.msg_text_remaining >= 0) {
                    $scope.sendPushNotification.notification.showMsgSuccess = true;
                } else {
                    $scope.sendPushNotification.notification.msg_text_remaining = 0;
                    $scope.sendPushNotification.notification.showMsgSuccess = false;
                }
            }
            if (name == 'medium') {
                if ($scope.sendPushNotification.notification.uTMMedium === undefined) {
                    text_length = 0;
                } else {
                    text_length = $scope.sendPushNotification.notification.uTMMedium.length;
                }
                $scope.sendPushNotification.notification.medium_text_remaining = (text_max - text_length);
                if ($scope.sendPushNotification.notification.medium_text_remaining >= 0) {
                    $scope.sendPushNotification.notification.showMediumSuccess = true;
                } else {
                    $scope.sendPushNotification.notification.medium_text_remaining = 0;
                    $scope.sendPushNotification.notification.showMediumSuccess = false;
                }
            }
            if (name == 'source') {
                if (!$scope.sendPushNotification.notification.uTMSource) {
                    text_length = 0;
                } else {
                    text_length = $scope.sendPushNotification.notification.uTMSource.length;
                }
                $scope.sendPushNotification.notification.source_text_remaining = (text_max - text_length);
                if ($scope.sendPushNotification.notification.source_text_remaining >= 0) {
                    $scope.sendPushNotification.notification.showSourceSuccess = true;
                } else {
                    $scope.sendPushNotification.notification.source_text_remaining = 0;
                    $scope.sendPushNotification.notification.showSourceSuccess = false;
                }
            }
            if (name == 'compaign') {
                if (!$scope.sendPushNotification.notification.uTMCampaign) {
                    text_length = 0;
                } else {
                    text_length = $scope.sendPushNotification.notification.uTMCampaign.length;
                }
                $scope.sendPushNotification.notification.compaign_text_remaining = (text_max - text_length);
                if ($scope.sendPushNotification.notification.compaign_text_remaining >= 0) {
                    $scope.sendPushNotification.notification.showCampaignSuccess = true;
                } else {
                    $scope.sendPushNotification.notification.compaign_text_remaining = 0;
                    $scope.sendPushNotification.notification.showCampaignSuccess = false;
                }
            }
            if (name == 'term') {
                if (!$scope.sendPushNotification.notification.uTMTerm) {
                    text_length = 0;
                } else {
                    text_length = $scope.sendPushNotification.notification.uTMTerm.length;
                }
                $scope.sendPushNotification.notification.term_text_remaining = (text_max - text_length);
                if ($scope.sendPushNotification.notification.term_text_remaining >= 0) {
                    $scope.sendPushNotification.notification.showTermSuccess = true;
                } else {
                    $scope.sendPushNotification.notification.term_text_remaining = 0;
                    $scope.sendPushNotification.notification.showTermSuccess = false;
                }
            }
            if (name == 'content') {
                if (!$scope.sendPushNotification.notification.uTMContent) {
                    text_length = 0;
                } else {
                    text_length = $scope.sendPushNotification.notification.uTMContent.length;
                }
                $scope.sendPushNotification.notification.content_text_remaining = (text_max - text_length);
                if ($scope.sendPushNotification.notification.content_text_remaining >= 0) {
                    $scope.sendPushNotification.notification.showContentSuccess = true;
                } else {
                    $scope.sendPushNotification.notification.content_text_remaining = 0;
                    $scope.sendPushNotification.notification.showContentSuccess = false;
                }
            }
            if (name == 'ctaText') {
                angular.forEach($scope.sendPushNotification.advanceOptions.cta, function (v, k) {
                    if (!$scope.sendPushNotification.advanceOptions.cta[k].text) {
                        text_length = 0;
                    } else {
                        text_length = $scope.sendPushNotification.advanceOptions.cta[k].text.length;
                    }
                    $scope.sendPushNotification.advanceOptions.cta[k].text_remaining = (text_max - text_length);
                    if ($scope.sendPushNotification.advanceOptions.cta[k].text_remaining >= 0) {
                        $scope.sendPushNotification.advanceOptions.cta[k].showCtaTextSuccess = true;
                    } else {
                        $scope.sendPushNotification.advanceOptions.cta[k].text_remaining = 0;
                        $scope.sendPushNotification.advanceOptions.cta[k].showCtaTextSuccess = false;
                    }
                });
            }

        }

        /*
         * @author: sandeep
         * @created: 03 nov 2016
         * @params: set expiry and set duration elements title(string)
         * @return: no
         * @purpose: Checking value of set expiry and set duration elements
         */
        function checkValue(name) {
            if (name == 'notificationExpiry') {
                if ($scope.sendPushNotification.advanceOptions.expiryValue) {
                    if ($scope.sendPushNotification.advanceOptions.expiryValue <= 0) {
                        $scope.sendPushNotification.advanceOptions.numLimitMsg = true;
                    } else {
                        $scope.sendPushNotification.advanceOptions.numLimitMsg = false;
                    }
                } else {
                    $scope.sendPushNotification.advanceOptions.numLimitMsg = false;
                }
            }
        }

        /*
         * @author: sandeep
         * @created: 03 nov 2016
         * @params: no
         * @return: no
         * @purpose: on blur checking parrents for utm parmas
         */
        function exitUTMParams(type, index) {
            var _regex = /^[a-zA-Z0-9_-]*$/,
                _space = /^\S/;
            var _urlRegex = /^(http[s]?:\/\/www\.|HTTP[S]?:\/\/WWW\.|http[s]?:\/\/|HTTP[S]?:\/\/|www\.|WWW\.|[A-Za-z]{0})[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
            if (type === 'medium') {
                $scope.sendPushNotification.notification.visitedMedium = true;
                var field = $scope.sendPushNotification.notification.uTMMedium;
                if (field && field !== '') {
                    $scope.sendPushNotification.notification.isUTMMediumValid = _regex.test(field);
                } else {
                    $scope.sendPushNotification.notification.isUTMMediumValid = true;
                }
            }
            if (type === 'source') {
                $scope.sendPushNotification.notification.visitedSource = true;
                var field = $scope.sendPushNotification.notification.uTMSource;
                if (field && field !== '') {
                    $scope.sendPushNotification.notification.isUTMSourceValid = _regex.test(field);
                } else {
                    $scope.sendPushNotification.notification.isUTMSourceValid = true;
                }
            }
            if (type === 'campaign') {
                $scope.sendPushNotification.notification.visitedCampaign = true;
                var field = $scope.sendPushNotification.notification.uTMCampaign;

                if (field && field !== '') {
                    $scope.sendPushNotification.notification.isUTMCampaignValid = _regex.test(field);
                } else {
                    $scope.sendPushNotification.notification.isUTMCampaignValid = true;
                }
            }
            if (type === 'term') {
                $scope.sendPushNotification.notification.visitedTerm = true;
                var field = $scope.sendPushNotification.notification.uTMTerm;
                if (field && field !== '') {
                    $scope.sendPushNotification.notification.isUTMTermValid = _regex.test(field);
                } else {
                    $scope.sendPushNotification.notification.isUTMTermValid = true;
                }
            }
            if (type === 'content') {
                $scope.sendPushNotification.notification.visitedContent = true;
                var field = $scope.sendPushNotification.notification.uTMContent;
                if (field && field !== '') {
                    $scope.sendPushNotification.notification.isUTMContentValid = _regex.test(field);
                } else {
                    $scope.sendPushNotification.notification.isUTMContentValid = true;
                }
            }
            if (type === 'ctaUrl') {
                $scope.sendPushNotification.advanceOptions.cta[index].visitedCtaUrl = true;
                var field = $scope.sendPushNotification.advanceOptions.cta[index].url;
                field == '' || field == 'undefined' ? $scope.sendPushNotification.advanceOptions.cta[index].isAddUTMParametersRequired = false : '';
                var isValidPattern = field !== undefined ? _urlRegex.test(field) : $scope.sendPushNotification.advanceOptions.cta[index].url = '';
                $scope.sendPushNotification.advanceOptions.cta[index].invalidCtaUrlPattern = !isValidPattern;
                $scope.sendPushNotification.advanceOptions.cta[index].isUrlValidated = isValidPattern;
            }
            if (type === 'url') {
                $scope.sendPushNotification.notification.visitedUrl = true;
                $scope.sendPushNotification.notification.url == '' || $scope.sendPushNotification.notification.url == 'undefined' ?
                    $scope.sendPushNotification.notification.isUTMParametersRequired = false : '';
            }
        }
        /*
         * @author: sandeep
         * @created: 03 nov 2016
         * @params: no
         * @return: no
         * @purpose: on focus hiding error msg
         */
        function enteringUTMParams(type, index) {
            if (type === 'medium') {
                $scope.sendPushNotification.advanceOptions.cta[index].visitedMedium = false;
            }
            if (type === 'source') {
                $scope.sendPushNotification.advanceOptions.cta[index].visitedSource = false;
            }
            if (type === 'campaign') {
                $scope.sendPushNotification.advanceOptions.cta[index].visitedCampaign = false;
            }
            if (type === 'term') {
                $scope.sendPushNotification.advanceOptions.cta[index].visitedTerm = false;
            }
            if (type === 'content') {
                $scope.sendPushNotification.advanceOptions.cta[index].visitedContent = false;
            }
        }
        /*
         * @author: sandeep
         * @params: no
         * @return: no
         * @created: 18 feb 20017
         * @purpose: getting segment list by type
         */
        NotificationService.getUploadedImageList().then(function (response) {
            $scope.sendPushNotification.uploadImageList = response.data.data.slice(0, 5);
            uploadedImageList = response.data.data;
            NotificationService.getSegmentList('Audience').then(function (response) {
                $scope.sendPushNotification.advanceOptions.subscribersList = response.data.data;
                NotificationService.getDefaultImage().then(function (response) {
                    defaultImageList = response.data.data;
                    if ($stateParams['notificationId']) {
                        NotificationService.getNotificationById($stateParams.notificationId, $stateParams.notificationType).then(function (response) {
                            $scope.sendPushNotification.notification.id = response.data.data.notification_id;
                            $scope.sendPushNotification.notification.type = $stateParams.notificationType;
                            $scope.sendPushNotification.notification.title = response.data.data.title;
                            $scope.sendPushNotification.notification.message = response.data.data.message;
                            $scope.sendPushNotification.notification.image = response.data.data.logo || Engageto_Default_Image;
                            $rootScope.engagetoApp.notification.image = response.data.data.logo || Engageto_Default_Image;
                            if (response.data.data['url']) {
                                var splitUTMUrl = response.data.data.url.split('?');
                                $scope.sendPushNotification.notification.url = splitUTMUrl[0];
                                if (splitUTMUrl.length > 1) {
                                    $scope.sendPushNotification.notification.isUTMParametersRequired = true;
                                    var urlWithOnlyParams = splitUTMUrl[1].replace('?', '');
                                    angular.forEach(urlWithOnlyParams.split('&'), function (params, key) {
                                        var valueKeyParams = params.split('=');
                                        if (valueKeyParams[0] === 'utm_source') {
                                            $scope.sendPushNotification.notification.uTMSource = valueKeyParams[1];
                                            $scope.sendPushNotification.notification.source_text_remaining = 50 - valueKeyParams[1].trim().length;
                                        }
                                        if (valueKeyParams[0] === 'utm_medium') {
                                            $scope.sendPushNotification.notification.uTMMedium = valueKeyParams[1];
                                            $scope.sendPushNotification.notification.medium_text_remaining = 50 - valueKeyParams[1].trim().length;
                                        }
                                        if (valueKeyParams[0] === 'utm_campaign') {
                                            $scope.sendPushNotification.notification.uTMCampaign = valueKeyParams[1];
                                            $scope.sendPushNotification.notification.compaign_text_remaining = 50 - valueKeyParams[1].trim().length;
                                        }
                                        if (valueKeyParams[0] === 'utm_content') {
                                            $scope.sendPushNotification.notification.uTMContent = valueKeyParams[1];
                                            $scope.sendPushNotification.notification.content_text_remaining = 50 - valueKeyParams[1].trim().length;
                                        }
                                        if (valueKeyParams[0] === 'utm_term') {
                                            $scope.sendPushNotification.notification.uTMTerm = valueKeyParams[1];
                                            $scope.sendPushNotification.notification.term_text_remaining = 50 - valueKeyParams[1].trim().length;
                                        }
                                    });
                                }
                            }
                            if (response.data.data['cta']) {
                                $scope.sendPushNotification.advanceOptions.isAddButtonOpened = true;
                                angular.forEach(response.data.data.cta, function (cta, key) {
                                    $scope.sendPushNotification.advanceOptions.cta[key].text = cta.cta;
                                    $scope.sendPushNotification.advanceOptions.cta[key].url = cta.url;
                                });
                            }
                            if (response.data.data['expiry']) {
                                $scope.sendPushNotification.advanceOptions.expiryType = 'Seconds';
                                $scope.sendPushNotification.advanceOptions.expiryValue = response.data.data.expiry;
                            }
                            if (response.data.data['duration']) {
                                $scope.sendPushNotification.advanceOptions.isDurationInSecs = 'limited';
                            }
                            if (response.data.data['name']) {
                                $scope.sendPushNotification.notification.name = response.data.data.name;
                            }
                            if (response.data.data['scheduled']) {
                                $scope.sendPushNotification.scheduleOrSend.isScheduleNotificationRequired = true;
                                if (response.data.data['scheduled'].type === 'single') {
                                    $scope.sendPushNotification.scheduleOrSend.scheduleType = 'one-time';
                                    $scope.sendPushNotification.scheduleOrSend.ones.selectedDate = new Date(response.data.data['scheduled'].dates[0].date);
                                    $scope.sendPushNotification.scheduleOrSend.ones.selectedDateOptions.minDate = new Date(response.data.data['scheduled'].dates[0].date);
                                    var time = response.data.data['scheduled'].dates[0].time;
                                    var splitedTime = time.split(':'), hours = splitedTime[0], minutes = splitedTime[1], seconds = splitedTime[2];
                                    $scope.sendPushNotification.scheduleOrSend.ones.selectedTime.setHours(hours);
                                    $scope.sendPushNotification.scheduleOrSend.ones.selectedTime.setMinutes(minutes);
                                    $scope.sendPushNotification.scheduleOrSend.ones.selectedTime.setSeconds(seconds);
                                    $scope.sendPushNotification.scheduleOrSend.ones.minTime.setHours(hours);
                                    $scope.sendPushNotification.scheduleOrSend.ones.minTime.setMinutes(minutes);
                                    $scope.sendPushNotification.scheduleOrSend.ones.minTime.setSeconds(seconds);
                                } else if (response.data.data['scheduled'].type === 'multiple') {
                                    $scope.sendPushNotification.scheduleOrSend.scheduleType = 'multiple-date';
                                    $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[0].selectedDate = new Date(response.data.data['scheduled'].dates[0].date);
                                    $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[0].selectedDateOptions.minDate = new Date(response.data.data['scheduled'].dates[0].date);
                                    var time = response.data.data['scheduled'].dates[0].time;
                                    var splitedTime = time.split(':'), hours = splitedTime[0], minutes = splitedTime[1], seconds = splitedTime[2];
                                    $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[0].selectedTime.setHours(hours);
                                    $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[0].selectedTime.setMinutes(minutes);
                                    $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[0].selectedTime.setSeconds(seconds);
                                    $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[0].minTime.setHours(hours);
                                    $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[0].minTime.setMinutes(minutes);
                                    $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[0].minTime.setSeconds(seconds);
                                    if (response.data.data['scheduled'].dates.length > 1) {
                                        angular.forEach(response.data.data['scheduled'].dates, function (value, key) {
                                            if (key > 0) {
                                                $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList.push({
                                                    selectedDate: new Date(value.date),
                                                    selectedDateOptions: {
                                                        minDate: new Date(value.date)
                                                    },
                                                    selectedTime: new Date(new Date().getTime() + 300000), // value.time
                                                    minTime: new Date(new Date().getTime() + 300000), // value.time
                                                    showDateTimePicker: false
                                                });
                                                var time = value.time;
                                                var splitedTime = time.split(':'), hours = splitedTime[0], minutes = splitedTime[1], seconds = splitedTime[2];
                                                $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[key].selectedTime.setHours(hours);
                                                $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[key].selectedTime.setMinutes(minutes);
                                                $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[key].selectedTime.setSeconds(seconds);
                                                $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[key].minTime.setHours(hours);
                                                $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[key].minTime.setMinutes(minutes);
                                                $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[key].minTime.setSeconds(seconds);
                                            }
                                        });
                                    }
                                } else {
                                    $scope.sendPushNotification.scheduleOrSend.scheduleType = 'recurring';
                                    $scope.sendPushNotification.scheduleOrSend.recurring.startDate = new Date(response.data.data['scheduled'].start_date);
                                    $scope.sendPushNotification.scheduleOrSend.recurring.startDateOptions.minDate = new Date(response.data.data['scheduled'].start_date);
                                    var time = response.data.data['scheduled'].time;
                                    var splitedTime = time.split(':'), hours = splitedTime[0], minutes = splitedTime[1], seconds = splitedTime[2];
                                    $scope.sendPushNotification.scheduleOrSend.recurring.selectedTime.setHours(hours);
                                    $scope.sendPushNotification.scheduleOrSend.recurring.selectedTime.setMinutes(minutes);
                                    $scope.sendPushNotification.scheduleOrSend.recurring.selectedTime.setSeconds(seconds);
                                    $scope.sendPushNotification.scheduleOrSend.recurring.repeatedOn = response.data.data['scheduled'].repeat.charAt(0).toUpperCase() + response.data.data['scheduled'].repeat.slice(1);
                                    if (response.data.data['scheduled'].repeat !== 'daily') {
                                        var repeatedType = $scope.sendPushNotification.scheduleOrSend.recurring.repeatedOn === 'Weekly' ? 'daysList' : 'datesList';
                                        angular.forEach($scope.sendPushNotification.scheduleOrSend.recurring[repeatedType], function (day, key) {
                                            console.log('days: ', response.data.data['scheduled'].days.indexOf(day.value));
                                            if (response.data.data['scheduled'].days.indexOf(day.value) !== -1)
                                                day.status = true;
                                        });
                                    }
                                    if (response.data.data['scheduled'].end_date) {
                                        $scope.sendPushNotification.scheduleOrSend.recurring.dateLimit = 'end-date';
                                        $scope.sendPushNotification.scheduleOrSend.recurring.endDate = new Date(response.data.data['scheduled'].end_date);
                                        $scope.sendPushNotification.scheduleOrSend.recurring.endDateOptions.minDate = new Date(response.data.data['scheduled'].end_date);
                                    }
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
                    $rootScope.engagetoApp.isPageLoading = false;
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
                $rootScope.engagetoApp.isPageLoading = false;
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
            $rootScope.engagetoApp.isPageLoading = false;
            EngagetoAppService.showErrorMessage(errorMessage);
        });
        /*
         * @author: sandeep
         * @created: 05 jun 20017
         * @params: type(string)
         * @return: no
         * @purpose: openDateTimePicker function
         */
        function openDateTimePicker(type, index) {
            if (index === undefined) {
                type === 'open' ? $scope.sendPushNotification.scheduleOrSend.ones.showDateTimePicker = true :
                    $scope.sendPushNotification.scheduleOrSend.ones.showDateTimePicker = false;
                if (type === 'select') {
                    if (moment($scope.sendPushNotification.scheduleOrSend.ones.selectedDate).isAfter(new Date())) {
                        $scope.sendPushNotification.scheduleOrSend.ones.minTime = undefined;
                    } else {
                        $scope.sendPushNotification.scheduleOrSend.ones.selectedTime = new Date(new Date().getTime() + 300000);
                        $scope.sendPushNotification.scheduleOrSend.ones.minTime = new Date(new Date().getTime() + 300000);
                    }
                }
            } else {
                //for multiple dateTime portion
                type === 'open' ? $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[index].showDateTimePicker = true :
                    $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[index].showDateTimePicker = false;
                if (type === 'select') {
                    if (moment($scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[index].selectedDate).isAfter(new Date())) {
                        $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[index].minTime = undefined;
                    } else {
                        $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[index].selectedTime = new Date(new Date().getTime() + 300000);
                        $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList[index].minTime = new Date(new Date().getTime() + 300000);
                    }
                }
            }
        }
        /*
         * @author: sandeep
         * @created: 05 jun 20017
         * @params: no
         * @return: no
         * @purpose: addDateTimeInline function
         */
        function addDateTimeInline() {
            $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList.push({
                selectedDate: new Date(),
                selectedDateOptions: {
                    minDate: new Date()
                },
                selectedTime: new Date(new Date().getTime() + 300000),
                minTime: new Date(new Date().getTime() + 300000)
            });
        }
        /*
         * @author: sandeep
         * @created: 05 jun 20017
         * @params: index
         * @return: no
         * @purpose: removeDateTimeInline function
         */
        function removeDateTimeInline(index) {
            $scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList.splice(index, 1);
        }
        /*
         * @author: sandeep
         * @created: 05 jun 20017
         * @params: type(string)
         * @return: no
         * @purpose: openPicker function
         */
        function openPicker(type) {
            if (type === 'date')
                $scope.sendPushNotification.scheduleOrSend.recurring.showDatePicker = true;
            else if (type === 'time' && $scope.sendPushNotification.scheduleOrSend.recurring.dateLimit === 'end-date') {
                $scope.sendPushNotification.scheduleOrSend.recurring.showTimePicker = true;
            }
        }
        /*
         * @author: sandeep
         * @created: 05 jun 20017
         * @params: type(string)
         * @return: no
         * @purpose: onChangeLimit function
         */
        function onChangeLimit(type) {
            $scope.sendPushNotification.scheduleOrSend.recurring.errorMessage = '';
            if (type === 'end-date') {
                $scope.sendPushNotification.scheduleOrSend.recurring.endDate = $scope.sendPushNotification.scheduleOrSend.recurring.startDate;
                $scope.sendPushNotification.scheduleOrSend.recurring.endDateOptions.minDate = $scope.sendPushNotification.scheduleOrSend.recurring.startDate;
            } else {
                $scope.sendPushNotification.scheduleOrSend.recurring.endDate = undefined;
            }
        }
        /*
         * @author: sandeep
         * @created: 05 jun 20017
         * @params: no
         * @return: no
         * @purpose: onChangeDatePicker function
         */
        function onChangeDatePicker() {
            if ($scope.sendPushNotification.scheduleOrSend.recurring.dateLimit === 'end-date') {
                $scope.sendPushNotification.scheduleOrSend.recurring.endDateOptions.minDate = $scope.sendPushNotification.scheduleOrSend.recurring.startDate;
                if (moment($scope.sendPushNotification.scheduleOrSend.recurring.startDate).isAfter($scope.sendPushNotification.scheduleOrSend.recurring.endDate))
                    $scope.sendPushNotification.scheduleOrSend.recurring.errorMessage = 'Start date should be before end date.';
                else
                    $scope.sendPushNotification.scheduleOrSend.recurring.errorMessage = '';
            }
        }
        /*
         * @author: sandeep
         * @created: 05 jun 20017
         * @params: type(string)
         * @return: no
         * @purpose: onChangeScheduleType function
         */
        function onChangeScheduleType(type) {
            if (type === 'one-time') {
                $scope.sendPushNotification.scheduleOrSend.ones.selectedTime = new Date(new Date().getTime() + 300000);
                if (moment($scope.sendPushNotification.scheduleOrSend.ones.selectedDate).isAfter(new Date()))
                    $scope.sendPushNotification.scheduleOrSend.ones.minTime = undefined;
                else
                    $scope.sendPushNotification.scheduleOrSend.ones.minTime = new Date(new Date().getTime() + 300000);
            } else if (type === 'multiple-date') {
                angular.forEach($scope.sendPushNotification.scheduleOrSend.multiple.dateTimeObejctList, function (dateTime, key) {
                    dateTime.selectedTime = new Date(new Date().getTime() + 300000);
                    if (moment(dateTime.selectedDate).isAfter(new Date()))
                        dateTime.minTime = undefined;
                    else
                        dateTime.minTime = new Date(new Date().getTime() + 300000);
                });
            } else if (type === 'recurring') {
                $scope.sendPushNotification.scheduleOrSend.recurring.selectedTime = new Date();
            }
        }

    }
})(window.angular);