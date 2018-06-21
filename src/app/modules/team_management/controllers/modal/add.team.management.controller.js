(function (angular) {

    'use strict';

    angular
            .module('teamManagement')
            .controller('AddTeamManagementController', addTeamManagementController);

    addTeamManagementController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'TeamManagementService',
        'TeamMemberDetailsService',
        'AuthService',
        '$state',
        'addView',
        '$localStorage',
        'roleList',
        'websiteList',
        'EngagetoAppService',
        '$timeout'
    ];

    function addTeamManagementController(
            $scope,
            $rootScope,
            $uibModalInstance,
            TeamManagementService,
            TeamMemberDetailsService,
            AuthService,
            $state,
            addView,
            $localStorage,
            roleList,
            websiteList,
            EngagetoAppService,
            $timeout) {
        $scope.addTeamManagement = {
            addOrEditTeamMember: TeamMemberDetailsService.getAddTeamMemberValues(),
            teamRolesList: roleList.slice(1),
            websitesList: websiteList,
            cancel: cancel,
            saveTeamMember: saveTeamMember,
            addView: addView
        };
        /*
         * @author: sandeep
         * @created: 29 nov 2016
         * @params: no
         * @return: no
         * @purpose: cancelled to exit add team management
         */
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
        /*
         * @author: sandeep
         * @created: 01-12-2016
         * @params: no
         * @return: no
         * @purpose: Add team member
         */
        function saveTeamMember() {
            $rootScope.engagetoApp.isLoading = true;
            var teamMemberDetails = {
                user_email: $scope.addTeamManagement.addOrEditTeamMember.emailAddress,
                role_id: $scope.addTeamManagement.addOrEditTeamMember.selectRole,
                domain_referer: $scope.addTeamManagement.addOrEditTeamMember.websites
            };
            TeamManagementService.addTeamMember(teamMemberDetails).then(function (addTeamMemberResponse) {
                console.log(addTeamMemberResponse);
                $rootScope.engagetoApp.isLoading = false;
                EngagetoAppService.showSuccessMessage(addTeamMemberResponse.data.data.message);
                $timeout(function () {
                    $uibModalInstance.close();
                }, 1000);
            }, function (error) {
                console.log(error);
                var errorMessage = '';
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
                    $uibModalInstance.dismiss('error');
                    $state.go('landing');
                } else if (error.code === 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                    angular.forEach(error.error.info, function (val, key) {
                        errorMessage = val;
                    });
                } else {
                    errorMessage = error.data.message;
                }
                $rootScope.engagetoApp.isLoading = false;
                EngagetoAppService.showErrorMessage(errorMessage);
            });
        }
    }
})(window.angular);