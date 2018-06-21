(function (angular) {

    'use strict';

    angular
            .module('teamManagement')
            .controller('AssignTeamManagementController', assignTeamManagementController);

    assignTeamManagementController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'team_management',
        'TeamManagementService',
        'AuthService',
        '$state',
        'teamMember'
    ];

    function assignTeamManagementController(
            $scope,
            $rootScope,
            $uibModalInstance,
            team_management,
            TeamManagementService,
            AuthService,
            $state,
            teamMember) {
        console.log('assignTeamManagementController');
        $scope.assignTeamManagement = {
            assignTeamManage: team_management.assign_team_management,
            cancel: cancel,
            assignDataToTeamMember: assignDataToTeamMember,
            teamMembersList: team_management.team_members_list,
            hideSuccessAlert: hideSuccessAlert,
            hideDangerAlert: hideDangerAlert
        };
        /*
         * @author: sandeep
         * @created: 29 nov 2016
         * @params: no
         * @return: no
         * @purpose: cancelled to exit assign team management
         */
        function cancel(){
            $uibModalInstance.dismiss('cancle');            
        }
        /*
         * @author: sandeep
         * @created: 01-12-2016
         * @params: no
         * @return: no
         * @purpose: Assign data and delete team member
         */
        function assignDataToTeamMember() {
            console.log("assignDataToTeamMember");
            $scope.assignTeamManagement.assignTeamManage.load = true;
            var selectedTeamMembers = {
                selectTeamMembers: $scope.assignTeamManagement.assignTeamManage.selectTeamMembers
            }
            TeamManagementService.addTeamMember(selectedTeamMembers).then(function (selectedTeamMembersResponse) {
                console.log(selectedTeamMembersResponse);
                $scope.assignTeamManagement.assignTeamManage.load = false;
                $scope.assignTeamManagement.assignTeamManage.successAlert = true;
                $scope.assignTeamManagement.assignTeamManage.dangerAlert = false;
                $scope.assignTeamManagement.assignTeamManage.success = selectedTeamMembersResponse.data.message;
            }, function (error) {
                console.log(error);
                $scope.assignTeamManagement.assignTeamManage.load = false;
                $scope.assignTeamManagement.assignTeamManage.successAlert = false;
                $scope.assignTeamManagement.assignTeamManage.dangerAlert = true;
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
                    $state.go('landing');
                } else if (error.code === 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                    angular.forEach(error.error.info, function (val, key) {
                        $scope.assignTeamManagement.assignTeamManage.danger = val;
                    });
                } else {
                    $scope.assignTeamManagement.assignTeamManage.danger = error.data.message;
                }
            });
        }
        /*
         * @author : sandeep
         * @created : 01-12-2016
         * @params: no
         * @return: no
         * @purpose: closing success alert
         */
        function hideSuccessAlert() {
            $scope.assignTeamManagement.assignTeamManage.successAlert = false;
        }
        /*
         * @author : sandeep
         * @created : 01-12-2016
         * @params: no
         * @return: no
         * @purpose: closing danger alert
         */
        function hideDangerAlert() {
            $scope.assignTeamManagement.assignTeamManage.dangerAlert = false;
        }
    }
})(window.angular);