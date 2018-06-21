(function (angular) {
    'use strict';

    angular
            .module('onboarding')
            .controller('OnboardingController', onboardingController);

    onboardingController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService',
        '$state',
        '$timeout',
        '$stateParams',
        'OnboardingService',
        '$localStorage',
        '$uibModal',
        'NotificationService',
        'EngagetoAppService',
        '$window'
    ];

    function onboardingController(
            $scope,
            $rootScope,
            AuthService,
            $state,
            $timeout,
            $stateParams,
            OnboardingService,
            $localStorage,
            $uibModal,
            NotificationService,
            EngagetoAppService,
            $window) {
        //initializing slider variables
        var slider1BubbleValue = '5000', slider2BubbleValue = '5000';
        //included for removing class for onboarding page
//        angular.element('.engageto-nav').removeClass('engageto-nav-scroll');
        $rootScope.engagetoApp.isHeaderClassAdded = false;
        $rootScope.engagetoApp.isPageLoading = false;
        //adding odometer behaviour for price values
        var slider1Odometer = document.querySelector('.odometer');
        var slider2Odometer = document.querySelector('.odometer-slider');
        new Odometer({
            el: slider1Odometer,
            value: 19
        });
        new Odometer({
            el: slider2Odometer,
            value: 39
        });
        //initializing onboarding variables
        $scope.onboarding = {
            isNewLogin: $stateParams.newLogin == 1 ? true : false,
            domainAddress: $stateParams.domainAddress,
            isFirstTabValid: false,
            steps: $localStorage['steps'] ? $localStorage.steps : $stateParams.newLogin == 1 ? 0 : 1,
            user: {
                firstName: $localStorage['user'] ? $localStorage.user.firstName : '',
                lastName: $localStorage['user'] ? $localStorage.user.lastName : '',
                companyName: $localStorage['user'] ? $localStorage.user.companyName : '',
                subDomainName: $localStorage['user'] ? $localStorage.user.subDomainName : $stateParams.subDomain
            },
            error: {
                index: 0,
                message: '',
                isSubDomainValid: $localStorage.user ? true : $stateParams.isDomainValid == 1 ? true : false
            },
            plan: {
                planSlab: 'Monthly',
                premiumPrice: '19',
                noOfPremiumAPICalls: '100000',
                expertisePrice: '39',
                noOfExpertiseAPICalls: '200000',
                isPlanSelected: false
            },
            slider1: {
                value: 0,
                options: {
                    floor: 0,
                    ceil: 25,
                    showTicks: 5,
                    showTicksArray: [1, 5, 10, 15, 20, 25],
                    showSelectionBar: true,
                    translate: function (value) {
                        if (value >= 0 && value < 5) {
                            slider1BubbleValue = '5000';
                            if ($scope.onboarding.plan.planSlab === 'Monthly') {
                                $scope.onboarding.plan.premiumPrice = '19';
                                slider1Odometer.innerHTML = 19;
                            } else {
                                $scope.onboarding.plan.premiumPrice = '190';
                                slider1Odometer.innerHTML = 190;
                            }
                            $scope.onboarding.plan.noOfPremiumAPICalls = '100000';
                            return '5k';
                        } else
                        if (value >= 5 && value < 10) {
                            slider1BubbleValue = '10000';
                            if ($scope.onboarding.plan.planSlab === 'Monthly') {
                                $scope.onboarding.plan.premiumPrice = '29';
                                slider1Odometer.innerHTML = 29;
                            } else {
                                $scope.onboarding.plan.premiumPrice = '290';
                                slider1Odometer.innerHTML = 290;
                            }
                            $scope.onboarding.plan.noOfPremiumAPICalls = '200000';
                            return '10k';
                        } else
                        if (value >= 10 && value < 15) {
                            slider1BubbleValue = '25000';
                            if ($scope.onboarding.plan.planSlab === 'Monthly') {
                                $scope.onboarding.plan.premiumPrice = '49';
                                slider1Odometer.innerHTML = 49;
                            } else {
                                $scope.onboarding.plan.premiumPrice = '490';
                                slider1Odometer.innerHTML = 490;
                            }
                            $scope.onboarding.plan.noOfPremiumAPICalls = '500000';
                            return '25k';
                        } else
                        if (value >= 15 && value < 20) {
                            slider1BubbleValue = '50000';
                            if ($scope.onboarding.plan.planSlab === 'Monthly') {
                                $scope.onboarding.plan.premiumPrice = '79';
                                slider1Odometer.innerHTML = 79;
                            } else {
                                $scope.onboarding.plan.premiumPrice = '790';
                                slider1Odometer.innerHTML = 790;
                            }
                            $scope.onboarding.plan.noOfPremiumAPICalls = '1000000';
                            return '50k';
                        } else
                        if (value >= 20 && value < 25) {
                            slider1BubbleValue = '100000';
                            if ($scope.onboarding.plan.planSlab === 'Monthly') {
                                $scope.onboarding.plan.premiumPrice = '99';
                                slider1Odometer.innerHTML = 99;
                            } else {
                                $scope.onboarding.plan.premiumPrice = '990';
                                slider1Odometer.innerHTML = 990;
                            }
                            $scope.onboarding.plan.noOfPremiumAPICalls = '2000000';
                            return '100k';
                        } else
                        if (value >= 25) {
                            slider1BubbleValue = '100000';
                            return '100k+';
                        } else
                            return slider1BubbleValue;
                    }
                }
            },
            slider2: {
                value: 0,
                options: {
                    floor: 0,
                    ceil: 25,
                    showTicks: 5,
                    showTicksArray: [1, 5, 10, 15, 20, 25],
                    showSelectionBar: true,
                    translate: function (value) {
                        if (value >= 0 && value < 5) {
                            slider2BubbleValue = '5000';
                            if ($scope.onboarding.plan.planSlab === 'Monthly') {
                                $scope.onboarding.plan.expertisePrice = '39';
                                slider2Odometer.innerHTML = 39;
                            } else {
                                $scope.onboarding.plan.expertisePrice = '390';
                                slider2Odometer.innerHTML = 390;
                            }
                            $scope.onboarding.plan.noOfExpertiseAPICalls = '200000';
                            return '5k';
                        } else
                        if (value >= 5 && value < 10) {
                            slider2BubbleValue = '10000';
                            if ($scope.onboarding.plan.planSlab === 'Monthly') {
                                $scope.onboarding.plan.expertisePrice = '59';
                                slider2Odometer.innerHTML = 59;
                            } else {
                                $scope.onboarding.plan.expertisePrice = '590';
                                slider2Odometer.innerHTML = 590;
                            }
                            $scope.onboarding.plan.noOfExpertiseAPICalls = '400000';
                            return '10k';
                        } else
                        if (value >= 10 && value < 15) {
                            slider2BubbleValue = '25000';
                            if ($scope.onboarding.plan.planSlab === 'Monthly') {
                                $scope.onboarding.plan.expertisePrice = '89';
                                slider2Odometer.innerHTML = 89;
                            } else {
                                $scope.onboarding.plan.expertisePrice = '890';
                                slider2Odometer.innerHTML = 890;
                            }
                            $scope.onboarding.plan.noOfExpertiseAPICalls = '1000000';
                            return '25k';
                        } else
                        if (value >= 15 && value < 20) {
                            slider2BubbleValue = '50000';
                            if ($scope.onboarding.plan.planSlab === 'Monthly') {
                                $scope.onboarding.plan.expertisePrice = '119';
                                slider2Odometer.innerHTML = 119;
                            } else {
                                $scope.onboarding.plan.expertisePrice = '1190';
                                slider2Odometer.innerHTML = 1190;
                            }
                            $scope.onboarding.plan.noOfExpertiseAPICalls = '2000000';
                            return '50k';
                        } else
                        if (value >= 20 && value < 25) {
                            slider2BubbleValue = '100000';
                            if ($scope.onboarding.plan.planSlab === 'Monthly') {
                                $scope.onboarding.plan.expertisePrice = '149';
                                slider2Odometer.innerHTML = 149;
                            } else {
                                $scope.onboarding.plan.expertisePrice = '1490';
                                slider2Odometer.innerHTML = 1490;
                            }
                            $scope.onboarding.plan.noOfExpertiseAPICalls = '4000000';
                            return '100k';
                        } else
                        if (value >= 25) {
                            slider2BubbleValue = '100000';

                            return '100k+';
                        } else
                            return slider2BubbleValue;
                    }
                }
            },
            isConfigureClicked: false,
            changePlanSlab: changePlanSlab,
            selectingTab: selectingTab,
            next: next,
            previous: previous,
            checkingUrlExists: checkingUrlExists,
            selectedPlan: selectedPlan
        };
        /*
         * @author: sandeep
         * @created: 07 jan 2017
         * @params: pageNumber(number)
         * @returns: no
         * @purpose: next click function
         */
        function next(pageNumber) {
            $rootScope.engagetoApp.isLoading = true;
            OnboardingService.checkURLExists($scope.onboarding.user.subDomainName).then(function (response) {
                $rootScope.engagetoApp.isLoading = false;
                if (response.data.data.available) {
                    $scope.onboarding.isFirstTabValid = true;
                    $scope.onboarding.steps = pageNumber;
                    $localStorage.steps = pageNumber;
                    if (pageNumber === 2) {
                        $localStorage.user = {
                            firstName: $scope.onboarding.user.firstName,
                            lastName: $scope.onboarding.user.lastName,
                            companyName: $scope.onboarding.user.companyName,
                            subDomainName: $scope.onboarding.user.subDomainName
                        };
                    }
                } else {
                    $scope.onboarding.error.isSubDomainValid = response.data.data.available;
                }
            }, function (error) {
                console.log(error);
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
                    $state.go('landing');
                }
            });

        }
        /*
         * @author: sandeep
         * @created: 07 jan 2017
         * @params: pageNumber(number)
         * @returns: no
         * @purpose: previous click function
         */
        function previous(pageNumber) {
            $scope.onboarding.steps = pageNumber;
            $localStorage.steps = pageNumber;
        }
        /*
         * @author: sandeep
         * @created: 07 jan 2017
         * @return: no
         * @params: no
         * @purpose: checkingUrlExists function
         */
        function checkingUrlExists() {
            if ($scope.onboarding.user.subDomainName !== '') {
                OnboardingService.checkURLExists($scope.onboarding.user.subDomainName).then(function (response) {
                    console.log(response);
                    $scope.onboarding.error.isSubDomainValid = response.data.data.available;
                }, function (error) {
                    console.log(error);
                    if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                        AuthService.revokeAuth();
                        $rootScope.engagetoApp.isAuthenticatedUser = false;
                        $state.go('landing');
                    }
                });
            }
        }
        /*
         * @author: sandeep
         * @created: 21 apr 2017
         * @params: index
         * @return: no
         * @purpose: selectingTab function
         */
        function selectingTab(index) {
            $scope.onboarding.steps = index;
            $localStorage.steps = index;
            if (index === 2) {
                $localStorage.user = {
                    firstName: $scope.onboarding.user.firstName,
                    lastName: $scope.onboarding.user.lastName,
                    companyName: $scope.onboarding.user.companyName,
                    subDomainName: $scope.onboarding.user.subDomainName
                };
            }
        }
        /*
         * @author: sandeep
         * @created: 17 apr 2017
         * @params: no
         * @return: no
         * @purpose: changePlanSlab function
         */
        function changePlanSlab() {
            if ($scope.onboarding.plan.planSlab === 'Monthly' && slider1BubbleValue === '5000') {
                $scope.onboarding.plan.premiumPrice = '19';
                slider1Odometer.innerHTML = 19;
            }
            if ($scope.onboarding.plan.planSlab === 'Monthly' && slider2BubbleValue === '5000') {
                $scope.onboarding.plan.expertisePrice = '39';
                slider2Odometer.innerHTML = 39;
            }
            if ($scope.onboarding.plan.planSlab === 'Monthly' && slider1BubbleValue === '10000') {
                $scope.onboarding.plan.premiumPrice = '29';
                slider1Odometer.innerHTML = 29;
            }
            if ($scope.onboarding.plan.planSlab === 'Monthly' && slider2BubbleValue === '10000') {
                $scope.onboarding.plan.expertisePrice = '59';
                slider2Odometer.innerHTML = 59;
            }
            if ($scope.onboarding.plan.planSlab === 'Monthly' && slider1BubbleValue === '25000') {
                $scope.onboarding.plan.premiumPrice = '49';
                slider1Odometer.innerHTML = 49;
            }
            if ($scope.onboarding.plan.planSlab === 'Monthly' && slider2BubbleValue === '25000') {
                $scope.onboarding.plan.expertisePrice = '89';
                slider2Odometer.innerHTML = 89;
            }
            if ($scope.onboarding.plan.planSlab === 'Monthly' && slider1BubbleValue === '50000') {
                $scope.onboarding.plan.premiumPrice = '79';
                slider1Odometer.innerHTML = 79;
            }
            if ($scope.onboarding.plan.planSlab === 'Monthly' && slider2BubbleValue === '50000') {
                $scope.onboarding.plan.expertisePrice = '119';
                slider2Odometer.innerHTML = 119;
            }
            if ($scope.onboarding.plan.planSlab === 'Monthly' && slider1BubbleValue === '100000') {
                $scope.onboarding.plan.premiumPrice = '99';
                slider1Odometer.innerHTML = 99;
            }
            if ($scope.onboarding.plan.planSlab === 'Monthly' && slider2BubbleValue === '100000') {
                $scope.onboarding.plan.expertisePrice = '149';
                slider2Odometer.innerHTML = 149;
            }
            if ($scope.onboarding.plan.planSlab === 'Annually' && slider1BubbleValue === '5000') {
                $scope.onboarding.plan.premiumPrice = '190';
                slider1Odometer.innerHTML = 190;
            }
            if ($scope.onboarding.plan.planSlab === 'Annually' && slider2BubbleValue === '5000') {
                $scope.onboarding.plan.expertisePrice = '390';
                slider2Odometer.innerHTML = 390;
            }
            if ($scope.onboarding.plan.planSlab === 'Annually' && slider1BubbleValue === '10000') {
                $scope.onboarding.plan.premiumPrice = '290';
                slider1Odometer.innerHTML = 290;
            }
            if ($scope.onboarding.plan.planSlab === 'Annually' && slider2BubbleValue === '10000') {
                $scope.onboarding.plan.expertisePrice = '590';
                slider2Odometer.innerHTML = 590;
            }
            if ($scope.onboarding.plan.planSlab === 'Annually' && slider1BubbleValue === '25000') {
                $scope.onboarding.plan.premiumPrice = '490';
                slider1Odometer.innerHTML = 490;
            }
            if ($scope.onboarding.plan.planSlab === 'Annually' && slider2BubbleValue === '25000') {
                $scope.onboarding.plan.expertisePrice = '890';
                slider2Odometer.innerHTML = 890;
            }
            if ($scope.onboarding.plan.planSlab === 'Annually' && slider1BubbleValue === '50000') {
                $scope.onboarding.plan.premiumPrice = '790';
                slider1Odometer.innerHTML = 790;
            }
            if ($scope.onboarding.plan.planSlab === 'Annually' && slider2BubbleValue === '50000') {
                $scope.onboarding.plan.expertisePrice = '1190';
                slider2Odometer.innerHTML = 1190;
            }
            if ($scope.onboarding.plan.planSlab === 'Annually' && slider1BubbleValue === '100000') {
                $scope.onboarding.plan.premiumPrice = '990';
                slider1Odometer.innerHTML = 990;
            }
            if ($scope.onboarding.plan.planSlab === 'Annually' && slider2BubbleValue === '100000') {
                $scope.onboarding.plan.expertisePrice = '1490';
                slider2Odometer.innerHTML = 1490;
            }
        }
        /*
         * @author: sandeep
         * @created: 17 apr 2017
         * @params: planKey(string)
         * @return: no
         * @purpose: selectedPlan function
         * @modified: 20 apr 2017
         * @modified by: sandeep(removing localStorage values)
         */
        function selectedPlan(planKey) {
            if (!$scope.onboarding.isConfigureClicked) {
                $scope.onboarding.isConfigureClicked = true;
                delete $localStorage.user;
                delete $localStorage.steps;
                var configureObject = {
                    'first_name': $scope.onboarding.user.firstName,
                    'last_name': $scope.onboarding.user.lastName,
                    'company_name': $scope.onboarding.user.companyName,
                    'app_domain': $scope.onboarding.user.subDomainName
                };
                var data = {
                    user_email: $localStorage.user_email,
                    user_id: $localStorage.user_id
                };
                OnboardingService.saveUserConfiguration(configureObject).then(function (response) {
                    NotificationService.getDomainList(data).then(function (response) {
                        var domainList = [], index = -1;
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
                            $rootScope.engagetoApp.profile.domainName = response.data.data[index].domain_referer;
                            $rootScope.engagetoApp.selectedDomainName = response.data.data[index].domain_referer;
                            $rootScope.engagetoApp.selectedDomainName = response.data.data[index].domain_referer;
                            $rootScope.engagetoApp.profile.role = response.data.data[index].role;
                            $localStorage.user_role = response.data.data[index].role;
                        }
                        AuthService.getAccountDetails($localStorage.user_id).then(function (response) {
                            $rootScope.engagetoApp.profile.initial = '';
                            $rootScope.engagetoApp.profile.id = $localStorage.user_id;
                            $rootScope.engagetoApp.profile.email = $localStorage.user_email;
                            $rootScope.engagetoApp.profile.firstName = response.data.data.firstname;
                            $localStorage.firstName = response.data.data.firstname;
                            $rootScope.engagetoApp.profile.lastName = response.data.data.lastname;
                            $localStorage.lastName = response.data.data.lastname;
                            $rootScope.engagetoApp.profile.image = response.data.data.profile_pic;
                            $localStorage.profile_image = response.data.data.profile_pic;
                            if (response.data.data.firstname !== '' || response.data.data.lastname !== '') {
                                response.data.data.firstname !== '' ? $rootScope.engagetoApp.profile.initial += response.data.data.firstname.charAt(0).toUpperCase() : '';
                                response.data.data.lastname !== '' ? $rootScope.engagetoApp.profile.initial += response.data.data.lastname.charAt(0).toUpperCase() : '';
                                $localStorage.initial = $rootScope.engagetoApp.profile.initial;
                            } else {
                                $rootScope.engagetoApp.profile.initial += $localStorage.user_email.charAt(0).toUpperCase();
                                $rootScope.engagetoApp.profile.initial += $localStorage.user_email.charAt(1).toUpperCase();
                                $localStorage.initial = $rootScope.engagetoApp.profile.initial;
                            }
                            if (planKey !== 'Free') {
                                var data = {
                                    success_url: window.location.protocol + '//' + window.location.host + '/#/code-installation',
                                    cancel_url: window.location.protocol + '//' + window.location.host + '/#/code-installation'
                                };
                                AuthService.onPlanSubscription(data, planKey).then(function (planResponse) {
                                    $window.open(planResponse.data.data.url, "_self");
                                }, function (error) {
                                    console.log(error);
                                    if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                                        AuthService.revokeAuth();
                                        $rootScope.engagetoApp.isAuthenticatedUser = false;
                                        $state.go('landing');
                                    }
                                });
                            } else {
                                $state.go('side-nav-template.code-installation');
                            }
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
                }, function (error) {
                    console.log(error);
                    var errorMessage = '';
                    if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                        AuthService.revokeAuth();
                        $rootScope.engagetoApp.isAuthenticatedUser = false;
                        $state.go('landing');
                    }
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
            }
        }
    }
})(window.angular);