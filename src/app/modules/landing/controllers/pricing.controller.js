(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('PricingController', pricingController);

    pricingController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService',
        '$state',
        '$q',
        '$document',
        '$stateParams'
    ];

    function pricingController(
            $scope,
            $rootScope,
            AuthService,
            $state,
            $q,
            $document,
            $stateParams) {
        console.log('Pricing Controller ');
        $rootScope.engagetoApp.isPageLoading = false;
//        if ($stateParams.email !== '') {
//            var someElement = angular.element(document.getElementById('pricing-plan-nav-custom'));
//            $document.scrollToElementAnimated(someElement);
//        }
//        $scope.pricing = {
//            activeTab: 1,
//            planSlab: 'Monthly',
//            sliderBubbleValue: '5000',
//            premiumPrice: '19',
//            noOfPremiumAPICalls: '100000',
//            expertisePrice: '39',
//            noOfExpertiseAPICalls: '200000',
//            isPlanSelected: false,
//            isSliderValueExceded: false,
//            playKey: 'x',
//            noOfSubscribers: 'y',
//            slider: {
//                value: 0,
//                options: {
//                    floor: 0,
//                    ceil: 25,
//                    showTicks: 5,
//                    showTicksArray: [1, 5, 10, 15, 20, 25],
//                    showSelectionBar: true,
//                    translate: function (value) {
//                        if (value >= 0 && value < 5) {
//                            $scope.pricing.sliderBubbleValue = '5000';
//                            $scope.pricing.isSliderValueExceded = false;
//                            if ($scope.pricing.planSlab === 'Monthly') {
//                                $scope.pricing.premiumPrice = '19';
//                                $scope.pricing.expertisePrice = '39';
//                            } else {
//                                $scope.pricing.premiumPrice = '190';
//                                $scope.pricing.expertisePrice = '390';
//                            }
//                            $scope.pricing.noOfPremiumAPICalls = '100000';
//                            $scope.pricing.noOfExpertiseAPICalls = '200000';
//                            return '';
//                        } else
//                        if (value >= 5 && value < 10) {
//                            $scope.pricing.isSliderValueExceded = false;
//                            $scope.pricing.sliderBubbleValue = '10000';
//                            if ($scope.pricing.planSlab === 'Monthly') {
//                                $scope.pricing.premiumPrice = '29';
//                                $scope.pricing.expertisePrice = '59';
//                            } else {
//                                $scope.pricing.premiumPrice = '290';
//                                $scope.pricing.expertisePrice = '590';
//                            }
//                            $scope.pricing.noOfPremiumAPICalls = '200000';
//                            $scope.pricing.noOfExpertiseAPICalls = '400000';
//                            return '';
//                        } else
//                        if (value >= 10 && value < 15) {
//                            $scope.pricing.sliderBubbleValue = '25000';
//                            $scope.pricing.isSliderValueExceded = false;
//                            if ($scope.pricing.planSlab === 'Monthly') {
//                                $scope.pricing.premiumPrice = '49';
//                                $scope.pricing.expertisePrice = '89';
//                            } else {
//                                $scope.pricing.premiumPrice = '490';
//                                $scope.pricing.expertisePrice = '890';
//                            }
//                            $scope.pricing.noOfPremiumAPICalls = '500000';
//                            $scope.pricing.noOfExpertiseAPICalls = '1000000';
//                            return '';
//                        } else
//                        if (value >= 15 && value < 20) {
//                            $scope.pricing.sliderBubbleValue = '50000';
//                            $scope.pricing.isSliderValueExceded = false;
//                            if ($scope.pricing.planSlab === 'Monthly') {
//                                $scope.pricing.premiumPrice = '79';
//                                $scope.pricing.expertisePrice = '119';
//                            } else {
//                                $scope.pricing.premiumPrice = '790';
//                                $scope.pricing.expertisePrice = '1190';
//                            }
//                            $scope.pricing.noOfPremiumAPICalls = '1000000';
//                            $scope.pricing.noOfExpertiseAPICalls = '2000000';
//                            return '';
//                        } else
//                        if (value >= 20 && value < 25) {
//                            $scope.pricing.sliderBubbleValue = '100000';
//                            $scope.pricing.isSliderValueExceded = false;
//                            if ($scope.pricing.planSlab === 'Monthly') {
//                                $scope.pricing.premiumPrice = '99';
//                                $scope.pricing.expertisePrice = '149';
//                            } else {
//                                $scope.pricing.premiumPrice = '990';
//                                $scope.pricing.expertisePrice = '1490';
//                            }
//                            $scope.pricing.noOfPremiumAPICalls = '2000000';
//                            $scope.pricing.noOfExpertiseAPICalls = '4000000';
//                            return '';
//                        } else
//                        if (value >= 25) {
//                            $scope.pricing.sliderBubbleValue = '100000';
//                            $scope.pricing.isSliderValueExceded = true;
//                            return '';
//                        }
//                    }
//                }
//            },
//            engageto: {
//                email: '',
//                webSiteUrl: '',
//                success: '',
//                danger: '',
//                domain_id: ''
//            },
//            load: false,
//            authenticationRequired: false,
//            selectedPlan: selectedPlan,
//            changePlanSlab: changePlanSlab,
//            goToOnboarding: goToOnboarding
//        };

        /*
         * @author: sandeep
         * @created: 06 jan 2017
         * @params: planKey(string)
         * @returns: no
         * @purpose: selected plan
         */
//        function selectedPlan(planKey) {
//            console.log('Plan Key: ', planKey, $scope.pricing.sliderBubbleValue);
//            if (planKey !== 'NO') {
//                $scope.pricing.isPlanSelected = true;
//            } else {
//                $scope.pricing.isPlanSelected = false;
//            }
//        }
        /*
         * @author: sandeep
         * @created: 06 jan 2017
         * @params: no
         * @return: no
         * @purpose: changePlanSlab function
         */
//        function changePlanSlab() {
//            console.log('changePlanSlab()', $scope.pricing.planSlab);
//            if ($scope.pricing.planSlab === 'Monthly' && $scope.pricing.sliderBubbleValue === '5000') {
//                $scope.pricing.premiumPrice = '19';
//                $scope.pricing.expertisePrice = '39';
//            }
//            if ($scope.pricing.planSlab === 'Monthly' && $scope.pricing.sliderBubbleValue === '10000') {
//                $scope.pricing.premiumPrice = '29';
//                $scope.pricing.expertisePrice = '59';
//            }
//            if ($scope.pricing.planSlab === 'Monthly' && $scope.pricing.sliderBubbleValue === '25000') {
//                $scope.pricing.premiumPrice = '49';
//                $scope.pricing.expertisePrice = '89';
//            }
//            if ($scope.pricing.planSlab === 'Monthly' && $scope.pricing.sliderBubbleValue === '50000') {
//                $scope.pricing.premiumPrice = '79';
//                $scope.pricing.expertisePrice = '119';
//            }
//            if ($scope.pricing.planSlab === 'Monthly' && $scope.pricing.sliderBubbleValue === '100000') {
//                $scope.pricing.premiumPrice = '99';
//                $scope.pricing.expertisePrice = '149';
//            }
//            if ($scope.pricing.planSlab === 'Yearly' && $scope.pricing.sliderBubbleValue === '5000') {
//                $scope.pricing.premiumPrice = '190';
//                $scope.pricing.expertisePrice = '390';
//            }
//            if ($scope.pricing.planSlab === 'Yearly' && $scope.pricing.sliderBubbleValue === '10000') {
//                $scope.pricing.premiumPrice = '290';
//                $scope.pricing.expertisePrice = '590';
//            }
//            if ($scope.pricing.planSlab === 'Yearly' && $scope.pricing.sliderBubbleValue === '25000') {
//                $scope.pricing.premiumPrice = '490';
//                $scope.pricing.expertisePrice = '890';
//            }
//            if ($scope.pricing.planSlab === 'Yearly' && $scope.pricing.sliderBubbleValue === '50000') {
//                $scope.pricing.premiumPrice = '790';
//                $scope.pricing.expertisePrice = '1190';
//            }
//            if ($scope.pricing.planSlab === 'Yearly' && $scope.pricing.sliderBubbleValue === '100000') {
//                $scope.pricing.premiumPrice = '990';
//                $scope.pricing.expertisePrice = '1490';
//            }
//        }
        /*
         * @author: sandeep
         * @created: 07 apr 2017
         * @params: no
         * @return: no
         * @purpose: goToOnboarding function
         */
//        function goToOnboarding() {
//            console.log('goToOnboarding()');
//            $state.go('getting-started', {'newLogin': $stateParams.newLogin, 'subDomain': $stateParams.subDomain, 'domainAddress': $stateParams.domainAddress, 'isDomainValid': $stateParams.isDomainValid});
//        }
    }
})(window.angular);