(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('FAQController', faqController);

    faqController.$inject = [
        '$scope',
        '$rootScope',
        'Frequently_Asked_Questiones'
    ];

    function faqController(
            $scope,
            $rootScope,
            Frequently_Asked_Questiones) {
        //initializing faq variables
        $scope.faq = {
            oneAtTime: true,
            queries: Frequently_Asked_Questiones
        };
        $rootScope.engagetoApp.isPageLoading = false;
    }
})(window.angular);