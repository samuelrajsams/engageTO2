(function (angular) {
    'use strict';
    angular
            .module('landing')
            .controller('ReSettingPasswordController', reSettingPasswordController);
    reSettingPasswordController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService',
        '$stateParams',
        '$timeout',
        'EngagetoAppService',
        '$state'
    ];
    function reSettingPasswordController(
            $scope,
            $rootScope,
            AuthService,
            $stateParams,
            $timeout,
            EngagetoAppService,
            $state) {
        //initializing variables
        $scope.resetPassword = {
            password: '',
            confirmPassword: '',
            isMatch: false,
            successAlert: false,
            dangerAlert: false,
            success: '',
            danger: '',
            hideForm: true,
            showResetDiv: false,
            showLogin: false,
            validPassword: true,
            enteringPassword: false
        };
        var linkData = {
            token1: $stateParams.token1,
            hash: $stateParams.hash,
            user_email: $stateParams.email
        };
        AuthService.isEmailActivated($stateParams.email).then(function (responseActivated) {
            if (responseActivated.data.data.account_activated) {
                AuthService.isLinkExpired(linkData).then(function (response) {
                    $rootScope.engagetoApp.isPageLoading = false;
                    $scope.resetPassword.hideForm = false;
                    $scope.resetPassword.showResetDiv = false;
                }, function (error) {
                    console.log(error);
                    $scope.resetPassword.hideForm = true;
                    $scope.resetPassword.showResetDiv = true;
                    var errorMessage = '';
                    if (error.code == 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                        angular.forEach(error.error.info, function (val, key) {
                            errorMessage = val;
                        });
                    } else if (error.code == 10503) {
                        //10503 - No set password request found
                        $rootScope.engagetoApp.isPageLoading = false;
                        $state.go('forgotPasswordRequest');
                        $timeout(function () {
                            EngagetoAppService.showErrorMessage(error.data.message);
                        }, 1000);
                    } else if (error.code == 10502) {
                        //10502 - No user found
                        $rootScope.engagetoApp.isPageLoading = false;
                        $state.go('register');
                        $timeout(function () {
                            EngagetoAppService.showErrorMessage(error.data.message);
                        }, 1000);
                    } else if (error.code == 10505) {
                        //10505 - The password link was corrupted
                        $rootScope.engagetoApp.isPageLoading = false;
                        $state.go('forgotPasswordRequest');
                        $timeout(function () {
                            EngagetoAppService.showErrorMessage(error.data.message);
                        }, 1000);
                    } else {
                        errorMessage = error.data.message;
                    }
                    $rootScope.engagetoApp.isPageLoading = false;
                    EngagetoAppService.showErrorMessage(errorMessage);
                });
            } else {
                $rootScope.engagetoApp.isPageLoading = false;
                $scope.setPassword.hideForm = true;
                $scope.setPassword.showRequestDiv = true;
            }
        }, function (error) {
            console.log(error);
            var errorMessage = '';
            if (error.code == 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                angular.forEach(error.error.info, function (val, key) {
                    errorMessage = val;
                });
            } else if (error.code == 10503) {
                //10503 - No set password request found
                $rootScope.engagetoApp.isPageLoading = false;
                $state.go('forgotPasswordRequest');
                $timeout(function () {
                    EngagetoAppService.showErrorMessage(error.data.message);
                }, 1000);
            } else if (error.code == 10502) {
                //10502 - No user found
                $rootScope.engagetoApp.isPageLoading = false;
                $state.go('register');
                $timeout(function () {
                    EngagetoAppService.showErrorMessage(error.data.message);
                }, 1000);
            } else {
                errorMessage = error.data.message;
            }
            $rootScope.engagetoApp.isPageLoading = false;
            EngagetoAppService.showErrorMessage(errorMessage);
        });
        /*
         * @author : sandeep
         * @created : 19-10-2016
         * @params: confirm password field(string)
         * @return: no
         * @purpose: Watch confirm password field for checking password match
         */
        $scope.$watchGroup(['resetPassword.confirmPassword', 'resetPassword.password'], function (newValue, oldValue) {
            if (newValue[0] == $scope.resetPassword.password && newValue[1] == $scope.resetPassword.confirmPassword) {
                $scope.resetPassword.isMatch = false;
            } else {
                $scope.resetPassword.isMatch = true;
            }
        });
        /*
         * @author : sandeep
         * @created : 21-10-2016
         * @params: no
         * @return: no
         * @purpose: ReSetting password after clicking reset Url
         */
        $scope.resettingPassword = function () {
            if (!$scope.resetPassword.isMatch) {
                $rootScope.engagetoApp.isLoading = true;
                var data = {
                    password: $scope.resetPassword.password,
                    confirm_password: $scope.resetPassword.confirmPassword,
                    token1: $stateParams.token1,
                    hash: $stateParams.hash,
                    user_email: $stateParams.email
                };
                AuthService.resetPassword(data).then(function (response) {
                    $rootScope.engagetoApp.isLoading = false;
                    $state.go('signin', {isPasswordReset: true});
                }, function (error) {
                    console.log(error);
                    var errorMessage = '';
                    if (error.code == 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                        angular.forEach(error.error.info, function (val, key) {
                            errorMessage = val;
                        });
                    } else if (error.code == 10504 || error.code == 10505) {
                        errorMessage = error.data.message;
                        $scope.resetPassword.hideForm = true;
                        $scope.resetPassword.showRequestDiv = true;
                    } else if (error.code == 10503 || error.code == 10505) {
                        errorMessage = error.data.message;
                        $scope.resetPassword.hideForm = true;
                        $scope.resetPassword.showResetDiv = true;
                    } else {
                        errorMessage = error.data.message;
                    }
                    $rootScope.engagetoApp.isLoading = false;
                    EngagetoAppService.showErrorMessage(errorMessage);
                });
            }
        };
        /*
         * @author : sandeep
         * @created : 25-10-2016
         * @params: no
         * @return: no
         * @purpose: Sending password reset link
         */
        $scope.resetPwdLink = function () {
            $rootScope.engagetoApp.isPageLoading = true;
            var data = {
                user_email: $stateParams.email
            };
            AuthService.sendPwdResetLink(data).then(function (response) {
                $rootScope.engagetoApp.isPageLoading = false;
                EngagetoAppService.showSuccessMessage('We have sent you an email, click the link given in email to reset your password.');
            }, function (error) {
                console.log(error);
                var errorMessage = '';
                $scope.resetPassword.load = false;
                if (error.code === 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                    angular.forEach(error.error.info, function (val, key) {
                        errorMessage = val;
                    });
                } else {
                    errorMessage = error.data.message;
                }
                $rootScope.engagetoApp.isPageLoading = false;
                EngagetoAppService.showErrorMessage(errorMessage);
            });
        }
    }

})(window.angular);