(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('PartnersController', partnersController);

    partnersController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService',
        '$state',
        '$q',
        '$document'
    ];

    function partnersController(
            $scope,
            $rootScope,
            AuthService,
            $state,
            $q,
            $document) {
        //initializing partners variables
        $scope.partners = {
        };
    }
})(window.angular);