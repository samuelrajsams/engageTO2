(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('HowItWorksController', howItWorksController);

    howItWorksController.$inject = [
        '$scope',
        '$document',
        '$location',
        '$rootScope',
        'AuthService'
    ];

    function howItWorksController(
            $scope,
            $document,
            $location,
            $rootScope,
            AuthService) {
        $rootScope.engagetoApp.isPageLoading = false;
        if ($location.hash() !== '') {
            var someElement = angular.element(document.getElementById($location.hash()));
            $document.scrollToElementAnimated(someElement);
        }
        console.log('How it works Controller');
    }
})(window.angular);