(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('TermsnConditionController', termsnConditionController);

    termsnConditionController.$inject = [
        '$scope',
        '$document',
        '$location',
        '$rootScope',
        'TermsAndConditionConstant'
    ];

    function termsnConditionController(
            $scope,
            $document,
            $location,
            $rootScope,
            TermsAndConditionConstant) {
        $rootScope.engagetoApp.isPageLoading = false;
        if ($location.hash() !== '') {
            var someElement = angular.element(document.getElementById($location.hash()));
            $document.scrollToElementAnimated(someElement);
        }
        $scope.tac = {
            oneAtTime: true,
            terms: TermsAndConditionConstant
        };
    }
})(window.angular);