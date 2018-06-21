(function (angular) {
    'use strict';

// Setting up route
    angular
            .module('settings')
            .config(settingsConfig);

    settingsConfig.$inject = [
        '$stateProvider'
    ];

    function settingsConfig(
            $stateProvider) {
        // Home state routing
        $stateProvider.
                state('side-nav-template.settings', {
                    url: '/app/settings',
                    templateUrl: 'app/modules/settings/views/settings.html',
                    controller: 'SettingsController',
                    authenticate: true,
                    domainTab: true
                }).
                state('optins', {
                    url: '/app/optins',
                    templateUrl: 'app/modules/settings/views/optins.html',
                    controller: 'OptinsController',
                    authenticate: true,
                    domainTab: true
                }).
                state('side-nav-template.sub-optins', {
                    url: '/app/sub-optins',
                    templateUrl: 'app/modules/settings/views/sub-optins.html',
                    controller: 'SubOptinsController',
                    authenticate: true,
                    domainTab: true
                }).
                state('side-nav-template.child-window', {
                    url: '/app/child-window',
                    templateUrl: 'app/modules/settings/views/child-window.html',
                    controller: 'ChildWindowController',
                    authenticate: true,
                    domainTab: true
                }).
                state('side-nav-template.get-api-key', {
                    url: '/app/get-api-key',
                    templateUrl: 'app/modules/settings/views/get-api-key.html',
                    controller: 'GetAPIKeyController',
                    authenticate: true,
                    domainTab: true
                });
    }
})(window.angular);
