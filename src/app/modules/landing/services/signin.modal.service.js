(function (angular) {
    'use strict';
    angular
            .module('landing')
            .service('SigninModalService', signinModalService);
    signinModalService.$inject = [
        '$uibModal',
        '$rootScope',
        '$localStorage',
        'WebsiteService',
        'AuthService',
        '$state',
        'TeamManagementService'
    ];

    function signinModalService(
            $uibModal,
            $rootScope,
            $localStorage,
            WebsiteService,
            AuthService,
            $state,
            TeamManagementService) {
        /*
         * @author: sandeep
         * @created: 26 apr 2017
         * @params: no
         * @return: no
         * @purpose: openSignInModal function
         */
        this.openSignInModal = function () {
            var signInModalInstance = $uibModal.open({
                'templateUrl': 'app/modules/landing/views/signin.modal.html',
                'controller': 'SignInController',
                'windowClass': 'signin-custom-modal'
            });

            signInModalInstance.result.then(function (successResponse) {
                console.log(successResponse);
            }, function (errorStatus) {
                console.log(errorStatus);
            });
        };
        /*
         * @author: sandeep
         * @created: 26 apr 2017
         * @params: no
         * @return: no
         * @purpose: openResendLinkModal function
         */
        this.openResendLinkModal = function () {
            var openResendLinkModalInstance = $uibModal.open({
                'templateUrl': 'app/modules/landing/views/resend.mail.modal.html',
                'controller': 'ReSendMailController',
                'windowClass': 'resend-custom-modal'
            });

            openResendLinkModalInstance.result.then(function (successResponse) {
                console.log(successResponse);
            }, function (errorStatus) {
                console.log(errorStatus);
            });
        };
        /*
         * @author: sandeep
         * @created: 26 apr 2017
         * @params: no
         * @return: no
         * @purpose: openResetPasswordModal function
         */
        this.openResetPasswordModal = function () {
            var openResetPasswordModalInstance = $uibModal.open({
                'templateUrl': 'app/modules/landing/views/reset.password.modal.html',
                'controller': 'ReSetPasswordController',
                'windowClass': 'reset-password-custom-modal'
            });

            openResetPasswordModalInstance.result.then(function (successResponse) {
                console.log(successResponse);
            }, function (errorStatus) {
                console.log(errorStatus);
            });
        };
        /*
         * @author: sandeep
         * @created: 26 apr 2017
         * @params: no
         * @return: no
         * @purpose: changePasswordModal function
         */
        this.changePasswordModal = function () {
            var changePasswordModalInstance = $uibModal.open({
                templateUrl: 'app/modules/account_settings/views/modal/change.password.html',
                windowClass: 'reset-password-custom-modal',
                controller: 'ChangePasswordController'
            });

            changePasswordModalInstance.result.then(function (successResponse) {
                console.log(successResponse);
            }, function (errorStatus) {
                console.log(errorStatus);
            });
        };
        /*
         * @author: sandeep
         * @created: 26 apr 2017
         * @params: no
         * @return: no
         * @purpose: addDomainModal function
         */
        this.addDomainModal = function () {
            var addDomainModalInstance = $uibModal.open({
                'templateUrl': 'app/modules/website/views/modal/add.website.modal.html',
                'controller': 'AddWebsiteModalController',
                'windowClass': 'add-website-modal'
            });

            addDomainModalInstance.result.then(function (successResponse) {
                console.log(successResponse);
                $state.go('side-nav-template.domain-management');
            }, function (errorStatus) {
                console.log(errorStatus);
                $rootScope.engagetoApp.selectedDomainName = $localStorage.domain_referer;
            });
        };
        /*
         * @author: sandeep
         * @created: 26 apr 2017
         * @params: no
         * @return: no
         * @purpose: addDomainModal function
         */
        this.addDomainModal = function () {
            var addDomainModalInstance = $uibModal.open({
                templateUrl: 'app/modules/website/views/modal/add.website.modal.html',
                controller: 'AddWebsiteModalController',
                windowClass: 'add-website-modal',
                backdrop: 'static',
                keyboard: false
            });

            addDomainModalInstance.result.then(function (successResponse) {
                console.log(successResponse);
                $state.go('side-nav-template.domain-management');
            }, function (errorStatus) {
                console.log(errorStatus);
                $rootScope.engagetoApp.selectedDomainName = $localStorage.domain_referer;
            });
        };
        /*
         * @author: sandeep
         * @created: 06 may 2017
         * @params: no
         * @return: no
         * @purpose: addTeamModal function
         */
        this.addTeamModal = function () {
            TeamManagementService.getRolesList().then(function (response) {
                var addTeamManagementModalInstance = $uibModal.open({
                    templateUrl: 'app/modules/team_management/views/modal/add.team.management.modal.html',
                    controller: 'AddTeamManagementController',
                    windowClass: 'add-team-management-modal',
                    resolve: {
                        addView: function () {
                            return true;
                        },
                        roleList: function () {
                            return response.data.data['active_roles'];
                        },
                        websiteList: function () {
                            return $rootScope.engagetoApp.domainList;
                        }
                    }
                });

                addTeamManagementModalInstance.result.then(function (response) {
                    $state.go('side-nav-template.team-management');
                }, function (error) {
                    console.log(error);
                });
            }, function (error) {
                console.log(error);
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
                    $state.go('landing');
                }
            });
        };
        /*
         * @author: sandeep
         * @created: 26 apr 2017
         * @params: no
         * @return: no
         * @purpose: openPringModal function
         */
        this.openPricingModal = function (stateName) {
            var openPricingModalInstance = $uibModal.open({
                templateUrl: 'app/shared/navigation/pricing.modal.template.html',
                controller: 'PricingModalController',
                windowClass: 'upgrade-account-modal',
                resolve: {
                    stateName: function () {
                        return stateName;
                    }
                }
            });

            openPricingModalInstance.result.then(function (successResponse) {
                console.log(successResponse);
                $rootScope.engagetoApp.selectedDomainName = $localStorage.domain_referer;
            }, function (errorStatus) {
                console.log(errorStatus);
                $rootScope.engagetoApp.selectedDomainName = $localStorage.domain_referer;
            });
        };
        /*
         * @author: sandeep
         * @created: 12 jul 2017
         * @params: no
         * @return: no
         * @purpose: openSupportModal function
         */
        this.openSupportModal = function () {
            var openPricingModalInstance = $uibModal.open({
                templateUrl: 'app/shared/navigation/support.modal.template.html',
                controller: 'SupportModalController',
                windowClass: 'support-modal add-team-management-modal',
                size: 'sm'
            });

            openPricingModalInstance.result.then(function (successResponse) {
                console.log(successResponse);
            }, function (errorStatus) {
                console.log(errorStatus);
            });
        };
    }
})(window.angular);
