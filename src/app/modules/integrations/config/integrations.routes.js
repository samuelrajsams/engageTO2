(function (angular) {
    'use strict';

    // Setting up route
    angular
            .module('integrations')
            .config(integrations);

    integrations.$inject = [
        '$stateProvider'
    ];

    function integrations(
            $stateProvider) {
        // API Credential Routing
        $stateProvider
                .state('settings-side-nav-template.integrations', {
                    url: '/app/integrations',
                    templateUrl: 'app/modules/integrations/views/integrations.html',
                    controller: 'IntegrationsController',
                    authenticate: true
                });
    }
})(window.angular);


