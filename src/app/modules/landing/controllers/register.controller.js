(function (angular) {
    'use strict';
    angular
            .module('landing')
            .controller('RegisterController', registerController);
    registerController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService',
        'EngagetoAppService'
    ];
    function registerController(
            $scope,
            $rootScope,
            AuthService,
            EngagetoAppService) {
        $rootScope.engagetoApp.isPageLoading = false;
        //initializing register variables
        $scope.register = {
            noWrapSlides: false,
            active: 0,
            engageto: {
                email: '',
                webSiteUrl: '',
                success: '',
                danger: '',
                domain_id: '',
                isTermAndConditionChecked: false
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
                EngagetoAppService.showSuccessMessage('Confirmation email has been sent to ' + $scope.register.engageto.email + '. Kindly activate your account');
                $scope.engagetoForm.$setPristine();
                $scope.engagetoForm.$setUntouched();
                $scope.register.engageto.email = '';
                $scope.register.engageto.webSiteUrl = '';
                $scope.register.engageto.isTermAndConditionChecked = false;
                $rootScope.engagetoApp.isLoading = false;
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
                $rootScope.engagetoApp.isLoading = false;
                EngagetoAppService.showErrorMessage(errorMessage);
            });
        };

    }
})(window.angular);
