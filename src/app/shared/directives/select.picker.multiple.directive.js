(function (angular) {
    'use strict';
    angular
            .module('notification')
            .directive('selectPickerMultiple', selectPickerMultipleDirective);

    selectPickerMultipleDirective.$inject = [
        'NotificationService',
        '$rootScope',
        '$timeout'
    ];
    function selectPickerMultipleDirective(
            NotificationService,
            $rootScope,
            $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'app/shared/navigation/select.picker.multiple.view.html',
            link: selectPickerMultipleLink
        };
        function selectPickerMultipleLink(scope, iElement, iAttrs) {
            if (iAttrs.type === 'welcomeSegment') {
                $rootScope.engagetoApp.selectPickerDiv = 'welcomeSegment';
                NotificationService.getSegmentList('Welcome').then(function (response) {
                    scope.welcomeNotification.summary.segmentList = response;
                    $timeout(function () {
//                        var multiplePicker = $('#welcome-segment-select').picker({search: true});
//                        multiplePicker.on('sp-change', function (types, selector, data) {
//                            scope.welcomeNotification.summary.segment = multiplePicker.val();
//                        });
                        $('#welcome-segment-select').selectpicker({
                            style: 'btn-default',
                            liveSearch: true
                        });
                        $('#welcome-segment-select').on('changed.bs.select', function (event, index, newValue, oldValue) {
                            scope.welcomeNotification.summary.segment = $('#welcome-segment-select').selectpicker('val');
                        });
                    }, 2);
                }, function (error) {
                    console.log(error);
                });
            }
        }
    }
})(window.angular);