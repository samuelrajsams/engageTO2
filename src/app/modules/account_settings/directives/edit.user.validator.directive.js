(function (angular) {

    'use strict';
    angular
            .module('accountSettings')
            .directive('editUserValidator', editUserValidatorDirective);
    editUserValidatorDirective.$inject = [
        '$timeout'
    ];
    function editUserValidatorDirective(
            $timeout) {
        var editUserValidatorDirective = {
            restrict: 'A',
            template: '',
            link: editUserValidatorLink
        };
        return editUserValidatorDirective;
        function editUserValidatorLink(scope, iElement, iAttrs) {
            //blur event on fields
            iElement.on('blur', function () {
                var urlRegex = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
                $timeout(function () {
                    if (iAttrs.id === 'firstName') {
                        scope.accountSettings.editDetails.firstName === '' || !scope.accountSettings.editDetails.firstName ? scope.accountSettings.editDetails.isFirstNameRequired = true : scope.accountSettings.editDetails.isFirstNameRequired = false;
                    }
                    if (iAttrs.id === 'lastName') {
                        scope.accountSettings.editDetails.lastName === '' || !scope.accountSettings.editDetails.lastName ? scope.accountSettings.editDetails.isLastNameRequired = true : scope.accountSettings.editDetails.isLastNameRequired = false;
                    }
                    if (iAttrs.id === 'emailAddress') {
                        scope.accountSettings.editDetails.emailAddress === '' || !scope.accountSettings.editDetails.emailAddress ? scope.accountSettings.editDetails.isEmailAddressRequired = true : scope.accountSettings.editDetails.isEmailAddressRequired = false;
                        if (scope.accountSettings.editDetails.emailAddress) {
                            var field = scope.accountSettings.editDetails.emailAddress;
                            scope.accountSettings.editDetails.isUrlValid = urlRegex.test(field);
                        }
                    }
                }, 1);
            });
            //focus event on fields
            iElement.on('focus', function () {
                $timeout(function () {
                    if (iAttrs.id === 'firstName') {
                        scope.accountSettings.editDetails.isFirstNameRequired = undefined;
                    }
                    if (iAttrs.id === 'lastName') {
                        scope.accountSettings.editDetails.isLastNameRequired = undefined;
                    }
                    if (iAttrs.id === 'emailAddress') {
                        scope.accountSettings.editDetails.isEmailAddressRequired = undefined;
                        scope.accountSettings.editDetails.isUrlValid = true;
                    }
                }, 1);
            });
        }
    }
})(window.angular);