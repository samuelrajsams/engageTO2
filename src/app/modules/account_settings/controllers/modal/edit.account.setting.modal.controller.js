(function (angular) {

    'use strict';

    angular
            .module('accountSettings')
            .controller('EditAccountSettingModalController', editAccountSettingModalController);

    editAccountSettingModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'accountDetails',
        'AccountService',
        'AuthService',
        '$state',
        '$localStorage',
        '$timeout',
        'Country_List',
        'Timezone_List',
        'EngagetoAppService'
    ];

    function editAccountSettingModalController(
            $scope,
            $rootScope,
            $uibModalInstance,
            accountDetails,
            AccountService,
            AuthService,
            $state,
            $localStorage,
            $timeout,
            Country_List,
            Timezone_List,
            EngagetoAppService) {
        $scope.accountSettings = {
            editDetails: AccountService.getEditUserDetails(),
            close: close,
            editAccountDetails: editAccountDetails,
            selectedCountry: selectedCountry,
            load: false
        };
        $scope.accountSettings.editDetails.firstName = accountDetails.firstName,
                $scope.accountSettings.editDetails.lastName = accountDetails.lastName,
                $scope.accountSettings.editDetails.emailAddress = accountDetails.emailAddress,
                $scope.accountSettings.editDetails.companyName = accountDetails.companyName,
                $scope.accountSettings.editDetails.country = accountDetails.country,
                $scope.accountSettings.editDetails.city = accountDetails.city,
                $scope.accountSettings.editDetails.timezone = accountDetails.timezone,
                $scope.accountSettings.editDetails.countryList = Country_List,
                $scope.accountSettings.editDetails.cityList = '',
                $scope.accountSettings.editDetails.timezoneList = Timezone_List;
        /*
         * @author: sandeep
         * @created: 30 nov 2016
         * @params: no
         * @return: no
         * @purpose: close edit user modal popup
         */
        function close() {
            $uibModalInstance.dismiss('cancle');
        }
        /*
         * @author : sandeep
         * @created : 01 dec 2016
         * @params: no
         * @return: no
         * @purpose: editAccountDetails
         */
        function editAccountDetails() {
            $rootScope.engagetoApp.isLoading = true;
            var accountDetails = {
                firstname: $scope.accountSettings.editDetails.firstName,
                lastname: $scope.accountSettings.editDetails.lastName,
                user_email: $scope.accountSettings.editDetails.emailAddress,
                company: $scope.accountSettings.editDetails.companyName,
                country: $scope.accountSettings.editDetails.country,
                city: $scope.accountSettings.editDetails.city,
                timezone: $scope.accountSettings.editDetails.timezone
            };
            AccountService.editAccountDetails(accountDetails, $localStorage.user_id).then(function (response) {
                $rootScope.engagetoApp.isLoading = false;
                EngagetoAppService.showSuccessMessage(response.data.data.message);
                $timeout(function () {
                    $uibModalInstance.close();
                }, 1000);
            }, function (error) {
                console.log(error);
                var errorMessage = '';
            //authentication failed
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
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
        }
        /*
         * @author : sandeep
         * @created : 17 dec 2016
         * @params: no
         * @return: no
         * @purpose: selectedCountry function
         */
        function selectedCountry() {
            $scope.accountSettings.load = true;
            AccountService.getCitiesByCountry($scope.accountSettings.editDetails.country).then(function (response) {
                $scope.accountSettings.editDetails.cityList = response;
                $scope.accountSettings.load = false;
            }, function (error) {
                console.log(error);
            });
        }
    }
})(window.angular);