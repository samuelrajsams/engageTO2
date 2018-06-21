(function (angular) {

    'use strict';

    angular
            .module('teamManagement')
            .controller('DeleteNonassignManagementController', deleteNonassignTeamManagementController);

    deleteNonassignTeamManagementController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'teamMember',
        'TeamManagementService',
        '$localStorage',
        'AuthService',
        '$state',
        'EngagetoAppService',
        '$timeout'
    ];

    function deleteNonassignTeamManagementController(
            $scope,
            $rootScope,
            $uibModalInstance,
            teamMember,
            TeamManagementService,
            $localStorage,
            AuthService,
            $state,
            EngagetoAppService,
            $timeout) {
        $scope.deleteNonassignTeamManagement = {
            cancel: cancel,
            confirm: confirm
        };
        /*
         * @author: sandeep
         * @created: 29 nov 2016
         * @params: no
         * @return: no
         * @purpose: cancelled to exit delete without assign team management
         */
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
        /*
         * @author: sandeep
         * @created: 28 dec 2016
         * @params: no
         * @return: no
         * @purpose: confirm and exit delete without assign team management
         */
        function confirm() {
            TeamManagementService.deleteTeamMember(teamMember).then(function (response) {
                console.log(response);
                EngagetoAppService.showSuccessMessage(response.data.data.message);
                $timeout(function () {
                    $uibModalInstance.close();
                }, 500);
            }, function (error) {
                console.log(error);
                var errorMessage = '';
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
                    $uibModalInstance.dismiss('close');
                    $state.go('landing');
                } else if (error.code == 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
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