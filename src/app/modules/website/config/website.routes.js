(function (angular) {

    'use strict';

    // Setting up route
    angular
            .module('website')
            .config(websiteConfig);

    websiteConfig.$inject = [
        '$stateProvider'
    ];

    function websiteConfig(
            $stateProvider) {
        // Notification state routing
        $stateProvider.
                state('side-nav-template.domain-management', {
                    url: '/app/domain-management?id&state',
                    templateUrl: 'app/modules/website/views/domain.management.html',
                    controller: 'DomainManagementController',
                    authenticate: true
                });
    }
})(window.angular);
