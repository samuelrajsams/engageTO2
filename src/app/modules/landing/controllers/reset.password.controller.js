(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('ReSetPasswordController', reSetPasswordController);

    reSetPasswordController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService',
        'EngagetoAppService',
        'toastr'
    ];

    function reSetPasswordController(
            $scope,
            $rootScope,
            AuthService,
            EngagetoAppService,
            toastr) {
        $rootScope.engagetoApp.isPageLoading = false;
        //initializing variables
        $scope.resetPassword = {
            email: '',
            successAlert: false,
            dangerAlert: false,
            success: '',
            danger: '',
            showRequestDiv: false,
            load: false
        };

        /*
         * @author : sandeep
         * @created : 25-10-2016
         * @params: no
         * @return: no
         * @purpose: reuesting for reset password link
         */
        $scope.resendResetPasswordLink = function () {
            $rootScope.engagetoApp.isLoading = true;
            var data = {
                user_email: $scope.resetPassword.email
            };
            AuthService.isEmailActivated(data.user_email).then(function (response) {
                var isActivated = response.data.data.account_activated;
                if (!isActivated) {
                    toastr.error('<span>Your account is not activated, <a href="#/app/resend-activation">click here</a> to request new link</span>', {
                        allowHtml: true,
                        timeOut: 0
                    });
                    $rootScope.engagetoApp.isLoading = false;
                } else {
                    AuthService.sendPwdResetLink(data).then(function (response) {
                        $scope.resetPasswordModalForm.$setPristine();
                        $scope.resetPasswordModalForm.$setUntouched();
                        $scope.resetPassword.email = '';
                        EngagetoAppService.showSuccessMessage('Please check your inbox, we have sent you the reset password instructions.');
                        $rootScope.engagetoApp.isLoading = false;
                    }, function (error) {
                        console.log(error);
                        var errorMessage = '';
                        if (error.code === 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                            angular.forEach(error.error.info, function (val, key) {
                                errorMessage = val;
                            });
                        } else {
                            errorMessage = error.data.message;
                        }
                        EngagetoAppService.showErrorMessage(errorMessage);
                        $rootScope.engagetoApp.isLoading = false;
                    });
                }
            }, function (error) {
                var errorMessage = '';
                if (error.code == 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                    angular.forEach(error.error.info, function (val, key) {
                        errorMessage = val;
                    });
                } else {
                    errorMessage = error.data.message;
                }
                EngagetoAppService.showErrorMessage(errorMessage);
                $rootScope.engagetoApp.isLoading = false;
            });
        };
        /*
         * @purpose: re-send activation link
         * @author: sandeep
         * @created: 08-09-2016
         */
        $scope.reSendActivationLink = function () {
            $scope.resetPassword.load = true;
            var data = {
                user_email: $scope.resetPassword.email
            };
            AuthService.reSendActivationLink(data).then(function (response) {
                $scope.resetPassword.load = false;
                $scope.resetPassword.showRequestDiv = false;
                EngagetoAppService.showSuccessMessage('Please check your inbox, we have sent you the set password instructions.');
            }, function (error) {
                console.log(error);
                var errorMessage = '';
                $scope.resetPassword.load = false;
                if (error.code == 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                    angular.forEach(error.error.info, function (val, key) {
                        errorMessage = val;
                    });
                } else {
                    errorMessage = error.data.message;
                }
                EngagetoAppService.showErrorMessage(errorMessage);
            });
        };
    }
})(window.angular);