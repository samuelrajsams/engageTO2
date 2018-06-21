(function (angular) {
    'use strict';
    angular
            .module('landing')
            .controller('LandingController', landingController);
    landingController.$inject = [
        '$scope',
        '$rootScope',
        '$timeout',
        '$document',
        'AuthService',
        'EngagetoAppService'
    ];
    function landingController(
            $scope,
            $rootScope,
            $timeout,
            $document,
            AuthService,
            EngagetoAppService) {
        //initializing slider variables
        var slider1BubbleValue = '5000', slider2BubbleValue = '5000';
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
        //initializing landing variables
        $scope.landing = {
            noWrapSlides: false,
            active: 0,
            engageto: {
                email: '',
                webSiteUrl: '',
                success: '',
                danger: '',
                domain_id: ''
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
                            if ($scope.landing.plan.planSlab === 'Monthly') {
                                $scope.landing.plan.premiumPrice = '19';
                                slider1Odometer.innerHTML = 19;
                            } else {
                                $scope.landing.plan.premiumPrice = '190';
                                slider1Odometer.innerHTML = 190;
                            }
                            $scope.landing.plan.noOfPremiumAPICalls = '100000';
                            return '5k';
                        } else
                        if (value >= 5 && value < 10) {
                            slider1BubbleValue = '10000';
                            if ($scope.landing.plan.planSlab === 'Monthly') {
                                $scope.landing.plan.premiumPrice = '29';
                                slider1Odometer.innerHTML = 29;
                            } else {
                                $scope.landing.plan.premiumPrice = '290';
                                slider1Odometer.innerHTML = 290;
                            }
                            $scope.landing.plan.noOfPremiumAPICalls = '200000';
                            return '10k';
                        } else
                        if (value >= 10 && value < 15) {
                            slider1BubbleValue = '25000';
                            if ($scope.landing.plan.planSlab === 'Monthly') {
                                $scope.landing.plan.premiumPrice = '49';
                                slider1Odometer.innerHTML = 49;
                            } else {
                                $scope.landing.plan.premiumPrice = '490';
                                slider1Odometer.innerHTML = 490;
                            }
                            $scope.landing.plan.noOfPremiumAPICalls = '500000';
                            return '25k';
                        } else
                        if (value >= 15 && value < 20) {
                            slider1BubbleValue = '50000';
                            if ($scope.landing.plan.planSlab === 'Monthly') {
                                $scope.landing.plan.premiumPrice = '79';
                                slider1Odometer.innerHTML = 79;
                            } else {
                                $scope.landing.plan.premiumPrice = '790';
                                slider1Odometer.innerHTML = 790;
                            }
                            $scope.landing.plan.noOfPremiumAPICalls = '1000000';
                            return '50k';
                        } else
                        if (value >= 20 && value < 25) {
                            slider1BubbleValue = '100000';
                            if ($scope.landing.plan.planSlab === 'Monthly') {
                                $scope.landing.plan.premiumPrice = '99';
                                slider1Odometer.innerHTML = 99;
                            } else {
                                $scope.landing.plan.premiumPrice = '990';
                                slider1Odometer.innerHTML = 990;
                            }
                            $scope.landing.plan.noOfPremiumAPICalls = '2000000';
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
                            if ($scope.landing.plan.planSlab === 'Monthly') {
                                $scope.landing.plan.expertisePrice = '39';
                                slider2Odometer.innerHTML = 39;
                            } else {
                                $scope.landing.plan.expertisePrice = '390';
                                slider2Odometer.innerHTML = 390;
                            }
                            $scope.landing.plan.noOfExpertiseAPICalls = '200000';
                            return '5k';
                        } else
                        if (value >= 5 && value < 10) {
                            slider2BubbleValue = '10000';
                            if ($scope.landing.plan.planSlab === 'Monthly') {
                                $scope.landing.plan.expertisePrice = '59';
                                slider2Odometer.innerHTML = 59;
                            } else {
                                $scope.landing.plan.expertisePrice = '590';
                                slider2Odometer.innerHTML = 590;
                            }
                            $scope.landing.plan.noOfExpertiseAPICalls = '400000';
                            return '10k';
                        } else
                        if (value >= 10 && value < 15) {
                            slider2BubbleValue = '25000';
                            if ($scope.landing.plan.planSlab === 'Monthly') {
                                $scope.landing.plan.expertisePrice = '89';
                                slider2Odometer.innerHTML = 89;
                            } else {
                                $scope.landing.plan.expertisePrice = '890';
                                slider2Odometer.innerHTML = 890;
                            }
                            $scope.landing.plan.noOfExpertiseAPICalls = '1000000';
                            return '25k';
                        } else
                        if (value >= 15 && value < 20) {
                            slider2BubbleValue = '50000';
                            if ($scope.landing.plan.planSlab === 'Monthly') {
                                $scope.landing.plan.expertisePrice = '119';
                                slider2Odometer.innerHTML = 119;
                            } else {
                                $scope.landing.plan.expertisePrice = '1190';
                                slider2Odometer.innerHTML = 1190;
                            }
                            $scope.landing.plan.noOfExpertiseAPICalls = '2000000';
                            return '50k';
                        } else
                        if (value >= 20 && value < 25) {
                            slider2BubbleValue = '100000';
                            if ($scope.landing.plan.planSlab === 'Monthly') {
                                $scope.landing.plan.expertisePrice = '149';
                                slider2Odometer.innerHTML = 149;
                            } else {
                                $scope.landing.plan.expertisePrice = '1490';
                                slider2Odometer.innerHTML = 1490;
                            }
                            $scope.landing.plan.noOfExpertiseAPICalls = '4000000';
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
            changePlanSlab: changePlanSlab,
            load: false,
            goToFormSubmit: goToFormSubmit,
            selectingPlan: selectingPlan
        };

        //scroll to why notification part
        if ($rootScope.engagetoApp.isGoToLandingClicked) {
            var someElement = angular.element(document.getElementById('how-it-works-custom'));
            $document.scrollToElementAnimated(someElement);
        }

        /*
         * @author: sandeep
         * @created: 05 apr 2017
         * @params: no
         * @return: no
         * @purpose: engageto to customer
         */
        $scope.engageto = function () {
            $rootScope.engagetoApp.isLoading = true;
            var data = {
                domain_address: $scope.landing.engageto.webSiteUrl,
                user_email: $scope.landing.engageto.email
            };
            AuthService.register(data).then(function (response) {
                EngagetoAppService.showSuccessMessage('Confirm your email address. A confirmation email has been sent to ' + $scope.landing.engageto.email + '. Click on the confirmation link to activate your account');
                $scope.engagetoForm.$setPristine();
                $scope.engagetoForm.$setUntouched();
                $scope.landing.engageto.email = '';
                $scope.landing.engageto.webSiteUrl = '';
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
                EngagetoAppService.showErrorMessage(errorMessage);
                $rootScope.engagetoApp.isLoading = false;
            });
        };

        //remove authentication failure msg
        $timeout(function () {
            $rootScope.engagetoApp.isAuthenticatedUser = true;
        }, 5000);

        /*
         * @author: sandeep
         * @created: 03 apr 2017
         * @params: no
         * @return: no
         * @purpose: goToFormSubmit function
         */
        function goToFormSubmit() {
            var someElement = angular.element(document.getElementById('engageto-form-submit'));
            $document.scrollToElementAnimated(someElement);
        }
        /*
         * @author: sandeep
         * @created: 06 apr 2017
         * @params: no
         * @return: no
         * @purpose: selectingPlan function
         */
        function selectingPlan(planKey) {
            if ($scope.landing.slider.isPlanSelected) {
                $scope.engageto();
            } else {
                var someElement;
                console.log('Plan: ', planKey);
                $scope.landing.slider.isPlanSelected = !$scope.landing.slider.isPlanSelected;
                if (planKey === 'startup' || planKey === 'premium' || planKey === 'expertise') {
                    someElement = angular.element(document.getElementById('engageto-form-submit'));
                } else {
                    someElement = angular.element(document.getElementById('pricing-tab-index'));
                }
                $document.scrollToElementAnimated(someElement);
            }
        }

        /*
         * @author: sandeep
         * @created: 05 apr 2017
         * @params: no
         * @return: no
         * @purpose: changePlanSlab function
         */
        function changePlanSlab() {
            console.log($scope.landing.plan.planSlab, slider1BubbleValue, slider2BubbleValue);
            if ($scope.landing.plan.planSlab === 'Monthly' && slider1BubbleValue === '5000'){
                $scope.landing.plan.premiumPrice = '19';
                slider1Odometer.innerHTML = 19;
            }
            if ($scope.landing.plan.planSlab === 'Monthly' && slider2BubbleValue === '5000'){
                $scope.landing.plan.expertisePrice = '39';
                slider2Odometer.innerHTML = 39;
            }
            if ($scope.landing.plan.planSlab === 'Monthly' && slider1BubbleValue === '10000'){
                $scope.landing.plan.premiumPrice = '29';
                slider1Odometer.innerHTML = 29;
            }
            if ($scope.landing.plan.planSlab === 'Monthly' && slider2BubbleValue === '10000'){
                $scope.landing.plan.expertisePrice = '59';
                slider2Odometer.innerHTML = 59;
            }
            if ($scope.landing.plan.planSlab === 'Monthly' && slider1BubbleValue === '25000'){
                $scope.landing.plan.premiumPrice = '49';
                slider1Odometer.innerHTML = 49;
            }
            if ($scope.landing.plan.planSlab === 'Monthly' && slider2BubbleValue === '25000'){
                $scope.landing.plan.expertisePrice = '89';
                slider2Odometer.innerHTML = 89;
            }
            if ($scope.landing.plan.planSlab === 'Monthly' && slider1BubbleValue === '50000'){
                $scope.landing.plan.premiumPrice = '79';
                slider1Odometer.innerHTML = 79;
            }
            if ($scope.landing.plan.planSlab === 'Monthly' && slider2BubbleValue === '50000'){
                $scope.landing.plan.expertisePrice = '119';
                slider2Odometer.innerHTML = 119;
            }
            if ($scope.landing.plan.planSlab === 'Monthly' && slider1BubbleValue === '100000'){
                $scope.landing.plan.premiumPrice = '99';
                slider1Odometer.innerHTML = 99;
            }
            if ($scope.landing.plan.planSlab === 'Monthly' && slider2BubbleValue === '100000'){
                $scope.landing.plan.expertisePrice = '149';
                slider2Odometer.innerHTML = 149;
            }
            if ($scope.landing.plan.planSlab === 'Yearly' && slider1BubbleValue === '5000'){
                $scope.landing.plan.premiumPrice = '190';
                slider1Odometer.innerHTML = 190;
            }
            if ($scope.landing.plan.planSlab === 'Yearly' && slider2BubbleValue === '5000'){
                $scope.landing.plan.expertisePrice = '390';
                slider2Odometer.innerHTML = 390;
            }
            if ($scope.landing.plan.planSlab === 'Yearly' && slider1BubbleValue === '10000'){
                $scope.landing.plan.premiumPrice = '290';
                slider1Odometer.innerHTML = 290;
            }
            if ($scope.landing.plan.planSlab === 'Yearly' && slider2BubbleValue === '10000'){
                $scope.landing.plan.expertisePrice = '590';
                slider2Odometer.innerHTML = 590;
            }
            if ($scope.landing.plan.planSlab === 'Yearly' && slider1BubbleValue === '25000'){
                $scope.landing.plan.premiumPrice = '490';
                slider1Odometer.innerHTML = 490;
            }
            if ($scope.landing.plan.planSlab === 'Yearly' && slider2BubbleValue === '25000'){
                $scope.landing.plan.expertisePrice = '890';
                slider2Odometer.innerHTML = 890;
            }
            if ($scope.landing.plan.planSlab === 'Yearly' && slider1BubbleValue === '50000'){
                $scope.landing.plan.premiumPrice = '790';
                slider1Odometer.innerHTML = 790;
            }
            if ($scope.landing.plan.planSlab === 'Yearly' && slider2BubbleValue === '50000'){
                $scope.landing.plan.expertisePrice = '1190';
                slider2Odometer.innerHTML = 1190;
            }
            if ($scope.landing.plan.planSlab === 'Yearly' && slider1BubbleValue === '100000'){
                $scope.landing.plan.premiumPrice = '990';
                slider1Odometer.innerHTML = 990;
            }
            if ($scope.landing.plan.planSlab === 'Yearly' && slider2BubbleValue === '100000'){
                $scope.landing.plan.expertisePrice = '1490';
                slider2Odometer.innerHTML = 1490;
            }
        }
        // Script for Customized Carousel
        $(document).ready(function () {
            var windowWidth = window.innerWidth;
            if (windowWidth >= 320 && windowWidth <= 705) {
                $('.slider1').bxSlider({
                    slideWidth: 320,
                    minSlides: 2,
                    maxSlides: 2,
                    slideMargin: 10,
                    prevText: '<span class="fa fa-angle-left"></span>',
                    nextText: '<span class="fa fa-angle-right"></span>'
                });
            }
            else if (windowWidth >= 706 && windowWidth <= 991) {
                $('.slider1').bxSlider({
                    slideWidth: 230,
                    minSlides: 3,
                    maxSlides: 3,
                    slideMargin: 10,
                    prevText: '<span class="fa fa-angle-left"></span>',
                    nextText: '<span class="fa fa-angle-right"></span>'
                });
            }
            else if (windowWidth >= 992 && windowWidth <= 1199) {
                $('.slider1').bxSlider({
                    slideWidth: 225,
                    minSlides: 2,
                    maxSlides: 4,
                    slideMargin: 10,
                    prevText: '<span class="fa fa-angle-left"></span>',
                    nextText: '<span class="fa fa-angle-right"></span>'
                });
            }
            else if (windowWidth >= 1200) {
                $('.slider1').bxSlider({
                    slideWidth: 275,
                    minSlides: 2,
                    maxSlides: 4,
                    slideMargin: 10,
                    prevText: '<span class="fa fa-angle-left"></span>',
                    nextText: '<span class="fa fa-angle-right"></span>'
                });
            }
        });
          /*
         * @author: anurag
         * @created: 12 sept 2017
         * @params: 
         * @return: 
         * @purpose:  get landing page info - notification sent, subscibers
         */
        AuthService.getLandingPageInfo().then(function(response){
            $scope.totalNotificationSent=response.data.data.total_notifications;
            $scope.totalSubscribers=response.data.data.total_subscribers;
            $scope.totalDeviceRegistered=response.data.data.total_devices_registered;
        },function(error){
            console.log(error);
        });
    }
})(window.angular);
