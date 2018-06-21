(function (angular) {
    'use strict';
    angular
            .module('landing')
            .controller('CodeInstallationController', codeInstallationController);
    codeInstallationController.$inject = [
        '$scope',
        '$rootScope',
        '$stateParams',
        'AuthService',
        '$timeout',
        '$state',
        'EngagetoAppService',
        '$localStorage',
        'NotificationService'
    ];
    function codeInstallationController(
            $scope,
            $rootScope,
            $stateParams,
            AuthService,
            $timeout,
            $state,
            EngagetoAppService,
            $localStorage,
            NotificationService) {
        //initializing variables
        $scope.codeInstallation = {
            website_id: '',
            developerEmail: '',
            code: '',
            copyMsg: false,
            showTextField: true,
            isActivated: false,
            load: false,
            onCopyFunction: onCopyFunction
        };
        var data = {
            domain_id: $localStorage.domain_referer,
            user_id: $localStorage.user_id
        };
        AuthService.getCodeInstallationPath(data).then(function (response) {
            console.log(response);
            $scope.codeInstallation.code = "<script>\n\
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
            $rootScope.engagetoApp.isPageLoading = false;
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

        $scope.$watch("codeInstallation.developerEmail", function (newValue, oldValue) {
            if (newValue) {
                var str = newValue;
                if (str.indexOf(',') > -1) {
                    $scope.codeInstallation.showTextField = false;
                } else {
                    $scope.codeInstallation.showTextField = true;
                }
            }
        });

        $scope.sendEmailToDeveloper = function () {
            $rootScope.engagetoApp.isPageLoading = true;
            var developerEmails = $scope.codeInstallation.developerEmail.split(',');
            console.log(developerEmails, 'here is the split data')
            var data = {
                developer_emails: developerEmails
            };
            AuthService.sendEmail(data).then(function (response) {
                console.log("sendEmail", response);
                $rootScope.engagetoApp.isPageLoading = false;
                EngagetoAppService.showSuccessMessage(response.data.data.message);
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
                $rootScope.engagetoApp.isPageLoading = false;
                EngagetoAppService.showErrorMessage(errorMessage);
            });
        };
        /*
         * @author: sandeep
         * @created: 06 may 2017
         * @params: event(object)
         * @returns: no
         * @purpose: onCopyFunction function
         */
        function onCopyFunction(event) {
            $scope.codeInstallation.copyMsg = true;
            event.clearSelection();
        }
    }
})(window.angular);