(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('NotificationGeneratorController', notificationGeneratorController);

    notificationGeneratorController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService',
        '$state',
        '$timeout',
        '$document',
        '$uibModal',
        'Upload',
        'Engageto_Default_Image'
    ];

    function notificationGeneratorController(
            $scope,
            $rootScope,
            AuthService,
            $state,
            $timeout,
            $document,
            $uibModal,
            Upload,
            Engageto_Default_Image) {
        var title = '', description = '';
        $timeout(function () {
            var titleEmoji = $('#notificationTitle').emojioneArea({
                pickerPosition: "bottom",
                filtersPosition: "bottom",
                tonesStyle: "bullet"
            });
            titleEmoji[0].emojioneArea.on("emojibtn.click", function (btn, event) {
                $timeout(function () {
                    $scope.notificationGenerator.notification.titleCharaLength -= 2;
                }, 1);
            });
            titleEmoji[0].emojioneArea.on("focus", function (btn, event) {
                $timeout(function () {
                    $scope.notificationGenerator.notification.isTitleBlured = false;
                    $scope.notificationGenerator.notification.isTitleRequired = undefined;
                    angular.element('#notificationTitle').next().removeClass('error-field');
                }, 1);
            });
            titleEmoji[0].emojioneArea.on("blur", function (btn, event) {
                $timeout(function () {
                    $scope.notificationGenerator.notification.isTitleBlured = true;
                    if (btn.html() == '') {
                        $scope.notificationGenerator.notification.isTitleRequired = true;
                        angular.element('#notificationTitle').next().addClass('error-field');
                    } else {
                        $scope.notificationGenerator.notification.isTitleRequired = false;
                        angular.element('#notificationTitle').next().removeClass('error-field');
                    }
                }, 1);
            });
            titleEmoji[0].emojioneArea.on("keyup keypress", function (editor, event) {
                var emojiEditedCount = 0;
                var htmlTextNodes = $.parseHTML(editor.html());
                $.each(htmlTextNodes, function (i, el) {
                    el.nodeName === 'IMG' ? emojiEditedCount++ : '';
                });
                $timeout(function () {
                    if (editor.text() || emojiEditedCount) {
                        if (editor.text().length + (emojiEditedCount * 2) <= 50) {
                            $scope.notificationGenerator.notification.titleCharaLength = 50 - (editor.text().length + (emojiEditedCount * 2));
                            title = titleEmoji[0].emojioneArea.getText();
                        } else {
                            titleEmoji[0].emojioneArea.setText(title);
                        }
                    }
                    else {
                        title = '';
                        titleEmoji[0].emojioneArea.setText(title);
                        $scope.notificationGenerator.notification.titleCharaLength = 50;
                    }

                    if ($scope.notificationGenerator.notification.titleCharaLength >= 0) {
                        angular.element('#notificationTitle').next().removeClass('error-field');
                        $scope.notificationGenerator.notification.isTitleShorter = true;
                    } else {
                        angular.element('#notificationTitle').next().addClass('error-field');
                        $scope.notificationGenerator.notification.titleCharaLength = 0;
                        $scope.notificationGenerator.notification.isTitleShorter = false;
                    }
                    $scope.notificationGenerator.notification.title = title;
                }, 1);
            });
            var decriptionEmoji = $('#notificationDescription').emojioneArea({
                pickerPosition: "bottom",
                filtersPosition: "bottom",
                tonesStyle: "bullet",
                sprite: false
            });
            decriptionEmoji[0].emojioneArea.on("emojibtn.click", function (btn, event) {
                $timeout(function () {
                    $scope.notificationGenerator.notification.descriptionCharaLength -= 2;
                }, 1);
            });
            decriptionEmoji[0].emojioneArea.on("focus", function (btn, event) {
                $timeout(function () {
                    $scope.notificationGenerator.notification.isDescriptionBlured = false;
                    $scope.notificationGenerator.notification.isDescriptionRequired = undefined;
                    angular.element('#notificationDescription').next().removeClass('error-field');
                }, 1);
            });
            decriptionEmoji[0].emojioneArea.on("blur", function (btn, event) {
                $timeout(function () {
                    $scope.notificationGenerator.notification.isDescriptionBlured = true;
                    if (btn.html() == '') {
                        $scope.notificationGenerator.notification.isDescriptionRequired = true;
                        angular.element('#notificationDescription').next().addClass('error-field');
                    } else {
                        $scope.notificationGenerator.notification.isDescriptionRequired = false;
                        angular.element('#notificationDescription').next().removeClass('error-field');
                    }
                }, 1);
            });
            decriptionEmoji[0].emojioneArea.on("keyup keypress", function (editor, event) {
                var emojiEditedCount = 0;
                var htmlTextNodes = $.parseHTML(editor.html());
                $.each(htmlTextNodes, function (i, el) {
                    el.nodeName === 'IMG' ? emojiEditedCount++ : '';
                });
                $timeout(function () {
                    if (editor.text() || emojiEditedCount) {
                        if (editor.text().length + (emojiEditedCount * 2) <= 100) {
                            $scope.notificationGenerator.notification.descriptionCharaLength = 100 - (editor.text().length + (emojiEditedCount * 2));
                            description = decriptionEmoji[0].emojioneArea.getText();
                        } else {
                            decriptionEmoji[0].emojioneArea.setText(description);
                        }
                    } else {
                        description = '';
                        decriptionEmoji[0].emojioneArea.setText(description);
                        $scope.notificationGenerator.notification.descriptionCharaLength = 100;
                    }
                    if ($scope.notificationGenerator.notification.descriptionCharaLength >= 0) {
                        angular.element('#notificationDescription').next().removeClass('error-field');
                        $scope.notificationGenerator.notification.isDescriptionShorter = true;
                    } else {
                        angular.element('#notificationDescription').next().addClass('error-field');
                        $scope.notificationGenerator.notification.descriptionCharaLength = 0;
                        $scope.notificationGenerator.notification.isDescriptionShorter = false;
                    }
                    $scope.notificationGenerator.notification.description = description;
                }, 1);
            });
        }, 500);
        //initializing partners variables
        $scope.notificationGenerator = {
            browserPreviewTab: 'Chrome',
            notification: AuthService.getNotificationGeneratorValues(),
            advanceOptions: AuthService.getNotificationGeneratorAdvanceValues(),
            showNotification: false,
            notificationPreview: notificationPreview,
            errorMessage: '',
            addCtaInline: addCtaInline,
            showAdvanceOptionsTab: false,
            send: send
        };
        /* Notification Preview Display on Button Tap */
        function notificationPreview() {
            $scope.notificationGenerator.showNotification = !$scope.notificationGenerator.showNotification;
        }
        /*
         * @author: sandeep
         * @created: 01 nov 2016
         * @params: no
         * @return: no
         * @purpose: add inline cta
         */
        function addCtaInline() {
            $scope.notificationGenerator.advanceOptions.cta.push(
                    AuthService.getNotificationGeneratorAdvanceCtaValue()
                    );
        }

        /*
         * @author: sandeep
         * @params: no
         * @return: no
         * @created: 24 jan 2017
         * @purpose: send push notification
         */
        function send() {
            var emptyData = false;
            angular.forEach($scope.notificationGenerator.advanceOptions.cta, function (v, k) {
                if (((v.text != '' && v.url == '') || (v.text == '' && v.url != '') || v.isCtaUrlValid === false)) {
                    emptyData = true;
                }
            });
            if ($scope.notificationGenerator.notification.title === '' || !$scope.notificationGenerator.notification.title || !$scope.notificationGenerator.notification.title.trim()) {
                $scope.notificationGenerator.notification.isTitleRequired = true;
                angular.element('#notificationTitle').next().addClass('error-field');
                var someElement = angular.element(document.getElementById('notification-generator-title'));
                $document.scrollToElementAnimated(someElement);
            } else if (!$scope.notificationGenerator.notification.url && $scope.notificationGenerator.notification.url !== '' && $scope.notificationGenerator.notification.isUrlValid === false) {
                var someElement = angular.element(document.getElementById('notificationUrl'));
                $document.scrollToElementAnimated(someElement);
            } else if ($scope.notificationGenerator.notification.description === '' || !$scope.notificationGenerator.notification.description || !$scope.notificationGenerator.notification.description.trim()) {
                $scope.notificationGenerator.notification.isDescriptionRequired = true;
                angular.element('#notificationDescription').next().addClass('error-field');
                var someElement = angular.element(document.getElementById('notification-generator-description'));
                $document.scrollToElementAnimated(someElement);
            } else if ($scope.notificationGenerator.notification.isUTMParametersRequired &&
                    ($scope.notificationGenerator.notification.uTMSource === '' ||
                            !$scope.notificationGenerator.notification.uTMSource ||
                            $scope.notificationGenerator.notification.invalidUTMSourcePattern)) {
                var someElement = angular.element(document.getElementById('utmSource'));
                $document.scrollToElementAnimated(someElement);
            } else if ($scope.notificationGenerator.notification.isUTMParametersRequired &&
                    ((!$scope.notificationGenerator.notification.uTMMedium && $scope.notificationGenerator.notification.uTMMedium !== '') || $scope.notificationGenerator.notification.invalidUTMMediumPattern ||
                            (!$scope.notificationGenerator.notification.uTMCampaign && $scope.notificationGenerator.notification.uTMCampaign !== '') || $scope.notificationGenerator.notification.invalidUTMCompaignPattern ||
                            (!$scope.notificationGenerator.notification.uTMTerm && $scope.notificationGenerator.notification.uTMTerm !== '') || $scope.notificationGenerator.notification.invalidUTMTermPattern ||
                            (!$scope.notificationGenerator.notification.uTMContent && $scope.notificationGenerator.notification.uTMContent !== '') || $scope.notificationGenerator.notification.invalidUTMContentPattern)) {
                var someElement = angular.element(document.getElementById('utmMedium'));
                $document.scrollToElementAnimated(someElement);
            } else if (emptyData) {
                var someElement = angular.element(document.getElementById('cmn-toggle-2'));
                $document.scrollToElementAnimated(someElement);
            } else {
                $rootScope.engagetoApp.isLoading = true;
                var notificationUrl = $scope.notificationGenerator.notification.url;
                if ($scope.notificationGenerator.notification.isUTMParametersRequired) {
                    notificationUrl = $scope.notificationGenerator.notification.url.indexOf('?') === -1 ? $scope.notificationGenerator.notification.url + '?utm_source=' + $scope.notificationGenerator.notification.uTMSource :
                            $scope.notificationGenerator.notification.url + '&utm_source=' + $scope.notificationGenerator.notification.uTMSource;
                    $scope.notificationGenerator.notification.uTMMedium != '' ? notificationUrl += '&utm_medium=' + $scope.notificationGenerator.notification.uTMMedium : '';
                    $scope.notificationGenerator.notification.uTMCampaign != '' ? notificationUrl += '&utm_campaign=' + $scope.notificationGenerator.notification.uTMCampaign : '';
                    $scope.notificationGenerator.notification.uTMTerm != '' ? notificationUrl += '&utm_term=' + $scope.notificationGenerator.notification.uTMTerm : '';
                    $scope.notificationGenerator.notification.uTMContent != '' ? notificationUrl += '&utm_content=' + $scope.notificationGenerator.notification.uTMContent : '';
                }
                if (notificationUrl !== '' && typeof notificationUrl !== undefined) {
                    notificationUrl.indexOf('https://') !== -1 ? '' : notificationUrl.indexOf('http://') !== -1 ? '' : notificationUrl = 'http://' + notificationUrl;
                }
                if ($scope.notificationGenerator.notification.image !== Engageto_Default_Image) {
                    $scope.notificationGenerator.notification.imageType = 'upload';
                }
                //perparing request structure for creating welcome notification
                var notificationGenerator = {
                    title: $scope.notificationGenerator.notification.title,
                    message: $scope.notificationGenerator.notification.description
                }, cta = [];
                angular.forEach($scope.notificationGenerator.advanceOptions.cta, function (v, k) {
                    if (v.url !== '' && v.text !== '') {
                        var url = v.url;
                        url = url.indexOf('https://') !== -1 ? '' : url.indexOf('http://') !== -1 ? '' : url = 'http://' + url;
                        cta.push({
                            cta: v.text,
                            url: url
                        });
                    }
                });
                //adding url to request structure if exists
                if (notificationUrl !== '') {
                    notificationGenerator.url = notificationUrl;
                }
                //adding cta to request structure if exists
                if (cta.length > 0) {
                    notificationGenerator.cta = cta;
                }
                console.log('Final Data: ', notificationGenerator);
                notificationGenerator.imageType = $scope.notificationGenerator.notification.imageType;
                if ($scope.notificationGenerator.notification.imageType === 'upload') {
                    AuthService.uploadNotificationGeneratorImage($scope.notificationGenerator.notification.image).then(function (response) {
                        notificationGenerator.image = response.data.data.image;
                        console.log(notificationGenerator);
                        intentNotificationGenerator(notificationGenerator);
                        $rootScope.engagetoApp.isLoading = false;
                    }, function (error) {
                        console.log('Error: ', error);
                        $rootScope.engagetoApp.isLoading = false;
                    });
                } else {
                    notificationGenerator.image = $scope.notificationGenerator.notification.image,
                            console.log(notificationGenerator);
                    intentNotificationGenerator(notificationGenerator);
                    $rootScope.engagetoApp.isLoading = false;
                }
            }
        }
        //on window scroll making preview tab fixed or absolute
        $(window).scroll(function () {
            var doc = document.documentElement;
            var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
            if (top > 190) {
                angular.element('#notification-preview-custom').css({position: 'fixed', top: '85px'});
            } else {
                angular.element('#notification-preview-custom').css({position: 'absolute', top: '280px'});
            }
        });
        $rootScope.engagetoApp.isPageLoading = false;

        /*
         * @author: sandeep
         * @created: 27 feb 2017
         * @returns: no
         * @params: no
         * @purpose: getting default image
         */
//        AuthService.getDefaultImage().then(function(response){
//            console.log(response);
//            $scope.notificationGenerator.notification.image = 'app/assets/images/blue-logo.png';
//        }, function(error){
//            console.log(error);
//        });
    }
})(window.angular);