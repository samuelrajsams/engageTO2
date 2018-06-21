(function (angular, ApplicationConfiguration) {

    'use strict';

    // Setting Configuration for routing and other plugins
    angular
            .module(ApplicationConfiguration.applicationModuleName)
            .config(applicationConfig);

    applicationConfig.$inject = [
        'toastrConfig'
    ];

    function applicationConfig(
            toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: true,
            timeOut: 7000,
            target: 'body'
        });
    }
})(window.angular, window.ApplicationConfiguration);