(function (angular) {

    'use strict';
    angular
            .module('teamManagement')
            .directive('addTeamMemberValidator', addTeamMemberValidatorDirective);
    addTeamMemberValidatorDirective.$inject = [
        '$timeout'
    ];
    function addTeamMemberValidatorDirective(
            $timeout) {
        console.log("addTeamMemberValidatorDirective");
        var addTeamMemberValidatorDirective = {
            restrict: 'A',
            template: '',
            link: addTeamMemberValidatorLink
        };
        return addTeamMemberValidatorDirective;
        function addTeamMemberValidatorLink(scope, iElement, iAttrs) {
            //blur event on fields
            iElement.on('blur', function () {
                var urlRegex = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
                $timeout(function () {
                    if (iAttrs.id === 'firstName') {
                        scope.addTeamManagement.addOrEditTeamMember.firstName === '' || !scope.addTeamManagement.addOrEditTeamMember.firstName ? scope.addTeamManagement.addOrEditTeamMember.isFirstNameRequired = true : scope.addTeamManagement.addOrEditTeamMember.isFirstNameRequired = false;
                    }
                    if (iAttrs.id === 'lastName') {
                        scope.addTeamManagement.addOrEditTeamMember.lastName === '' || !scope.addTeamManagement.addOrEditTeamMember.lastName ? scope.addTeamManagement.addOrEditTeamMember.isLastNameRequired = true : scope.addTeamManagement.addOrEditTeamMember.isLastNameRequired = false;
                    }
                    if (iAttrs.id === 'emailAddress') {
                        scope.addTeamManagement.addOrEditTeamMember.emailAddress === '' || !scope.addTeamManagement.addOrEditTeamMember.emailAddress ? scope.addTeamManagement.addOrEditTeamMember.isEmailAddressRequired = true : scope.addTeamManagement.addOrEditTeamMember.isEmailAddressRequired = false;
                        if (scope.addTeamManagement.addOrEditTeamMember.emailAddress) {
                            var field = scope.addTeamManagement.addOrEditTeamMember.emailAddress;
                            scope.addTeamManagement.addOrEditTeamMember.isUrlValid = !urlRegex.test(field);
                        }
                    }
                    if (iAttrs.id === 'selectRole') {
                        scope.addTeamManagement.addOrEditTeamMember.selectRole === '' || !scope.addTeamManagement.addOrEditTeamMember.selectRole ? scope.addTeamManagement.addOrEditTeamMember.isSelectRoleRequired = true : scope.addTeamManagement.addOrEditTeamMember.isSelectRoleRequired = false;
                    }
                    if (iAttrs.id === 'websites') {
                        scope.addTeamManagement.addOrEditTeamMember.websites === '' || !scope.addTeamManagement.addOrEditTeamMember.websites ? scope.addTeamManagement.addOrEditTeamMember.isWebsitesRequired = true : scope.addTeamManagement.addOrEditTeamMember.isWebsitesRequired = false;
                    }
                    if (iAttrs.id === 'selectTeamMembers') {
                        scope.assignTeamManagement.assignTeamManage.selectTeamMembers === '' || !scope.assignTeamManagement.assignTeamManage.selectTeamMembers ? scope.assignTeamManagement.assignTeamManage.isSelectTeamMembersRequired = true : scope.assignTeamManagement.assignTeamManage.isSelectTeamMembersRequired = false;
                    }
                }, 1);
            });
            //focus event on fields
            iElement.on('focus', function () {
                $timeout(function () {
                    if (iAttrs.id === 'firstName') {
                        scope.addTeamManagement.addOrEditTeamMember.isFirstNameRequired = undefined;
                    }
                    if (iAttrs.id === 'lastName') {
                        scope.addTeamManagement.addOrEditTeamMember.isLastNameRequired = undefined;
                    }
                    if (iAttrs.id === 'emailAddress') {
                        scope.addTeamManagement.addOrEditTeamMember.isEmailAddressRequired = undefined;
                        scope.addTeamManagement.addOrEditTeamMember.isUrlValid = undefined;
                    }
                    if (iAttrs.id === 'selectRole') {
                        scope.addTeamManagement.addOrEditTeamMember.isSelectRoleRequired = undefined;
                    }
                    if (iAttrs.id === 'websites') {
                        scope.addTeamManagement.addOrEditTeamMember.isWebsitesRequired = undefined;
                    }
                    if (iAttrs.id === 'selectTeamMembers') {
                        scope.assignTeamManagement.assignTeamManage.isSelectTeamMembersRequired = undefined;
                    }
                }, 1);
            });
        }
    }
})(window.angular);