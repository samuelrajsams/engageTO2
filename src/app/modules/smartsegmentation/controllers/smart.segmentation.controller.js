(function (angular) {

    'use strict';

    angular
            .module('smartSegmentation')
            .controller('SmartSegmentionController', smartSegmentionController);

    smartSegmentionController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'SmartSegmentationService',
        'DTOptionsBuilder',
        'DTColumnDefBuilder',
        'AuthService',
        '$state'
    ];

    function smartSegmentionController(
            $scope,
            $rootScope,
            $uibModal,
            SmartSegmentationService,
            DTOptionsBuilder,
            DTColumnDefBuilder,
            AuthService,
            $state) {
        //active class on smart-automation
        $rootScope.engagetoApp.setting.active = 'smartSegmentation';

        $scope.smartSegment = {
            segmentation: SmartSegmentationService.getSmartSegmentValues(),
            listOfSegments: [],
            dtOptions: DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10)
                    .withOption('bFilter', false)
                    .withOption('lengthChange', false),
            dtColumnDefs: [
                DTColumnDefBuilder.newColumnDef(4).notSortable()
            ],
            newSmartSegmentModal: newSmartSegmentModal,
            editSegment: editSegment,
            deleteSegment: deleteSegment
        };
        /*
         * @author: sandeep
         * @created: 05 dec 2016
         * @params: no
         * @return: no
         * @purpose: get segment values
         */
        SmartSegmentationService.getSegments().then(function (response) {
            $scope.smartSegment.listOfSegments = response.data.data;
            $rootScope.engagetoApp.isPageLoading = false;
        }, function (error) {
            console.log(error);
            if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                AuthService.revokeAuth();
                $rootScope.engagetoApp.isAuthenticatedUser = false;
                $state.go('landing');
            }
            $scope.smartSegment.segmentation.load = false;
        });
        /*
         * @author: sandeep
         * @created: 09 dec 2016
         * @params: no
         * @return: no
         * @purpose: new smart segment modal popup
         */
        function newSmartSegmentModal() {
            var newSmartSegmentModalInstance = $uibModal.open({
                templateUrl: 'app/modules/smartsegmentation/views/modal/new.smart.segment.modal.html',
                controller: 'NewSmartSegmentationModalController',
                windowClass: 'new-smart-segmentation-modal'
            });

            newSmartSegmentModalInstance.result.then(function (response) {
                $state.reload();
            }, function (error) {
                console.log(error);
            });
        }
        /*
         * @author: sandeep
         * @created: 16 jan 2017
         * @params: segmentId(number)
         * @return: no
         * @purpose: edit smart segment modal popup
         */
        function editSegment(segmentId) {
            var editSmartSegmentModalInstance = $uibModal.open({
                templateUrl: 'app/modules/smartsegmentation/views/modal/new.smart.segment.modal.html',
                controller: 'EditSmartSegmentationModalController',
                windowClass: 'new-smart-segmentation-modal',
                resolve: {
                    SegmentId: function () {
                        return segmentId;
                    }
                }
            });

            editSmartSegmentModalInstance.result.then(function (response) {
                $state.reload();
            }, function (error) {
                console.log(error);
            });
        }
        /*
         * @author: sandeep
         * @created: 16 jan 2017
         * @params: index(number), segmentId(number)
         * @return: no
         * @purpose: delete smart segment
         */
        function deleteSegment(index, segmentId) {
            var editSmartSegmentModalInstance = $uibModal.open({
                templateUrl: 'app/modules/smartsegmentation/views/modal/delete.smart.segment.modal.html',
                controller: 'DeleteSmartSegmentationModalController',
//                windowClass: 'new-smart-segmentation-modal',
                size: 'md',
                resolve: {
                    SegmentId: function () {
                        return segmentId;
                    }
                }
            });

            editSmartSegmentModalInstance.result.then(function (response) {
                $scope.smartSegment.listOfSegments.splice(index, 1);
            }, function (error) {
                console.log(error);
            });
        }
    }
})(window.angular);