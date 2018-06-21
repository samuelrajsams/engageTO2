(function (angular) {

    'use strict';

    // Setting up route
    angular
            .module('summary')
            .config(summaryConfig);

    summaryConfig.$inject = [
        '$stateProvider'
    ];

    function summaryConfig(
            $stateProvider) {
        // Summary state routing
        $stateProvider.
                state('side-nav-template.summary', {
                    url: '/app/summary',
                    templateUrl: 'app/modules/summary/views/summary.html',
                    controller: 'SummaryController',
                    authenticate: true,
                    domainTab: true
                });
    }
})(window.angular);
