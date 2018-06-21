(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('BlogController', blogController);

    blogController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService',
        '$state',
        '$q',
        '$document'
    ];

    function blogController(
            $scope,
            $rootScope,
            AuthService,
            $state,
            $q,
            $document) {
        //initializing partners variables
        $scope.blog = {
        };
    }
})(window.angular);