(function (angular) {

    'use strict';

    angular
            .module('teamManagement')
            .controller('DeleteTeamManagementController', deleteTeamManagementController);

    deleteTeamManagementController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'fullName'
    ];

    function deleteTeamManagementController(
            $scope,
            $rootScope,
            $uibModalInstance,
            fullName) {
        console.log('deleteTeamManagementController');
        $scope.deleteTeamManagement = {
            fullName: fullName,
            cancel: cancel,
            assignData: assignData,
            deleteWithoutAssign: deleteWithoutAssign
        };
        /*
         * @author: sandeep
         * @created: 29 nov 2016
         * @params: no
         * @return: no
         * @purpose: cancelled to exit delete team management
         */
        function cancel(){
            $uibModalInstance.close('cancel');            
        }
        /*
         * @author: sandeep
         * @created: 29 nov 2016
         * @params: no
         * @return: no
         * @purpose: cancelled to exit delete team management
         */
        function assignData(){
            $uibModalInstance.close('assignData');            
        }
        /*
         * @author: sandeep
         * @created: 29 nov 2016
         * @params: no
         * @return: no
         * @purpose: cancelled to exit delete team management
         */
        function deleteWithoutAssign(){
            $uibModalInstance.close('deleteWithoutAssign');            
        }
    }
})(window.angular);