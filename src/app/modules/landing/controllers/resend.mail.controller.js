(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('ReSendMailController', reSendMailController);

    reSendMailController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService',
        'EngagetoAppService',
        'toastr'
    ];

    function reSendMailController(
            $scope,
            $rootScope,
            AuthService,
            EngagetoAppService,
            toastr) {
        $rootScope.engagetoApp.isPageLoading = false;
        //initializing variables
        $scope.resetMail = {
            email: '',
            successAlert: false,
            dangerAlert: false,
            success: '',
            danger: '',
            showResetDiv: false,
            load: false
        };
        /*
         * @author : sandeep
         * @created : 26-10-2016
         * @params: no
         * @return: no
         * @purpose: Request new link if link has expired
         */
        $scope.requestNewLink = function () {
            $rootScope.engagetoApp.isLoading = true;
            var data = {
                user_email: $scope.resetMail.email
            };
            AuthService.isEmailActivated(data.user_email).then(function (response) {
                var isActivated = response.data.data.account_activated;
                if (!isActivated) {
                    AuthService.reSendActivationLink(data).then(function (response) {
                        $scope.resendMailModalForm.$setPristine();
                        $scope.resendMailModalForm.$setUntouched();
                        $scope.resetMail.email = '';
                        EngagetoAppService.showSuccessMessage('Please check your inbox, we have sent you the reset password instructions.');
                        $rootScope.engagetoApp.isLoading = false;
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
                        $rootScope.engagetoApp.isLoading = false;
                    });
                } else {
                    toastr.error('<span>Your account is already activated. <a href="#/app/forgot-password">Click here</a> to get reset password link.</span>',{
                        allowHtml: true,
                        timeOut: 0
                    });
                    $rootScope.engagetoApp.isLoading = false;
                }

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
                $rootScope.engagetoApp.isLoading = false;
            });
        };

        /*
         * @purpose: reset password modal popup
         * @author: sandeep
         * @created: 26-10-2016
         */
        $scope.reSetPasswordLink = function () {
            $scope.resetMail.load = true;
            var data = {
                user_email: $scope.resetMail.email
            };
            AuthService.sendPwdResetLink(data).then(function (response) {
                $scope.resetMail.load = false;
                $scope.resetMail.showResetDiv = false;
                EngagetoAppService.showSuccessMeesage('Please check your inbox, we have sent you the reset password instructions.');
            }, function (error) {
                console.log(error);
                var errorMessage = '';
                $scope.resetMail.load = false;
                if (error.code === 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
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