(function (angular) {
    'use strict';

    angular
            .module('allNotifications')
            .controller('AllNotificationsController', allNotificationsController);

    allNotificationsController.$inject = [
        '$scope',
        '$rootScope',
        '$state',
        '$uibModal',
        'AllNotificationsService',
        'DTOptionsBuilder',
        'DTColumnDefBuilder',
        'AuthService',
        '$stateParams',
        'EngagetoAppService',
        '$filter',
        '$window'
    ];

    function allNotificationsController(
            $scope,
            $rootScope,
            $state,
            $uibModal,
            AllNotificationsService,
            DTOptionsBuilder,
            DTColumnDefBuilder,
            AuthService,
            $stateParams,
            EngagetoAppService,
            $filter,
            $window) {
        //active class for allNotification
        $rootScope.engagetoApp.setting.active = 'allNotifications';

        /*
         * @author: sandeep
         * @created: 15 dec 2016
         * @params: no
         * @return: no
         * @purpose: download report modal popup
         */
        $scope.allNotifications = {
            activeTab: $stateParams.tabType === 'sent' ? 0 : $stateParams.tabType === 'schedule' ? 1 : $stateParams.tabType === 'save' ? 2 : $stateParams.tabType === 'welcome' ? 4 : 0,
            date: {startDate: new Date().setDate(new Date().getDate() - 30), endDate: new Date()},
            options: {
                applyClass: 'btn-apply',
                locale: {
                    applyLabel: "Apply",
                    fromLabel: "From",
                    format: "YYYY-MM-DD",
                    toLabel: "To",
                    cancelLabel: 'Cancel',
                    customRangeLabel: 'Custom range'
                },
                ranges: {
                    'Yesterday': [moment().subtract(1, 'days'), moment()],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                eventHandlers: {
                    'apply.daterangepicker': onChangeDateRange
                }
            },
            dtOptions: DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10)
                    .withOption('bFilter', false)
                    .withOption('lengthChange', false)
                    .withBootstrap(),
            sentDtColumnDefs: [
                DTColumnDefBuilder.newColumnDef(8).notSortable()
            ],
            scheduledDtColumnDefs: [
                DTColumnDefBuilder.newColumnDef(5).notSortable()
            ],
            saveDtColumnDefs: [
                DTColumnDefBuilder.newColumnDef(2).notSortable()
            ],
            abSplitDtColumnDefs: [
                DTColumnDefBuilder.newColumnDef(7).notSortable(),
                DTColumnDefBuilder.newColumnDef(8).notSortable(),
                DTColumnDefBuilder.newColumnDef(9).notSortable()
            ],
            welcomeDtColumnDefs: [
                DTColumnDefBuilder.newColumnDef(5).notSortable()
            ],
            sentPushNotifications: [],
            scheduledPushNotifications: [],
            savedPushNotifications: [],
            abSplitNotifications: [],
            welcomeNotifications: [],
            downloadReport: downloadReport,
            openDeleteNotificationModal: openDeleteNotificationModal
        };
        $scope.allNotifications.date.endDate.setHours('23'),
                $scope.allNotifications.date.endDate.setMinutes('59'),
                $scope.allNotifications.date.endDate.setSeconds('59');
        /*
         * @author: sandeep
         * @created: 28 dec 2016
         * @params: dateRangeData(object)
         * @return: no
         * @purpose: Get sent and saved push notifications
         */
        function getListOfAllNotifications(dateRangeData) {
            AllNotificationsService.getSentPushNotifications(dateRangeData).then(function (response) {
                angular.forEach(response.data.data, function (v, k) {
                    v.ctr = v.views !== 0 ? ((v.clicks / v.views) * 100) : 0;
                    v.scheduled_at = new Date(v.scheduled_at);
                    $scope.allNotifications.sentPushNotifications.push(v);
                });
                AllNotificationsService.getSavedPushNotifications(dateRangeData).then(function (response) {
                    angular.forEach(response.data.data, function (v, k) {
                        if (v.active) {
                            $scope.allNotifications.savedPushNotifications.push(v);
                        }
                    });
                    AllNotificationsService.getWelcomeNotifications(dateRangeData).then(function (response) {
                        $scope.allNotifications.welcomeNotifications = response.data.data;
                        AllNotificationsService.getScheduledPushNotifications(dateRangeData).then(function (response) {
                            console.log(response);
                            $scope.allNotifications.scheduledPushNotifications = response.data.data;
                            $rootScope.engagetoApp.isPageLoading = false;
                        }, function (error) {
                            console.log(error);
                            var errorMessage = '';
                            if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                                AuthService.revokeAuth();
                                $rootScope.engagetoApp.isAuthenticatedUser = false;
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
                    }, function (error) {
                        console.log(error);
                        var errorMessage = '';
                        if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                            AuthService.revokeAuth();
                            $rootScope.engagetoApp.isAuthenticatedUser = false;
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
                }, function (error) {
                    console.log(error);
                    var errorMessage = '';
                    if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                        AuthService.revokeAuth();
                        $rootScope.engagetoApp.isAuthenticatedUser = false;
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
            }, function (error) {
                console.log(error);
                var errorMessage = '';
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
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

        var dateRangeData = {
            date: {
                from: $filter('date')(new Date($scope.allNotifications.date.startDate), 'yyyy-MM-dd'),
                to: $filter('date')(new Date($scope.allNotifications.date.endDate), 'yyyy-MM-dd HH:mm:ss')
            }
        };
        getListOfAllNotifications(dateRangeData);
        /*
         * @author: sandeep
         * @created: 28 dec 2016
         * @params: null
         * @return: success, error functions
         * @purpose: Get scheduled push notifications
         */
//        AllNotificationsService.getScheduledPushNotifications().then(function (response) {
//            console.log(response);
//            angular.forEach(response.data.data, function (v, k) {
//                $scope.allNotifications.scheduledPushNotifications.title = v.title;
//                $scope.allNotifications.scheduledPushNotifications.toBeDeliveredTo = v.toBeDeliveredTo;
//                $scope.allNotifications.scheduledPushNotifications.scheduledOn = v.scheduledOn;
//            });
//        }, function (error) {
//            console.log(error);
//        });

        /*
         * @author: sandeep
         * @created: 02 dec 2016
         * @params: type(string)
         * @returns: no
         * @purpose: download report function
         */
        function downloadReport(type) {
            var data = {
                get_report: type
            };
            AllNotificationsService.downloadReport(data, $scope.allNotifications.activeTab).then(function (response) {
                EngagetoAppService.showSuccessMessage(response.data.data.message);
                var filePath = response.data.data.file_path.replace('/notification-engageto', '');
                var link = document.createElement('a');
                link.href = filePath;
                link.target = "_blank";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
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
        }
        /*
         * @author: sandeep
         * @created: 02 dec 2016
         * @params: typeOfNotification(string)
         * @returns: no
         * @purpose: open delete notification modal
         */
        function openDeleteNotificationModal(typeOfNotification, id, index) {
            var openDeleteNotificationModalInstance = $uibModal.open({
                templateUrl: 'app/modules/all_notifications/views/modal/delete.notification.modal.html',
                windowClass: '',
                controller: 'DeleteNotificationModalController',
                size: 'md',
                resolve: {
                    typeOfNotification: function () {
                        return typeOfNotification;
                    },
                    notificationId: function () {
                        return id;
                    }
                }
            });

            openDeleteNotificationModalInstance.result.then(function (successResponse) {
                if (successResponse === 'sent')
                    $scope.allNotifications.sentPushNotifications.splice(index, 1);
                if (successResponse === 'saved')
                    $scope.allNotifications.savedPushNotifications.splice(index, 1);
                if (successResponse === 'welcome')
                    $scope.allNotifications.welcomeNotifications.splice(index, 1);
                if (successResponse === 'schedule')
                    $scope.allNotifications.scheduledPushNotifications.splice(index, 1);
            }, function (error) {
                console.log(error);
            });
        }
        /*
         * @author: sandeep
         * @created: 01 jun 2017
         * @params: event(object), picker(object)
         * @returns: no
         * @purpose: open delete notification modal
         */
        function onChangeDateRange(event, picker) {
            if (event) {
                var dateRangeData = {
                    date: {
                        from: event.model.startDate.format('YYYY-MM-DD'),
                        to: event.model.endDate.format('YYYY-MM-DD HH:mm:ss')
                    }
                };
                $scope.allNotifications.sentPushNotifications = [];
                $scope.allNotifications.savedPushNotifications = [];
                $scope.allNotifications.welcomeNotifications = [];
                $rootScope.engagetoApp.isPageLoading = true;
                getListOfAllNotifications(dateRangeData);
            }
        }
    }
})(window.angular);