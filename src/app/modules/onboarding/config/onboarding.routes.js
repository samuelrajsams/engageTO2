(function (angular) {
    'use strict';

// Setting up route
    angular
            .module('onboarding')
            .config(onboardingConfig);

    onboardingConfig.$inject = [
        '$stateProvider'
    ];

    function onboardingConfig(
            $stateProvider) {
        // onboarding state routing
        $stateProvider.
                state('getting-started', {
                    url: '/app/getting-started/:newLogin/:subDomain/:domainAddress/:isDomainValid',
                    templateUrl: 'app/modules/onboarding/views/onboarding.html',
                    controller: 'OnboardingController',
                    authenticate: true
                });
    }
})(window.angular);
