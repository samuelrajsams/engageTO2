(function (angular) {

    'use strict';

    angular
            .module('accountSettings')
            .controller('AccountSettingsController', accountSettingsController);

    accountSettingsController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'AccountService',
        '$localStorage',
        'AuthService',
        '$state',
        '$timeout',
        'SigninModalService',
        'TeamManagementService',
        'EngagetoAppService',
        'toastr'
    ];

    function accountSettingsController(
            $scope,
            $rootScope,
            $uibModal,
            AccountService,
            $localStorage,
            AuthService,
            $state,
            $timeout,
            SigninModalService,
            TeamManagementService,
            EngagetoAppService,
            toastr) {
        //initializing account variables
        $scope.account = {
            userDetails: AccountService.getUserDetails(),
            planDetails: AccountService.getPlanDetails(),
            teamDomainList: [],
            isMaxFileSizeLimitReached: false,
            changePasswordModal: changePasswordModal,
            editAccountSettingModal: editAccountSettingModal,
            invoiceModal: invoiceModal,
            upgradeDegradeModal: upgradeDegradeModal,
            uploadProfile: uploadProfile,
            cancelAccountModal: cancelAccountModal,
            hideSuccessAlert: hideSuccessAlert
        };
        //active class for account
        $rootScope.engagetoApp.setting.active = 'account';
        TeamManagementService.getTeamMember($localStorage.user_id).then(function (response) {
            $scope.account.teamDomainList = response.data.data;
            AccountService.getAccountDetails($localStorage.user_id).then(function (response) {
                AccountService.getPlanDetailsById(response.data.data._plan_id).then(function (planResponse) {
                    $scope.account.userDetails.firstName = response.data.data.firstname,
                            $scope.account.userDetails.lastName = response.data.data.lastname,
                            $scope.account.userDetails.emailAddress = response.data.data.user_email,
                            $scope.account.userDetails.role = '',
                            $scope.account.userDetails.companyName = response.data.data.company,
                            $scope.account.userDetails.country = response.data.data.country_name,
                            $scope.account.userDetails.city = response.data.data.city,
                            $scope.account.userDetails.userProfile = response.data.data.profile_pic || '',
                            $rootScope.engagetoApp.profile.image = response.data.data.profile_pic || '',
                            $localStorage.profile_image = response.data.data.profile_pic || '',
                            $scope.account.userDetails.timezone = response.data.data.timezone;
                    $scope.account.planDetails.planName = planResponse.data.data.plan_name,
                            $scope.account.planDetails.planCost = planResponse.data.data.price,
                            $scope.account.planDetails.nextBillingDate = new Date(response.data.data.subscription_expires_at),
                            $scope.account.planDetails.noOfSubscribers = planResponse.data.data.max_subscribers,
                            $scope.account.planDetails.noOfWebsites = planResponse.data.data.max_domains,
                            $scope.account.planDetails.noOfTeamMembers = planResponse.data.data.max_users,
                            $scope.account.planDetails.noOfPushJourneys = '',
                            $scope.account.planDetails.noOfAPICalls = planResponse.data.data.max_api_calls;
                    $rootScope.engagetoApp.isPageLoading = false;
                }, function (error) {
                    console.log(error);
                    $rootScope.engagetoApp.isPageLoading = false;
                    //authentication failed
                    if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                        AuthService.revokeAuth();
                        $rootScope.engagetoApp.isAuthenticatedUser = false;
                        $state.go('landing');
                    }
                });
            }, function (error) {
                console.log(error);
                $rootScope.engagetoApp.isPageLoading = false;
                //authentication failed
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
                    $state.go('landing');
                }
            });
        }, function (error) {
            console.log(error);
            if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                AuthService.revokeAuth();
                $rootScope.engagetoApp.isAuthenticatedUser = false;
                $state.go('landing');
            }
        });
        /*
         * @author: sandeep
         * @params: no
         * @return: no
         * @created: 10 nov 2016
         * @purpose: open changePasswordModal
         */
        function changePasswordModal() {
            var changePasswordModalInstance = $uibModal.open({
                templateUrl: 'app/modules/account_settings/views/modal/change.password.html',
                windowClass: 'reset-password-custom-modal',
                controller: 'ChangePasswordController'
            });

            changePasswordModalInstance.result.then(function (successResponse) {
            }, function (errorStatus) {
                console.log(errorStatus);
            });
        }
        /*
         * @author: sandeep
         * @params: no
         * @return: no
         * @created: 10 nov 2016
         * @purpose: open editAccountSettingModal
         */
        function editAccountSettingModal() {
            var editAccountSettingModalInstance = $uibModal.open({
                'templateUrl': 'app/modules/account_settings/views/modal/edit.account.setting.modal.html',
                'controller': 'EditAccountSettingModalController',
                'windowClass': 'edit-account-custom-modal',
                resolve: {
                    accountDetails: function () {
                        return $scope.account.userDetails;
                    }
                }
            });

            editAccountSettingModalInstance.result.then(function (successResponse) {
                $state.reload();
            }, function (errorStatus) {
                console.log(errorStatus);
            });
        }
        /*
         * @author: sandeep
         * @params: no
         * @return: no
         * @created: 10 nov 2016
         * @purpose: open invoiceModal
         */
        function invoiceModal() {
            var invoiceModalInstance = $uibModal.open({
                'templateUrl': 'app/modules/account_settings/views/modal/invoice.setting.modal.html',
                'controller': 'InvoiceSettingModalController',
                'windowClass': 'invoice-custom-modal'
            });

            invoiceModalInstance.result.then(function (successResponse) {
                console.log(successResponse);
            }, function (errorStatus) {
                console.log(errorStatus);
            });
        }
        /*
         * @author: sandeep
         * @params: no
         * @return: no
         * @created: 10 nov 2016
         * @purpose: open upgradeDegradeModal
         */
        function upgradeDegradeModal() {
            SigninModalService.openPricingModal('Profile');
        }
        /*
         * @author: sandeep
         * @created: 31 may 2017
         * @params: file(object), invalidFiles(array)
         * @return: no
         * @purpose: open uploadProfile
         */
        function uploadProfile() {
            var uploadImageModalInstance = $uibModal.open({
                templateUrl: 'app/modules/account_settings/views/modal/upload.images.manager.modal.html',
                controller: 'UploadProfileManagerModalController',
                windowClass: 'upload-image-manager-modal',
                backdrop: 'static',
                keyboard: false
            });

            uploadImageModalInstance.result.then(function (response) {
                $scope.account.userDetails.userProfile = response;
                $rootScope.engagetoApp.profile.image = response;
                $localStorage.profile_image = response;
            }, function (error) {
                $rootScope.engagetoApp.notification.image = $scope.sendPushNotification.notification.image;
            });
        }
        /*
         * @author: sandeep
         * @params: no
         * @return: no
         * @created: 10 nov 2016
         * @purpose: open cancelAccountModal
         */
        function cancelAccountModal() {
            var cancelAccountModalInstance = $uibModal.open({
                'templateUrl': 'app/modules/account_settings/views/modal/cancel.account.modal.html',
                'controller': 'CancelAccountModalController',
                'windowClass': 'cancel-account-custom-modal'
            });

            cancelAccountModalInstance.result.then(function (successResponse) {
                console.log(successResponse);
            }, function (errorStatus) {
                console.log(errorStatus);
            });
        }
        /*
         * @author: sandeep
         * @params: no
         * @return: no
         * @created: 01 dec 2016
         * @purpose: hideSuccessAlert
         */
        function hideSuccessAlert() {
            $scope.account.userDetails.successAlert = false;
        }
    }
})(window.angular);