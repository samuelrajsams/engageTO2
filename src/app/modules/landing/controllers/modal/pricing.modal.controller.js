(function (angular) {
    'use strict';

    angular
            .module('notification')
            .controller('PricingModalController', pricingModalController);

    pricingModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'stateName',
        'AuthService',
        '$window'
    ];

    function pricingModalController(
            $scope,
            $rootScope,
            $uibModalInstance,
            stateName,
            AuthService,
            $window) {
        $scope.pricing = {
            activeTab: 0,
            premium: {
                planSlab: 'Monthly',
                premiumPrice: '19',
                noOfPremiumAPICalls: '100000',
                noOfSubscribers: '5000',
                isPlanSelected: false
            },
            expertise: {
                planSlab: 'Monthly',
                expertisePrice: '39',
                noOfExpertiseAPICalls: '200000',
                noOfSubscribers: '5000',
                isPlanSelected: false
            },
            enterprise: {
                name: '',
                email: '',
                mobile: '',
                message: ''
            },
            changePlanSlab: changePlanSlab,
            onChangeTab: onChangeTab,
            selectedPlan: selectedPlan,
            onFormSubmit: onFormSubmit,
            close: close
        };

        /*
         * @author: sandeep
         * @created: 26 apr 2017
         * @params: no
         * @return: no
         * @purpose: changePlanSlab function
         */
        function changePlanSlab() {
            console.log($scope.pricing.premium.planSlab, $scope.pricing.expertise.planSlab);
            console.log($scope.pricing.premium.noOfSubscribers, $scope.pricing.expertise.noOfSubscribers);
            if ($scope.pricing.premium.planSlab === 'Monthly' && $scope.pricing.premium.noOfSubscribers === '5000') {
                $scope.pricing.premium.premiumPrice = '19';
                document.querySelector('.premium-price').innerHTML = 19;
            }
            if ($scope.pricing.expertise.planSlab === 'Monthly' && $scope.pricing.expertise.noOfSubscribers === '5000') {
                $scope.pricing.expertise.expertisePrice = '39';
                document.querySelector('.expertise-price').innerHTML = 39;
            }
            if ($scope.pricing.premium.planSlab === 'Monthly' && $scope.pricing.premium.noOfSubscribers === '10000') {
                $scope.pricing.premium.premiumPrice = '29';
                document.querySelector('.premium-price').innerHTML = 29;
            }
            if ($scope.pricing.expertise.planSlab === 'Monthly' && $scope.pricing.expertise.noOfSubscribers === '10000') {
                $scope.pricing.expertise.expertisePrice = '59';
                document.querySelector('.expertise-price').innerHTML = 59;
            }
            if ($scope.pricing.premium.planSlab === 'Monthly' && $scope.pricing.premium.noOfSubscribers === '25000') {
                $scope.pricing.premium.premiumPrice = '49';
                document.querySelector('.premium-price').innerHTML = 49;
            }
            if ($scope.pricing.expertise.planSlab === 'Monthly' && $scope.pricing.expertise.noOfSubscribers === '25000') {
                $scope.pricing.expertise.expertisePrice = '89';
                document.querySelector('.expertise-price').innerHTML = 89;
            }
            if ($scope.pricing.premium.planSlab === 'Monthly' && $scope.pricing.premium.noOfSubscribers === '50000') {
                $scope.pricing.premium.premiumPrice = '79';
                document.querySelector('.premium-price').innerHTML = 79;
            }
            if ($scope.pricing.expertise.planSlab === 'Monthly' && $scope.pricing.expertise.noOfSubscribers === '50000') {
                $scope.pricing.expertise.expertisePrice = '119';
                document.querySelector('.expertise-price').innerHTML = 119;
            }
            if ($scope.pricing.premium.planSlab === 'Monthly' && $scope.pricing.premium.noOfSubscribers === '100000') {
                $scope.pricing.premium.premiumPrice = '99';
                document.querySelector('.premium-price').innerHTML = 99;
            }
            if ($scope.pricing.expertise.planSlab === 'Monthly' && $scope.pricing.expertise.noOfSubscribers === '100000') {
                $scope.pricing.expertise.expertisePrice = '149';
                document.querySelector('.expertise-price').innerHTML = 149;
            }
            if ($scope.pricing.premium.planSlab === 'Yearly' && $scope.pricing.premium.noOfSubscribers === '5000') {
                $scope.pricing.premium.premiumPrice = '190';
                document.querySelector('.premium-price').innerHTML = 190;
            }
            if ($scope.pricing.expertise.planSlab === 'Yearly' && $scope.pricing.expertise.noOfSubscribers === '5000') {
                $scope.pricing.expertise.expertisePrice = '390';
                document.querySelector('.expertise-price').innerHTML = 390;
            }
            if ($scope.pricing.premium.planSlab === 'Yearly' && $scope.pricing.premium.noOfSubscribers === '10000') {
                $scope.pricing.premium.premiumPrice = '290';
                document.querySelector('.premium-price').innerHTML = 290;
            }
            if ($scope.pricing.expertise.planSlab === 'Yearly' && $scope.pricing.expertise.noOfSubscribers === '10000') {
                $scope.pricing.expertise.expertisePrice = '590';
                document.querySelector('.expertise-price').innerHTML = 590;
            }
            if ($scope.pricing.premium.planSlab === 'Yearly' && $scope.pricing.premium.noOfSubscribers === '25000') {
                $scope.pricing.premium.premiumPrice = '490';
                document.querySelector('.premium-price').innerHTML = 490;
            }
            if ($scope.pricing.expertise.planSlab === 'Yearly' && $scope.pricing.expertise.noOfSubscribers === '25000') {
                $scope.pricing.expertise.expertisePrice = '890';
                document.querySelector('.expertise-price').innerHTML = 890;
            }
            if ($scope.pricing.premium.planSlab === 'Yearly' && $scope.pricing.premium.noOfSubscribers === '50000') {
                $scope.pricing.premium.premiumPrice = '790';
                document.querySelector('.premium-price').innerHTML = 790;
            }
            if ($scope.pricing.expertise.planSlab === 'Yearly' && $scope.pricing.expertise.noOfSubscribers === '50000') {
                $scope.pricing.expertise.expertisePrice = '1190';
                document.querySelector('.expertise-price').innerHTML = 1190;
            }
            if ($scope.pricing.premium.planSlab === 'Yearly' && $scope.pricing.premium.noOfSubscribers === '100000') {
                $scope.pricing.premium.premiumPrice = '990';
                document.querySelector('.premium-price').innerHTML = 990;
            }
            if ($scope.pricing.expertise.planSlab === 'Yearly' && $scope.pricing.expertise.noOfSubscribers === '100000') {
                $scope.pricing.expertise.expertisePrice = '1490';
                document.querySelector('.expertise-price').innerHTML = 1490;
            }
        }

        /*
         * @author: sandeep
         * @created: 26 apr 2017
         * @params: no
         * @return: no
         * @purpose: onChangeTab function
         */
        function onChangeTab() {
            console.log(document.querySelector('.expertise-price'));
            var sliderOdometer = document.querySelector('.expertise-price');
            new Odometer({
                el: sliderOdometer,
                value: 39
            });
        }

        /*
         * @author: sandeep
         * @created: 26 apr 2017
         * @params: planKey(string)
         * @return: no
         * @purpose: selectedPlan function
         */
        function selectedPlan(planKey) {
            console.log(planKey, stateName);
            var data = {
              success_url: '',
              cancel_url: ''
            };
            if (stateName === 'Domain') {
                data.success_url = window.location.protocol + '//' + window.location.host + '/#/app/domain-management';
                data.cancel_url = window.location.protocol + '//' + window.location.host + '/#/app/domain-management';
            } else if (stateName === 'Team') {
                data.success_url = window.location.protocol + '//' + window.location.host + '/#/app/team-management';
                data.cancel_url = window.location.protocol + '//' + window.location.host + '/#/app/team-management';
            } else if (stateName === 'Profile') {
                data.success_url = window.location.protocol + '//' + window.location.host + '/#/app/account-settings';
                data.cancel_url = window.location.protocol + '//' + window.location.host + '/#/app/account-settings';
            }
            AuthService.onPlanSubscription(data, planKey).then(function(response){
                console.log(response);
                $window.open(response.data.data.url, '_self');
            }, function(error){
                console.log(error);
                $uibModalInstance.dismiss('failedEmail');
            });            
        }

        /*
         * @author: sandeep
         * @created: 27 apr 2017
         * @params: no
         * @return: no
         * @purpose: onFormSubmit function
         */
        function onFormSubmit() {
            var data = {
                name: $scope.pricing.enterprise.name,
                email: $scope.pricing.enterprise.email,
                mobile: $scope.pricing.enterprise.mobile,
                message: $scope.pricing.enterprise.message
            };
            console.log(data);
//            AuthService.onSubmitPricingForm(data).then(function(response){
//                console.log(response);
//                $uibModalInstance.close('successEmail');
//            }, function(error){
//                console.log(error);
//                $uibModalInstance.dismiss('failedEmail');
//            });
        }
        /*
         * @author: sandeep
         * @created: 26 apr 2017
         * @params: no
         * @return: no
         * @purpose: close function
         */
        function close() {
            $uibModalInstance.close('close');
        }
    }
})(window.angular);