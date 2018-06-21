(function (angular) {
    'use strict';

    angular
            .module('settings')
            .component('goPreviousPage', {
                template: '<a href class="pull-left" ng-click="goBackPage()"><i class="fa fa-angle-left"> </i>back</a>',
                controller: goPreviousPageController
            });

    goPreviousPageController.$inject = [
        '$scope',
        '$window'
    ];

    function goPreviousPageController(
            $scope,
            $window) {
        $scope.goBackPage = function () {
            $window.history.back();
        };
    }
})(window.angular);