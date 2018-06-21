(function (angular) {

    'use strict';
    angular
            .module('summary')
            .controller('SummaryController', summaryController);
    summaryController.$inject = [
        '$scope',
        '$rootScope'
    ];
    function summaryController(
            $scope,
            $rootScope) {
        console.log('SummaryController');
        //active class on summary
        $rootScope.engagetoApp.setting.active = 'summary';
        $rootScope.engagetoApp.isPageLoading = false;
        //initializing summary variables
        $scope.summary = {
            date: {startDate: new Date(), endDate: new Date().setDate(new Date().getDate() + 30)},
            options: {
                applyClass: 'btn-green',
                locale: {
                    applyLabel: "Apply",
                    fromLabel: "From",
                    format: "YYYY-MM-DD", //will give you 2017-01-06
                    //format: "D-MMM-YY", //will give you 6-Jan-17
                    //format: "D-MMMM-YY", //will give you 6-January-17
                    toLabel: "To",
                    cancelLabel: 'Cancel',
                    customRangeLabel: 'Custom range'
                },
                ranges: {
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()]
                }
            },
            successMsg: false,
            hideSuccessAlert: hideSuccessAlert
        };
        /*
         * @author: sandeep
         * @params: no
         * @return: no
         * @created: 08 nov 2016
         * @purpose: hiding success msg
         */
        function hideSuccessAlert() {
            $scope.summary.successMsg = false;
        }
    }
})(window.angular);