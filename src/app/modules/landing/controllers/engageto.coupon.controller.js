(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('EngagetoCouponController', engagetoCouponController);

    engagetoCouponController.$inject = [
        '$scope',
        '$timeout'
    ];

    function engagetoCouponController(
            $scope,
            $timeout) {
        //initializing variables
        $scope.coupon = {
            copyCode: 'PUSH15OFF',
            successMessage: '',
            errorMessage: '',
            onSuccess: onSuccess,
            onError: onError
        };
        /*
         * @author:sandeep
         * @created: 20 jan 2017
         * @params: no
         * @return: no
         * @purpose: on success function
         */
        function onSuccess(event) {
            $scope.coupon.successMessage = 'Coupon Code Copied!';
            $timeout(function () {
                $scope.coupon.successMessage = '';
            }, 2000);
        }
        /*
         * @author:sandeep
         * @created: 20 jan 2017
         * @params: no
         * @return: no
         * @purpose: on error function
         */
        function onError(event) {
            $scope.coupon.errorMessage = 'Error in copying Coupon Code!';
            $timeout(function () {
                $scope.coupon.errorMessage = '';
            }, 2000);
        }
    }
})(window.angular);