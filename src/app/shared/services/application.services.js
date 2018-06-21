(function (angular, ApplicationConfiguration) {

    'use strict';

    // common service for all modules
    angular
            .module(ApplicationConfiguration.applicationModuleName)
            .service('EngagetoAppService', engagetoAppService);

    engagetoAppService.$inject = [
        'toastr'
    ];

    function engagetoAppService(
            toastr) {
        this.showSuccessMessage = function (successMessage) {
            toastr.success(successMessage,{
                closeButton: true
            });
        };
        this.showErrorMessage = function (errorMessage) {
            toastr.error(errorMessage,{
                closeButton: true
            });
        };
    }
})(window.angular, window.ApplicationConfiguration);