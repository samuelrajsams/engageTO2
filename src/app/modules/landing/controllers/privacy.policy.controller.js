(function (angular) {
    'use strict';

    angular
            .module('landing')
            .controller('PrivacyPolicyController', privacyPolicyController);

    privacyPolicyController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService',
        'PrivacyPolicyConstant'
    ];

    function privacyPolicyController(
            $scope,
            $rootScope,
            AuthService,
            PrivacyPolicyConstant) {
        $rootScope.engagetoApp.isPageLoading = false;
        //initializing variables
        $scope.privacyPolicy = {
            oneAtTime: true,
            rules: PrivacyPolicyConstant
        };

    }
})(window.angular);