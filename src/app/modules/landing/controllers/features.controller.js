(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('FeaturesController', featuresController);

    featuresController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService'
    ];

    function featuresController(
            $scope,
            $rootScope,
            AuthService) {
        $rootScope.engagetoApp.isPageLoading = false;
        //initializing variables
        console.log('Features Controller');
    }
})(window.angular);