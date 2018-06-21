(function (angular) {

    'use strict';

    angular
            .module('smartAutomation')
            .controller('SmartAutomationCtrl', smartAutomationCtrl);

    smartAutomationCtrl.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'SmartAutomationService',
        'DTOptionsBuilder',
        'DTColumnDefBuilder'
    ];

    function smartAutomationCtrl(
            $scope,
            $rootScope,
            $uibModal,
            SmartAutomationService,
            DTOptionsBuilder,
            DTColumnDefBuilder) {
        console.log('SmartAutomationCtrl');
        //active class on smartAutomation
        $rootScope.engagetoApp.setting.active = 'smartAutomation';

        $scope.smartAutomation = {
            listOfRSSAutomation: [
                {
                    name: 'DMadept Blog 1',
                    url: 'https://dmadept.com/feed',
                    totalSentNotification: '30'
                },
                {
                    name: 'DMadept Blog 2',
                    url: 'https://dmadept.com/feed',
                    totalSentNotification: '10'
                },
                {
                    name: 'DMadept Blog 3',
                    url: 'https://dmadept.com/feed',
                    totalSentNotification: '20'
                }
            ],
            dtOptions: DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10)
                    .withOption('bFilter', false)
                    .withOption('lengthChange', false),
            dtColumnDefs: [
                DTColumnDefBuilder.newColumnDef(4).notSortable(),
                DTColumnDefBuilder.newColumnDef(5).notSortable()
            ],
            addRssFeedModal: addRssFeedModal,
            editRssFeedModal: editRssFeedModal,
            deleteRssFeedModal: deleteRssFeedModal
        };
        /*
         * @author: sandeep
         * @created: 09 dec 2016
         * @params: no
         * @return: no
         * @purpose: get segment values
         */
//        SmartAutomationService.getSegments().then(function (response) {
//            console.log(response);
//            $rootScope.engagetoApp.isPageLoading = false;
////      }, function (error) {
//            console.log(error);
//            $scope.smartAutomation.automation.load = false;
//        });
        /*
         * @author: sandeep
         * @created: 09 dec 2016
         * @params: no
         * @return: no
         * @purpose: add rss feed modal popup
         */
        function addRssFeedModal() {
//            $uibModalInstance.close('close');
            var addRssFeedModalInstance = $uibModal.open({
                templateUrl: 'app/modules/smartautomation/views/modal/add.rss.feed.modal.html',
                controller: 'AddRssFeedController',
                windowClass: 'add-rss-feed-modal'
            });

            addRssFeedModalInstance.result.then(function (successResponse) {
                console.log(successResponse);
            }, function (error) {
                console.log(error);
            });
        }
        /*
         * @author: sandeep
         * @created: 17 feb 2017
         * @params: index(number)
         * @return: no
         * @purpose: edit rss feed modal popup
         */
        function editRssFeedModal() {
            var editRssFeedModalInstance = $uibModal.open({
                templateUrl: 'app/modules/smartautomation/views/modal/add.rss.feed.modal.html',
                controller: 'EditRssFeedController',
                windowClass: 'add-rss-feed-modal',
                resolve: {
                    editView: function () {
                        return true;
                    }
                }
            });

            editRssFeedModalInstance.result.then(function (successResponse) {
                console.log(successResponse);
            }, function (error) {
                console.log(error);
            });
        }
        /*
         * @author: sandeep
         * @created: 09 dec 2016
         * @params: no
         * @return: no
         * @purpose: delete rss feed modal popup
         */
        function deleteRssFeedModal() {
//            $uibModalInstance.close('close');
            var deleteRssFeedModalInstance = $uibModal.open({
                templateUrl: 'app/modules/smartautomation/views/modal/delete.rss.feed.modal.html',
                controller: 'DeleteRssFeedController',
                windowClass: 'delete-rss-feed-modal'
            });

            deleteRssFeedModalInstance.result.then(function (successResponse) {
                console.log(successResponse);
            }, function (error) {
                console.log(error);
            });
        }
        $rootScope.engagetoApp.isPageLoading = false;
    }
})(window.angular);