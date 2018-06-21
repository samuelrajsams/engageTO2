(function (angular) {

    'use strict';

    angular
            .module('allNotifications')
            .controller('DownloadReportController', downloadReportController);

    downloadReportController.$inject = [
        '$scope'
       
    ];

    function downloadReportController(
            $scope
            ) {
       console.log('we are COOL')
    }
})(window.angular);