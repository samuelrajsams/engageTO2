(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('LoginController', loginController);

    loginController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService',
        '$state',
        '$localStorage',
        'NotificationService',
        'EngagetoAppService',
        '$uibModal',
        '$stateParams'
    ];

    function loginController(
            $scope,
            $rootScope,
            AuthService,
            $state,
            $localStorage,
            NotificationService,
            EngagetoAppService,
            $uibModal,
            $stateParams) {
        //initialize variables
        $scope.user = {
            email: '',
            password: '',
            dangerAlert: false,
            danger: '',
            openSignupForm: openSignupForm
        };
        /*
         * @author : sandeep
         * @created : 22-10-2016
         * @params: no
         * @return: no
         * @purpose: signIn User
         * @modified: 16 jan 2017
         * @modified by: sandeep(added get list domain api)
         */
        $scope.signIn = function () {
            $rootScope.engagetoApp.isLoading = true;
            var data = {
                user_email: $scope.user.email,
                user_password: $scope.user.password
            };
            AuthService.login(data).then(function (authresponse) {
                console.log("login", authresponse);
                $rootScope.engagetoApp.profile.initial = '';
                $localStorage.user_id = authresponse.data.data.user_id;
                $localStorage.userPlan = authresponse.data.data.plan;
                $rootScope.engagetoApp.userPlan = authresponse.data.data.plan;
                delete $localStorage.user;
                $localStorage.token = authresponse.headers('sid');
                $rootScope.$storage.token = $localStorage.token;
                if (authresponse.data.data.first_login) {
                    $rootScope.engagetoApp.isLoading = false;
                    $state.go('getting-started', {'newLogin': 1, 'subDomain': authresponse.data.data.app_domain, 'domainAddress': authresponse.data.data.domain_address, 'isDomainValid': authresponse.data.data.app_domain_available ? 1 : 0});
                } else {
                    AuthService.getAccountDetails($localStorage.user_id).then(function (response) {
                        $rootScope.engagetoApp.profile.initial = '';
                        $localStorage.user_email = $scope.user.email;
                        $rootScope.engagetoApp.profile.id = $localStorage.user_id;
                        $rootScope.engagetoApp.profile.email = $scope.user.email;
                        $rootScope.engagetoApp.profile.firstName = response.data.data.firstname;
                        $localStorage.firstName = response.data.data.firstname;
                        $rootScope.engagetoApp.profile.lastName = response.data.data.lastname;
                        $localStorage.lastName = response.data.data.lastname;
                        $rootScope.engagetoApp.profile.image = response.data.data.profile_pic || '';
                        $localStorage.profile_image = response.data.data.profile_pic || '';
                        if (response.data.data.firstname !== '' || response.data.data.lastname !== '') {
                            response.data.data.firstname !== '' ? $rootScope.engagetoApp.profile.initial += response.data.data.firstname.charAt(0).toUpperCase() : '';
                            response.data.data.lastname !== '' ? $rootScope.engagetoApp.profile.initial += response.data.data.lastname.charAt(0).toUpperCase() : '';
                            $localStorage.initial = $rootScope.engagetoApp.profile.initial;
                        } else {
                            $rootScope.engagetoApp.profile.initial += $scope.user.email.charAt(0).toUpperCase();
                            $rootScope.engagetoApp.profile.initial += $scope.user.email.charAt(1).toUpperCase();
                            $localStorage.initial = $rootScope.engagetoApp.profile.initial;
                        }
                        var data = {
                            user_email: $localStorage.user_email,
                            user_id: $localStorage.user_id
                        };
                        NotificationService.getDomainList(data).then(function (response) {
                            var domainList = [], index = -1;
                            angular.forEach(response.data.data, function (v, k) {
                                if (v.domain_status === 'active') {
                                    domainList.push(v);
                                    index === -1 && v.primary && v.role === 'Super Administrator' ? index = k : '';
                                }
                            });
                            $rootScope.engagetoApp.allDomainList = response.data.data;
                            $localStorage.allDomainList = $rootScope.engagetoApp.allDomainList;
                            $rootScope.engagetoApp.domainList = domainList;
                            $localStorage.domainList = $rootScope.engagetoApp.domainList;
                            if (index !== -1 && !$localStorage.domain_referer) {
                                $localStorage.domain_referer = response.data.data[index].domain_referer;
                                $localStorage.domain_address = response.data.data[index].domain_address;
                                $localStorage.subDomainName = response.data.data[index].app_domain;
                                $rootScope.engagetoApp.profile.domainName = response.data.data[index].domain_address;
                                $rootScope.engagetoApp.profile.subDomainName = response.data.data[index].app_domain;
                                $rootScope.engagetoApp.profile.role = response.data.data[index].role;
                                $localStorage.user_role = response.data.data[index].role;
                                $rootScope.engagetoApp.selectedDomainName = response.data.data[index].domain_referer;
                            }
                            $rootScope.engagetoApp.isLoading = false;
                            $state.go("side-nav-template.new-push-notification");
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
                }
            }, function (error) {
                console.log(error);
                var errorMessage = '';
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10208) {
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
        };

        /*
         * @author: sandeep
         * @created: 17 apr 2017
         * @params: no
         * @returns: no
         * @purpose: openSignupForm function
         */
        function openSignupForm() {
            var openSignupFormInstance = $uibModal.open({
                templateUrl: 'app/modules/landing/views/modal/register.html',
                controller: 'RegisterModalController'
            });
            openSignupFormInstance.result.then(function (response) {
                console.log(response);
            }, function (error) {
                console.log(error);
            });
        }
        console.log('state params: ', $stateParams);
        if ($stateParams.isPasswordSet)
            EngagetoAppService.showSuccessMessage('Your password has been set, kindly proceed to login');
        if ($stateParams.isPasswordReset)
            EngagetoAppService.showSuccessMessage('Your password has been reset, kindly proceed to login');
        $rootScope.engagetoApp.isPageLoading = false;
    }
})(window.angular);



