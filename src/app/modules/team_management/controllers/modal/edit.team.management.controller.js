(function (angular) {

    'use strict';

    angular
            .module('teamManagement')
            .controller('EditTeamManagementController', editTeamManagementController);

    editTeamManagementController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'team_management',
        'TeamManagementService',
        'TeamMemberDetailsService',
        'AuthService',
        '$state',
        'roleList',
        'websiteList',
        'teamMember',
        'EngagetoAppService',
        '$timeout'
    ];

    function editTeamManagementController(
            $scope,
            $rootScope,
            $uibModalInstance,
            team_management,
            TeamManagementService,
            TeamMemberDetailsService,
            AuthService,
            $state,
            roleList,
            websiteList,
            teamMember,
            EngagetoAppService,
            $timeout) {
        $scope.addTeamManagement = {
            addOrEditTeamMember: TeamMemberDetailsService.getAddTeamMemberValues(),
            teamRolesList: roleList,
            websitesList: websiteList,
            isEdit: true,
            cancel: cancel,
            saveTeamMember: saveTeamMember
        };
        var relationId = '';
        TeamManagementService.getTeamMemberById(teamMember.id, teamMember.domainId).then(function (response) {
            console.log(response);
            relationId = response.data.data.relation_id;
            $scope.addTeamManagement.addOrEditTeamMember.emailAddress = teamMember.email;
            $scope.addTeamManagement.addOrEditTeamMember.selectRole = response.data.data._role_id;
            $scope.addTeamManagement.addOrEditTeamMember.websites = response.data.data.domain_referer + '';
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
        /*
         * @author: sandeep
         * @created: 29 nov 2016
         * @params: no
         * @return: no
         * @purpose: cancelled to exit edit team management
         */
        function cancel() {
            $uibModalInstance.dismiss('cancle');
        }
        /*
         * @author: sandeep
         * @created: 01-12-2016
         * @params: no
         * @return: no
         * @purpose: Edit team member
         * @modified: 08 may 2017
         * @modified by: sandeep(kept team relation id with user)
         */
        function saveTeamMember() {
            $rootScope.engagetoApp.isLoading = true;
            var teamMemberDetails = {
                relation_id: relationId,
                role_id: $scope.addTeamManagement.addOrEditTeamMember.selectRole
            };
            TeamManagementService.updateTeamMember(teamMemberDetails, teamMember.id).then(function (updateTeamMemberResponse) {
                $rootScope.engagetoApp.isLoading = false;
                EngagetoAppService.showSuccessMessage(updateTeamMemberResponse.data.data.message);
                $timeout(function () {
                    $uibModalInstance.close();
                }, 500);
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