(function (angular) {

    'use strict';

    angular
            .module('website')
            .controller('ShowInstallationCodeModalController', showInstallationCodeModalController);

    showInstallationCodeModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'WebsiteDetail',
        'WebsiteService',
        'AuthService',
        '$state',
        'EngagetoAppService',
        '$timeout'
    ];

    function showInstallationCodeModalController(
            $scope,
            $rootScope,
            $uibModalInstance,
            WebsiteDetail,
            WebsiteService,
            AuthService,
            $state,
            EngagetoAppService,
            $timeout) {
        $scope.website = {
            code: '',
            emails: '',
            isEmailsValid: true,
            copyMsg: false,
            close: close,
            sendCopyToDev: sendCopyToDev,
            onCopyFunction: onCopyFunction
        };
        //calling website get for show code
        WebsiteService.showInstallationCode(WebsiteDetail.domain_referer).then(function (response) {
            console.log(response);
            $scope.website.code = "<script>\n\
    (function (i, n, t, p) {\n\
    i._intpq = i._intpq || [];\n\
    t = n.createElement('script');\n\
    t.type = 'text/javascript';\n\
    t.async = true;\n\
    t.src = '" + response.data.data.file + "';\n\
    p = n.getElementsByTagName('script')[0];\n\
    p.parentNode.insertBefore(t, p);\n\
    })(window, document);\n\
</script>";
            $rootScope.engagetoApp.isLoading = false;
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
         * @created: 18 nov 2016
         * @params: no
         * @return: no
         * @purpose: close verify code installation modal popup
         * @modified: 29 dec 2016
         * @modified by: sandeep(change function type of modal)
         */
        function close() {
            $uibModalInstance.dismiss('cancle');
        }
        /*
         * @author: sandeep
         * @created: 02 may 2017
         * @params: no
         * @return: no
         * @purpose: sendCopyToDev function
         */
        function sendCopyToDev() {
            var devEmails = $scope.website.emails.split(',');
            var notValidData = false, emailRegex = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
            console.log('devEmails: ', devEmails);
            angular.forEach(devEmails, function (email, key) {
                if (email !== '')
                    emailRegex.test(email.trim()) ? '' : notValidData = true;
                else
                    notValidData = true;
            });
            if (!notValidData) {
                var data = {
                    developer_emails: devEmails
                };
                AuthService.sendEmail(data).then(function (response) {
                    $rootScope.engagetoApp.isLoading = false;
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
            } else {
                $scope.website.isEmailsValid = false;
            }
        }
        /*
         * @author: sandeep
         * @created: 06 may 2017
         * @params: event(object)
         * @returns: no
         * @purpose: onCopyFunction function
         */
        function onCopyFunction(event) {
            $scope.website.copyMsg = true;
            event.clearSelection();
        }
    }
})(window.angular);