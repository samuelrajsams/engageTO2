(function (angular) {
    'use strict';
    angular
            .module('landing')
            .controller('ChangePasswordController', changePasswordController);
    changePasswordController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService',
        '$stateParams',
        '$state',
        '$uibModalInstance',
        'EngagetoAppService'
    ];
    function changePasswordController(
            $scope,
            $rootScope,
            AuthService,
            $stateParams,
            $state,
            $uibModalInstance,
            EngagetoAppService) {
        //initializing variables
        $scope.changePassword = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            isMatch: false,
            validPassword: true,
            enteringPassword: false,
            load: false
        };
        /*
         * @author : sandeep
         * @created : 22-10-2016
         * @params: confirm password field(string)
         * @return: no
         * @purpose: Watch confirm password field for checking password match
         */
        $scope.$watchGroup(['changePassword.confirmPassword', 'changePassword.newPassword'], function (newValue, oldValue) {
            if (newValue[0] == $scope.changePassword.newPassword || newValue[1] == $scope.changePassword.confirmPassword) {
                $scope.changePassword.isMatch = false;
            } else {
                $scope.changePassword.isMatch = true;
            }
        });
        /*
         * @author : sandeep
         * @created : 22-10-2016
         * @params: no
         * @return: no
         * @purpose: Change password
         */
        $scope.changePassword = function () {
            console.log("changingPassword");
            $rootScope.engagetoApp.isLoading = true;
            var data = {
                old_password: $scope.changePassword.oldPassword,
                password: $scope.changePassword.newPassword,
                confirm_password: $scope.changePassword.confirmPassword
            };
            AuthService.changePassword(data).then(function (response) {
                $rootScope.engagetoApp.isLoading = false;
                EngagetoAppService.showSuccessMessage(response.data.data.message);
                $uibModalInstance.close();
            }, function (error) {
                console.log(error);
                var errorMessage = '';
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
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
        };
        /*
         * @purpose: closing modal popup
         * @author: sandeep
         * @created: 26-09-2016
         */
        $scope.closeModal = function () {
            console.log('closeModal');
            $uibModalInstance.close('close');
        };
    }

})(window.angular);