(function (angular) {
    'use strict';
    angular
            .module('landing')
            .controller('SetPasswordController', setPasswordController);
    setPasswordController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService',
        '$stateParams',
        'EngagetoAppService',
        '$state',
        '$timeout'
    ];
    function setPasswordController(
            $scope,
            $rootScope,
            AuthService,
            $stateParams,
            EngagetoAppService,
            $state,
            $timeout) {
        //initializing variables
        $scope.setPassword = {
            password: '',
            confirmPassword: '',
            isMatch: false,
            hideForm: true,
            showRequestDiv: false,
            showResetDiv: false,
            showLogin: false,
            validPassword: true,
            enteringPassword: false,
            commonError: false
        };
        var linkData = {
            token1: $stateParams.token1,
            hash: $stateParams.hash,
            user_email: $stateParams.email
        };
        console.log('/user/password?token1: ', $stateParams.token1, '&hash: ', $stateParams.hash, '&email: ', $stateParams.email, '&domainId: ', $stateParams.domainId, '&new: ', $stateParams.new, $stateParams.refBy);
        if (!$stateParams['domainId'] && !$stateParams['new']) {
            AuthService.isLinkExpired(linkData).then(function (response) {
                AuthService.isEmailActivated($stateParams.email).then(function (response) {
                    AuthService.accountActivate($stateParams.email).then(function (response) {
                        $rootScope.engagetoApp.isPageLoading = false;
                        $scope.setPassword.hideForm = false;
                        EngagetoAppService.showSuccessMessage('Your account is successfully verified ! Please set password to access your account.');
                    }, function (error) {
                        console.log(error);
                        var errorMessage = '';
                        if (error.code == 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                            $scope.setPassword.hideForm = true;
                            $scope.setPassword.commonError = true;
                            angular.forEach(error.error.info, function (val, key) {
                                errorMessage = val;
                            });
                        } else if (error.code === 10506) {
                            //ALREADY ACTIVE
                            $rootScope.engagetoApp.isPageLoading = false;
                            $state.go('forgotPasswordRequest');
                            $timeout(function () {
                                EngagetoAppService.showErrorMessage(error.data.message);
                            }, 1000);
                        } else {
                            $scope.setPassword.commonError = true;
                            $scope.setPassword.hideForm = true;
                            errorMessage = error.data.message;
                        }
                        $rootScope.engagetoApp.isPageLoading = false;
                        EngagetoAppService.showErrorMessage(errorMessage);
                    });
                }, function (error) {
                    var errorMessage = '';
                    if (error.code == 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                        $scope.setPassword.hideForm = true;
                        $scope.setPassword.commonError = true;
                        angular.forEach(error.error.info, function (val, key) {
                            errorMessage = val;
                        });
                    } else if (error.code == 10502) {
                        //10502 - No user found
                        $rootScope.engagetoApp.isPageLoading = false;
                        $state.go('register');
                        $timeout(function () {
                            EngagetoAppService.showErrorMessage(error.data.message);
                        }, 1000);
                    } else if (error.code == 10503) {
                        //10503 - No set password request found
                        $rootScope.engagetoApp.isPageLoading = false;
                        $state.go('forgotPasswordRequest');
                        $timeout(function () {
                            EngagetoAppService.showErrorMessage(error.data.message);
                        }, 1000);
                    } else if (error.code == 10506) {
                        //ALREADY ACTIVE
                        $rootScope.engagetoApp.isPageLoading = false;
                        $state.go('forgotPasswordRequest');
                        $timeout(function () {
                            EngagetoAppService.showErrorMessage(error.data.message);
                        }, 1000);
                    } else {
                        $scope.setPassword.commonError = true;
                        $scope.setPassword.hideForm = true;
                        errorMessage = error.data.message;
                    }
                    $rootScope.engagetoApp.isPageLoading = false;
                    EngagetoAppService.showErrorMessage(errorMessage);
                });
            }, function (error) {
                console.log(error);
                var errorMessage = '';
                if (error.code == 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                    $scope.setPassword.commonError = true;
                    $scope.setPassword.hideForm = true;
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
                    $scope.setPassword.commonError = true;
                    $scope.setPassword.hideForm = true;
                    errorMessage = error.data.message;
                }
                $rootScope.engagetoApp.isPageLoading = false;
                EngagetoAppService.showErrorMessage(errorMessage);
            });
        } else {
            AuthService.activateTeamMember($stateParams.refBy, $stateParams.domainId, $stateParams.email).then(function (response) {
                if ($stateParams.new == 'true') {
                    $scope.setPassword.hideForm = false;
                    $rootScope.engagetoApp.isPageLoading = false;
                    EngagetoAppService.showSuccessMessage(response.data.data.message);
                } else {
                    $state.go('signin');
                    $timeout(function () {
                        EngagetoAppService.showSuccessMessage('You are account has been successfully activated as Team Member. Please do login.');
                    },1000);
                }
            }, function (error) {
                console.log(error);
                var errorMessage = '';
                if (error.code === 10506) {
                    $scope.setPassword.showResetDiv = true;
                    errorMessage = error.data.message;
                } else {
                    $scope.setPassword.commonError = true;
                    $scope.setPassword.hideForm = true;
                    errorMessage = error.data.message;
                }
                $rootScope.engagetoApp.isPageLoading = false;
                EngagetoAppService.showErrorMessage(errorMessage);
            });
        }
        /*
         * @author : sandeep
         * @created : 19-10-2016
         * @params: confirm password field(string)
         * @return: no
         * @purpose: Watch confirm password field for checking password match
         */
        $scope.$watchGroup(['setPassword.confirmPassword', 'setPassword.password'], function (newValue, oldValue) {
            if (newValue[0] == $scope.setPassword.password || newValue[1] == $scope.setPassword.confirmPassword) {
                $scope.setPassword.isMatch = false;
            } else {
                $scope.setPassword.isMatch = true;
            }
        });
        /*
         * @author : sandeep
         * @created : 19-10-2016
         * @params: no
         * @return: no
         * @purpose: Setting password after clicking account activation Url
         */
        $scope.settingPassword = function () {
            if (!$scope.setPassword.isMatch) {
                $rootScope.engagetoApp.isLoading = true;
                var data = {
                    password: $scope.setPassword.password,
                    confirm_password: $scope.setPassword.confirmPassword,
                    token1: $stateParams.token1,
                    hash: $stateParams.hash,
                    user_email: $stateParams.email
                };
                AuthService.setPassword(data).then(function (response) {
                    $rootScope.engagetoApp.isLoading = false;
                    $state.go('signin', {isPasswordSet: true});
                }, function (error) {
                    console.log(error);
                    var errorMessage = '';
                    $scope.setPassword.showLogin = false;
                    if (error.code == 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                        angular.forEach(error.error.info, function (val, key) {
                            errorMessage = val;
                        });
                    } else if (error.code == 10504) {
                        errorMessage = error.data.message;
                        $scope.setPassword.hideForm = true;
                        $scope.setPassword.showRequestDiv = true;
                    } else if (error.code == 10506) {
                        errorMessage = error.data.message;
                        $scope.setPassword.hideForm = true;
                        $scope.setPassword.showResetDiv = true;
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
         * @created : 21-10-2016
         * @params: no
         * @return: no
         * @purpose: Request new link if link has expired
         */
        $scope.requestNewLink = function () {
            $scope.setPassword.load = true;
            var data = {
                user_email: $stateParams.email
            };
            AuthService.reSendActivationLink(data).then(function (response) {
                EngagetoAppService.showSuccessMessage('We have sent you an email, click the link given in email to activate your account.');
            }, function (error) {
                console.log(error);
                var errorMessage = '';
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
        /*
         * @author : sandeep
         * @created : 22-10-2016
         * @params: no
         * @return: no
         * @purpose: Sending password reset link
         */
        $scope.resetPwdLink = function () {
            $scope.setPassword.load = true;
            var data = {
                user_email: $stateParams.email
            };
            AuthService.sendPwdResetLink(data).then(function (response) {
                EngagetoAppService.showSuccessMessage('We have sent you an email, click the link given in email to reset your password.');
            }, function (error) {
                console.log(error);
                var errorMessage = '';
                $scope.setPassword.resetLink = false;
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
