(function (angular) {
    'use strict';
    angular
            .module('smartSegmentation')
            .directive('subscriberDatepicker', subscriberDatepickerDirective);

    subscriberDatepickerDirective.$inject = [
        '$timeout'
    ];

    function subscriberDatepickerDirective(
            $timeout) {
        return {
            restrict: 'E',
            scope: {
                index: '=',
                criterias: '='
            },
            template: '<input type="text" id="subscriberDate" name="subscriberDate" class="form-control subscriberDate" placeholder="Select date" ng-blur="newSmartSegment.getSubscriberListCount(\'date\', index)"/>',
            link: subscriberDatepickerLink
        };
        function subscriberDatepickerLink(scope, element, attr) {
            //initializing datepicker for subscriber
            $('.subscriberDate').datetimepicker({
                value: scope.criterias[scope.index].subscriberDate || null,
                onSelectDate: function (dateText) {
                    $timeout(function () {
                        scope.criterias[scope.index].subscriberDate = dateText;
                    }, 1);
                },
                timepicker: false
            });
        }
    }
})(window.angular);