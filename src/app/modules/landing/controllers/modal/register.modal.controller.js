(function (angular) {
    'use strict';
    angular
            .module('landing')
            .controller('RegisterModalController', registerModalController);
    registerModalController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService',
        'EngagetoAppService',
        '$uibModalInstance'
    ];
    function registerModalController(
            $scope,
            $rootScope,
            AuthService,
            EngagetoAppService,
            $uibModalInstance) {
        //initializing register variables
        $scope.register = {
            noWrapSlides: false,
            active: 0,
            engageto: {
                email: '',
                webSiteUrl: '',
                success: '',
                danger: '',
                domain_id: ''
            },
            load: false,
            signup: signup
        };

        /*
         * @author: sandeep
         * @created: 17 apr 2017
         * @params: no
         * @return: no
         * @purpose: engageto to customer
         */
        function signup () {
            $rootScope.engagetoApp.isLoading = true;
            var data = {
                domain_address: $scope.register.engageto.webSiteUrl,
                user_email: $scope.register.engageto.email
            };
            AuthService.register(data).then(function (response) {
                EngagetoAppService.showSuccessMessage('Confirm your email address. A confirmation email has been sent to ' + $scope.register.engageto.email + '. Click on the confirmation link to activate your account');
                $rootScope.engagetoApp.isLoading = false;
                $uibModalInstance.close('success');
            }, function (error) {
                console.log(error);
                var errorMessage = '';
                if (error) {
                    if (error.code == 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                        angular.forEach(error.error.info, function (val, key) {
                            errorMessage = val;
                        });
                    } else {
                        errorMessage = error.data.message;
                    }
                } else {
                    errorMessage = "Server Error";
                }
                EngagetoAppService.showErrorMessage(errorMessage);
                $rootScope.engagetoApp.isLoading = false;
            });
        };

    }
})(window.angular);
