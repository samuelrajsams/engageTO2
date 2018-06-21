(function (angular) {
    'use strict';
    angular
            .module('notification')
            .directive('welcomeSummaryValidator', welcomeSummaryValidatorDirective);
    welcomeSummaryValidatorDirective.$inject = [
        '$timeout'
    ];
    function welcomeSummaryValidatorDirective(
            $timeout) {
        return {
            restrict: 'A',
            link: welcomeSummaryValidatorLink
        };
        function welcomeSummaryValidatorLink(scope, iElement, iAttrs) {
            iElement.on('blur', function () {
                $timeout(function () {
                    if (iAttrs.id === 'notificationName') {
                        scope.welcomeNotification.summary.isNameBlured = true;
                        scope.welcomeNotification.summary.name === '' || !scope.welcomeNotification.summary.name ?
                                scope.welcomeNotification.summary.isNameRequired = true : scope.welcomeNotification.summary.isNameRequired = false;
                    }
                }, 1);
            });
            iElement.on('focus', function () {
                $timeout(function () {
                    if (iAttrs.id === 'notificationName') {
                        scope.welcomeNotification.summary.isNameBlured = false;
                        scope.welcomeNotification.summary.isNameRequired = false;
                    }
                }, 1);
            });
        }
    }
})(window.angular);