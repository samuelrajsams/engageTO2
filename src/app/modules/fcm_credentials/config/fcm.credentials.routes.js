(function (angular) {
    'use strict';

    // Setting up route
    angular
            .module('fcm.credentials')
            .config(fcmCredentialsConfig);

    fcmCredentialsConfig.$inject = [
        '$stateProvider'
    ];

    function fcmCredentialsConfig(
            $stateProvider) {
        // API Credential Routing
        $stateProvider
                .state('side-nav-template.fcm-credentials', {
                    url: '/app/fcm-credentials',
                    templateUrl: 'app/modules/fcm_credentials/views/fcm.credentials.html',
                    controller: 'FcmCredentialsController',
                    authenticate: true
                });
    }
})(window.angular);


