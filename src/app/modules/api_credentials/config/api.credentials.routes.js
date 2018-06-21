(function (angular) {
    'use strict';

    // Setting up route
    angular
            .module('api.credentials')
            .config(apiCredentialsConfig);

    apiCredentialsConfig.$inject = [
        '$stateProvider'
    ];

    function apiCredentialsConfig(
            $stateProvider) {
        // API Credential Routing
        $stateProvider
                .state('settings-side-nav-template.api-credentials', {
                    url: '/app/api-credentials',
                    templateUrl: 'app/modules/api_credentials/views/api.credentials.html',
                    controller: 'ApiCredentialsController',
                    authenticate: true
                });
    }
})(window.angular);


