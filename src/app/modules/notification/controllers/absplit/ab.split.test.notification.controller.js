(function (angular) {

    'use strict';

    angular
            .module('notification')
            .controller('AbSplitTestNotificationCtrl', abSplitTestNotificationCtrl);

    abSplitTestNotificationCtrl.$inject = [
        '$scope',
        '$uibModal',
        '$location',
        '$anchorScroll',
        'WEB_Engageto_Constants',
        'AB_Split_Test_Notification',
        'AB_Split_Test_AdvanceOptions',
        'AB_Split_Test_AdvanceOptions_CTA_Second',
        'AB_Split_Test_Summary',
        'NotificationService',
        '$timeout',
        '$document'
    ];

    function abSplitTestNotificationCtrl(
            $scope,
            $uibModal,
            $location,
            $anchorScroll,
            WEB_Engageto_Constants,
            AB_Split_Test_Notification,
            AB_Split_Test_AdvanceOptions,
            AB_Split_Test_AdvanceOptions_CTA_Second,
            AB_Split_Test_Summary,
            NotificationService,
            $timeout,
            $document) {
        //initializing ab split variables
        $scope.abSplitNotification = {
            activeTab: 0,
            browserPreviewTab: 'Chrome',
            notification: AB_Split_Test_Notification,
            advanceOptions: AB_Split_Test_AdvanceOptions,
            summary: AB_Split_Test_Summary,
            showNotification: false,
            isABTestPossible: true,
            isNotificationExcedded: false,
            listOfNotification: [],
            listIndex: 0,
            notificationPreview: notificationPreview,
            exitABSplitNotificationModal: exitABSplitNotificationModal,
            nextPage: nextPage,
            previousPage: previousPage,
            uploadImageModal: uploadImageModal,
            addCtaInline: addCtaInline,
            addNotification: addNotification,
            openDateTime: openDateTime,
            startABTest: startABTest,
            hideDangerAlert: hideDangerAlert,
            changeNotificationPreview: changeNotificationPreview
        };
        $scope.abSplitNotification.advanceOptions.subscribersList = WEB_Engageto_Constants.subscribers_list;
        $scope.abSplitNotification.summary.subscribersList = WEB_Engageto_Constants.subscribers_list;

        //adding notification to list
        $scope.abSplitNotification.listOfNotification.push({
            notification: $scope.abSplitNotification.notification,
            advanceOptions: $scope.abSplitNotification.advanceOptions
        });
        /* Notification Preview Display on Button Tap */
        function notificationPreview() {
            $scope.abSplitNotification.showNotification = !$scope.abSplitNotification.showNotification;
        }

        /*
         * @author: sandeep
         * @created: 21 nov 2016
         * @params: no
         * @return: no
         * @purpose: exit ab split notification modal popup
         */
        function exitABSplitNotificationModal() {
            var exitABSplitNotificationModalInstance = $uibModal.open({
                templateUrl: 'app/modules/notification/views/exit.notification.modal.html',
                controller: 'ExitNotificationController',
                windowClass: 'custom-push-notification-modal'
            });

            exitABSplitNotificationModalInstance.result.then(function (successResponse) {
                console.log(successResponse);
                if (successResponse === 'except') {
                    $state.go('side-nav-template.new-push-notification');
                }
            }, function (error) {
                console.log(error);
            });
        }
        /*
         * @author: sandeep
         * @created: 21 nov 2016
         * @params: no
         * @return: no
         * @purpose: uploadImageModal modal popup
         */
        function uploadImageModal() {
            var uploadImageModalInstance = $uibModal.open({
                templateUrl: 'app/modules/notification/views/modal/upload.images.manager.modal.html',
                controller: 'UploadImageManagerModalController',
                windowClass: 'upload-image-manager-modal'
            });

            uploadImageModalInstance.result.then(function (response) {
                if (response.hasOwnProperty('file')) {
                    $scope.abSplitNotification.notification.image = response.file;
                    $scope.abSplitNotification.notification.logo = '';
                    $scope.abSplitNotification.listOfNotification[$scope.abSplitNotification.listIndex].notification.image = response.file;
                    $scope.abSplitNotification.listOfNotification[$scope.abSplitNotification.listIndex].notification.logo = '';
                } else if (response.hasOwnProperty('logo')) {
                    $scope.abSplitNotification.notification.logo = response.logo;
                    $scope.abSplitNotification.listOfNotification[$scope.abSplitNotification.listIndex].notification.logo = response.logo;
                }
            }, function (error) {
                console.log(error);
            });
        }
        /*
         * @author: sandeep
         * @created: 21 nov 2016
         * @params: pageNumber(number)
         * @return: no
         * @purpose: navigate to next tab
         * @modified: 28 nov 2016
         * @modified by: sandeep(added validation check on click)
         */
        function nextPage(pageNumber) {
            console.log(pageNumber);
            if (pageNumber === 1) {
                if ($scope.abSplitNotification.notification.title === '' || !$scope.abSplitNotification.notification.title || !$scope.abSplitNotification.notification.isTitleShorter || $scope.abSplitNotification.notification.title.trim() == '') {
                    $scope.abSplitNotification.notification.isTitleRequired = true;
                    var someElement = angular.element(document.getElementById('notificationTitle'));
                    $document.scrollToElementAnimated(someElement);
                } else if ($scope.abSplitNotification.notification.message === '' || !$scope.abSplitNotification.notification.message || !$scope.abSplitNotification.notification.isMessageShorter || $scope.abSplitNotification.notification.message.trim() == '') {
                    $scope.abSplitNotification.notification.isMessageRequired = true;
                    var someElement = angular.element(document.getElementById('notificationMessage'));
                    $document.scrollToElementAnimated(someElement);
                } else if ($scope.abSplitNotification.notification.isUrlValid === false) {
                    var someElement = angular.element(document.getElementById('notificationURL'));
                    $document.scrollToElementAnimated(someElement);
                } else if ($scope.abSplitNotification.notification.isUTMParametersRequired &&
                        ($scope.abSplitNotification.notification.uTMSource === '' ||
                                !$scope.abSplitNotification.notification.uTMSource ||
                                !$scope.abSplitNotification.notification.isUtmSourceShorter ||
                                $scope.abSplitNotification.notification.invalidUTMSourcePattern)) {
                    $scope.abSplitNotification.notification.isUtmSourceRequired = true;
                    var someElement = angular.element(document.getElementById('utmSource'));
                    $document.scrollToElementAnimated(someElement);
                } else if ($scope.abSplitNotification.notification.isUTMParametersRequired &&
                        (!$scope.abSplitNotification.notification.isUtmMediumShorter ||
                                $scope.abSplitNotification.notification.invalidUTMMediumPattern ||
                                !$scope.abSplitNotification.notification.isUtmCompaignShorter ||
                                $scope.abSplitNotification.notification.invalidUTMCompaignPattern ||
                                !$scope.abSplitNotification.notification.isUtmTermShorter ||
                                $scope.abSplitNotification.notification.invalidUTMTermPattern ||
                                !$scope.abSplitNotification.notification.isUtmContentShorter ||
                                $scope.abSplitNotification.notification.invalidUTMContentPattern)) {
                    var someElement = angular.element(document.getElementById('utmMedium'));
                    $document.scrollToElementAnimated(someElement);
                } else {
                    var someElement = angular.element(document.getElementById('notification-scroll-wrapper'));
                    $document.scrollToElementAnimated(someElement);
                    $scope.abSplitNotification.activeTab = pageNumber;
                }
            } else if (pageNumber === 2) {
                var emptyData = false, index = -1;
                angular.forEach($scope.abSplitNotification.advanceOptions.cta, function (v, k) {
                    if (!v.isCtaTextShorter || v.isCtaTextRequired || v.isCtaUrlValid === false || v.isCtaUrlRequired) {
                        emptyData = true;
                        index = k === 0 ? 2 : 3;
                    } else
                    if (v.isAddUTMParametersRequired && ((!v.isUTMSourceShorter || v.isUTMSourceRequired || v.invalidUTMSourcePattern) ||
                            (!v.isUTMMediumShorter || v.invalidUTMMediumPattern) ||
                            (!v.isUTMCampaignShorter || v.invalidUTMCampaignPattern) ||
                            (!v.isUTMTermShorter || v.invalidUTMTermPattern) ||
                            (!v.isUTMContentShorter || v.invalidUTMContentPattern))) {
                        emptyData = true;
                        index = k;
                    } else
                    if (v.uTMSource === '' && !v.uTMSource && v.isAddUTMParametersRequired) {
                        emptyData = true;
                        v.isUTMSourceRequired = true;
                        v.isUTMSourceBlured = true;
                        index = k;
                    }
                });
                if (($scope.abSplitNotification.advanceOptions.expiryType === 'Days' && $scope.abSplitNotification.advanceOptions.expiryValue > 28) ||
                        ($scope.abSplitNotification.advanceOptions.expiryType === 'Hours' && $scope.abSplitNotification.advanceOptions.expiryValue > 672) ||
                        ($scope.abSplitNotification.advanceOptions.expiryType === 'Minutes' && $scope.abSplitNotification.advanceOptions.expiryValue > 40320) ||
                        ($scope.abSplitNotification.advanceOptions.expiryType === 'Seconds' && $scope.abSplitNotification.advanceOptions.expiryValue > 2419200) ||
                        ($scope.abSplitNotification.advanceOptions.expiryValue && $scope.abSplitNotification.advanceOptions.expiryValue <= 0) || !$scope.abSplitNotification.advanceOptions.isExpiryValid) {
                    emptyData = true;
                }
//                if ((($scope.abSplitNotification.advanceOptions.durationInSecs && $scope.abSplitNotification.advanceOptions.durationInSecs <= 0) || !$scope.abSplitNotification.advanceOptions.isDurationValid) && $scope.abSplitNotification.advanceOptions.isDurationInSecs == 'limited') {
//                    emptyData = true;
//                }
                if (emptyData) {
                    var someElement = '';
                    index !== -1 && index !== 2 && index !== 3 ? someElement = angular.element(document.getElementById('utm-params-part-' + index))
                            : index === 2 ? someElement = angular.element(document.getElementById('notification-scroll-wrapper'))
                            : index === 3 && !$scope.abSplitNotification.advanceOptions.cta[0].isAddUTMParametersRequired ? someElement = angular.element(document.getElementById('notification-scroll-wrapper'))
                            : index === 3 && $scope.abSplitNotification.advanceOptions.cta[0].isAddUTMParametersRequired ? someElement = angular.element(document.getElementById('utmTerm0')) : '';
                    index === -1 ? '' : $document.scrollToElementAnimated(someElement);
                } else {
                    var someElement = angular.element(document.getElementById('notification-scroll-wrapper'));
                    $document.scrollToElementAnimated(someElement);
                    $scope.abSplitNotification.activeTab = pageNumber;
                }

            }
        }
        /*
         * @author: sandeep
         * @created: 21 nov 2016
         * @params: pageNumber(number)
         * @return: no
         * @purpose: navigate to previous tab
         */
        function previousPage(pageNumber) {
            var someElement = angular.element(document.getElementById('notification-scroll-wrapper'));
            $document.scrollToElementAnimated(someElement);
            $scope.abSplitNotification.activeTab = pageNumber;
        }
        /*
         * @author: sandeep
         * @created: 21 nov 2016
         * @params: no
         * @return: no
         * @purpose: add inline cta
         * @modified: 29 nov 2016
         * @modified by: sandeep(added cta to list)
         */
        function addCtaInline() {
            $scope.abSplitNotification.advanceOptions.cta.push(
                    AB_Split_Test_AdvanceOptions_CTA_Second
                    );
//            angular.copy($scope.abSplitNotification.advanceOptions.cta,
//                    $scope.abSplitNotification.listOfNotification[$scope.abSplitNotification.listIndex].advanceOptions.cta);
        }
        /*
         * @author: sandeep
         * @created: 28 nov 2016
         * @params: no
         * @return: no
         * @purpose: add notification to list
         */
        function addNotification() {
            if ($scope.abSplitNotification.listIndex < 5) {
                //initializing default values for notification and advanceOptions
                var abSplitNotificationObject = NotificationService.getABSplitNotificationValues();
                $scope.abSplitNotification.listOfNotification[$scope.abSplitNotification.listIndex].notification = $scope.abSplitNotification.notification;
                $scope.abSplitNotification.listOfNotification[$scope.abSplitNotification.listIndex].advanceOptions = $scope.abSplitNotification.advanceOptions;
                $scope.abSplitNotification.notification = abSplitNotificationObject.notification;
                $scope.abSplitNotification.advanceOptions = abSplitNotificationObject.advanceOptions;
                $scope.abSplitNotification.listOfNotification.push({
                    notification: $scope.abSplitNotification.notification,
                    advanceOptions: $scope.abSplitNotification.advanceOptions
                });
                $scope.abSplitNotification.listIndex++;
                $scope.abSplitNotification.activeTab = 0;
            } else {
                $scope.abSplitNotification.isNotificationExcedded = true;
                $timeout(function () {
                    $scope.abSplitNotification.isNotificationExcedded = false;
                }, 2000);
            }
        }
        /*
         * @author: sandeep
         * @created: 03 dec 2016
         * @params: index(number)
         * @return: no
         * @purpose: changeNotificationPreview
         */
        function changeNotificationPreview(index) {
            $scope.abSplitNotification.notification = $scope.abSplitNotification.listOfNotification[index].notification;
            $scope.abSplitNotification.advanceOptions = $scope.abSplitNotification.listOfNotification[index].advanceOptions;
            $scope.abSplitNotification.listIndex = index;
            $scope.abSplitNotification.activeTab = 0;
        }
        /*
         * @author: sandeep
         * @created: 29 nov 2016
         * @params: no
         * @return: no
         * @purpose: openDateTime
         */
        function openDateTime() {
            var dt = new Date();
            var time = dt.getHours() + ":" + (dt.getMinutes() + 15) + ":" + dt.getSeconds();
            var logic = function (dateText, $input) {
                $scope.abSplitNotification.summary.selectedDate = dateText;
                var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                var selectedDate = new Date(dateText);

                today = new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate();
                selectedDate = new Date(dateText).getFullYear() + "/" + (new Date(dateText).getMonth() + 1) + "/" + new Date(dateText).getDate();
                time = new Date().getHours() + ":" + (new Date().getMinutes() + 15);
                if (selectedDate == today) {
                    var input = today + ' ' + time;
                    $("#datetimepicker").val(input);
                    this.setOptions({
                        minTime: time});
                } else if (selectedDate > today || selectedDate < today) {
                    this.setOptions({
                        minTime: false
                    });
                }
            };
            $('#datetimepicker').datetimepicker({
                onChangeDateTime: logic,
                minDate: 0,
                minTime: time,
                step: 1
            });
        }
        /*
         * @author: sandeep
         * @created: 02 dec 2016
         * @params: no
         * @return: no
         * @purpose: startABTest
         */
        function startABTest() {
            if ($scope.abSplitNotification.listOfNotification.length < 2) {
                $scope.abSplitNotification.isABTestPossible = false;
                $timeout(function () {
                    $scope.abSplitNotification.isABTestPossible = true;
                }, 2000);
            }
        }
        /*
         * @author : sandeep
         * @created : 02 dec 2016
         * @params: no
         * @return: no
         * @purpose: closing danger alert
         */
        function hideDangerAlert() {
            $scope.abSplitNotification.isABTestPossible = true;
            $scope.abSplitNotification.isNotificationExcedded = false;
        }
    }
})(window.angular);
