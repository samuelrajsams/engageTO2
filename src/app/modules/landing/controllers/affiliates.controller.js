(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('AffiliatesController', affiliatesController);

    affiliatesController.$inject = [
        '$scope',
        'AuthService'
    ];

    function affiliatesController(
            $scope,
            AuthService) {
        //initializing variables
        var planPrice = 0;
        $scope.affiliates = {
            plan: 'STARTUP',
            planSlab: 'Monthly',
            planPrice: (((19 * 20) / 100) * 10),
            salesPerMonth: 10,
            noOfSubscribers: 5000,
            slider: {
                value: 0,
                options: {
                    floor: 0,
                    ceil: 20,
                    showTicks: 5,
                    showTicksArray: [0, 5, 10, 15, 20],
                    showSelectionBar: true,
                    translate: function (value) {
                        if (value >= 0 && value < 5) {
                            $scope.affiliates.noOfSubscribers = 5000;
                            if ($scope.affiliates.planSlab === 'Monthly') {
                                $scope.affiliates.plan === 'STARTUP' ? planPrice = 19 : planPrice = 39;
                            } else {
                                $scope.affiliates.plan === 'STARTUP' ? planPrice = 190 : planPrice = 390;
                            }
                            $scope.affiliates.planPrice = (((planPrice * 20) / 100) * $scope.affiliates.salesPerMonth);
                            return '5000 subscribers';
                        } else
                        if (value >= 5 && value < 10) {
                            $scope.affiliates.noOfSubscribers = 10000;
                            if ($scope.affiliates.planSlab === 'Monthly') {
                                $scope.affiliates.plan === 'STARTUP' ? planPrice = 29 : planPrice = 59;
                            } else {
                                $scope.affiliates.plan === 'STARTUP' ? planPrice = 290 : planPrice = 590;
                            }
                            $scope.affiliates.planPrice = (((planPrice * 20) / 100) * $scope.affiliates.salesPerMonth);
                            return '10000 subscribers';
                        } else
                        if (value >= 10 && value < 15) {
                            $scope.affiliates.noOfSubscribers = 25000;
                            if ($scope.affiliates.planSlab === 'Monthly') {
                                $scope.affiliates.plan === 'STARTUP' ? planPrice = 49 : planPrice = 89;
                            } else {
                                $scope.affiliates.plan === 'STARTUP' ? planPrice = 490 : planPrice = 890;
                            }
                            $scope.affiliates.planPrice = (((planPrice * 20) / 100) * $scope.affiliates.salesPerMonth);
                            return '25000 subscribers';
                        } else
                        if (value >= 15 && value < 20) {
                            $scope.affiliates.noOfSubscribers = 50000;
                            if ($scope.affiliates.planSlab === 'Monthly') {
                                $scope.affiliates.plan === 'STARTUP' ? planPrice = 79 : planPrice = 119;
                            } else {
                                $scope.affiliates.plan === 'STARTUP' ? planPrice = 790 : planPrice = 1190;
                            }
                            $scope.affiliates.planPrice = (((planPrice * 20) / 100) * $scope.affiliates.salesPerMonth);
                            return '50000 subscribers';
                        } else
                        if (value >= 20) {
                            $scope.affiliates.noOfSubscribers = 100000;
                            if ($scope.affiliates.planSlab === 'Monthly') {
                                $scope.affiliates.plan === 'STARTUP' ? planPrice = 99 : planPrice = 149;
                            } else {
                                $scope.affiliates.plan === 'STARTUP' ? planPrice = 990 : planPrice = 1490;
                            }
                            $scope.affiliates.planPrice = (((planPrice * 20) / 100) * $scope.affiliates.salesPerMonth);
                            return '100000 subscribers';
                        } else
                            return $scope.affiliates.noOfSubscribers + ' subscribers';
                    }
                }
            },
            changePlanSlab: changePlanSlab,
            stepUp: stepUp,
            stepDown: stepDown
        };
        console.log($scope.affiliates.planPrice);
        /*
         * @author: sandeep
         * @created: 21 jan 2017
         * @params: no
         * @return: no
         * @purpose: changePlanSlab function
         */
        function changePlanSlab() {
            console.log('changePlanSlab()', $scope.affiliates.noOfSubscribers);
            if ($scope.affiliates.planSlab === 'Monthly' && $scope.affiliates.noOfSubscribers === 5000) {
                $scope.affiliates.plan === 'STARTUP' ? planPrice = 19 : planPrice = 39;
            }
            if ($scope.affiliates.planSlab === 'Monthly' && $scope.affiliates.noOfSubscribers === 10000) {
                $scope.affiliates.plan === 'STARTUP' ? planPrice = 29 : planPrice = 59;
            }
            if ($scope.affiliates.planSlab === 'Monthly' && $scope.affiliates.noOfSubscribers === 25000) {
                $scope.affiliates.plan === 'STARTUP' ? planPrice = 49 : planPrice = 89;
            }
            if ($scope.affiliates.planSlab === 'Monthly' && $scope.affiliates.noOfSubscribers === 50000) {
                $scope.affiliates.plan === 'STARTUP' ? planPrice = 79 : planPrice = 119;
            }
            if ($scope.affiliates.planSlab === 'Monthly' && $scope.affiliates.noOfSubscribers === 100000) {
                $scope.affiliates.plan === 'STARTUP' ? planPrice = 99 : planPrice = 149;
            }
            if ($scope.affiliates.planSlab === 'Yearly' && $scope.affiliates.noOfSubscribers === 5000) {
                $scope.affiliates.plan === 'STARTUP' ? planPrice = 190 : planPrice = 390;
            }
            if ($scope.affiliates.planSlab === 'Yearly' && $scope.affiliates.noOfSubscribers === 10000) {
                $scope.affiliates.plan === 'STARTUP' ? planPrice = 290 : planPrice = 590;
            }
            if ($scope.affiliates.planSlab === 'Yearly' && $scope.affiliates.noOfSubscribers === 25000) {
                $scope.affiliates.plan === 'STARTUP' ? planPrice = 490 : planPrice = 890;
            }
            if ($scope.affiliates.planSlab === 'Yearly' && $scope.affiliates.noOfSubscribers === 50000) {
                $scope.affiliates.plan === 'STARTUP' ? planPrice = 790 : planPrice = 1190;
            }
            if ($scope.affiliates.planSlab === 'Yearly' && $scope.affiliates.noOfSubscribers === 100000) {
                $scope.affiliates.plan === 'STARTUP' ? planPrice = 990 : planPrice = 1490;
            }
            $scope.affiliates.planPrice = (((planPrice * 20) / 100) * $scope.affiliates.salesPerMonth);
            console.log($scope.affiliates.planPrice, planPrice);
        }
        /*
         * @author: sandeep
         * @created: 21 jan 2017
         * @params: no
         * @return: no
         * @purpose: stepUp function
         */
        function stepUp() {
            console.log('stepUp()');
            if ($scope.affiliates.salesPerMonth >= 10)
                $scope.affiliates.salesPerMonth += 10;
            else if ($scope.affiliates.salesPerMonth === 5)
                $scope.affiliates.salesPerMonth = 10;
            else
                $scope.affiliates.salesPerMonth = 5;
            console.log($scope.affiliates.salesPerMonth);
            $scope.affiliates.planPrice = (((planPrice * 20) / 100) * $scope.affiliates.salesPerMonth);
            console.log($scope.affiliates.planPrice, planPrice);
        }
        /*
         * @author: sandeep
         * @created: 21 jan 2017
         * @params: no
         * @return: no
         * @purpose: stepDown function
         */
        function stepDown() {
            console.log('stepDown()');
            if ($scope.affiliates.salesPerMonth > 10)
                $scope.affiliates.salesPerMonth -= 10;
            else if ($scope.affiliates.salesPerMonth === 10)
                $scope.affiliates.salesPerMonth = 5;
            else
                $scope.affiliates.salesPerMonth = 1;
            console.log($scope.affiliates.salesPerMonth);
            $scope.affiliates.planPrice = (((planPrice * 20) / 100) * $scope.affiliates.salesPerMonth);
            console.log($scope.affiliates.planPrice, planPrice);
        }
    }
})(window.angular);