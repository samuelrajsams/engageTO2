(function (angular, ApplicationConfiguration) {

    'use strict';

    //Start by defining the main module and adding the module dependencies
    angular
            .module(ApplicationConfiguration.applicationModuleName, 
                ApplicationConfiguration.applicationModuleVendorDependencies);
})(window.angular, window.ApplicationConfiguration);
