(function (angular) {
    'use strict';

// Setting up route
    angular
            .module('smartAutomation')
            .config(smartAutomationConfig);

    smartAutomationConfig.$inject = [
        '$stateProvider'
    ];

    function smartAutomationConfig(
            $stateProvider) {
        // Home state routing
        $stateProvider.
                state('side-nav-template.smart-automation', {
                    url: '/app/smart_automation',
                    templateUrl: 'app/modules/smartautomation/views/smart.automation.html',
                    controller: 'SmartAutomationCtrl',
                    authenticate: true,
                    domainTab: true
                }).
                state('side-nav-template.add-rss-feed', {
                    url: '/app/add_rss_feed',
                    templateUrl: 'app/modules/smartautomation/views/add.rss.feed.modal.html',
                    authenticate: true,
                    domainTab: true
                });
    }
})(window.angular);
