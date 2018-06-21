(function (angular) {
    'use strict';

// Setting up route
    angular
            .module('accountSettings')
            .config(accountSettingsConfig);

    accountSettingsConfig.$inject = [
        '$stateProvider'
    ];

    function accountSettingsConfig(
            $stateProvider) {
        // Home state routing
        $stateProvider.
                state('side-nav-template.account-settings', {
                    url: '/app/account-settings',
                    templateUrl: 'app/modules/account_settings/views/account.settings.html',
                    controller: 'AccountSettingsController',
                    authenticate: true
                });
    }
})(window.angular);
