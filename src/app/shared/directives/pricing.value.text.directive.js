(function (angular, ApplicationConfiguration) {
    'use strict';

    angular
            .module(ApplicationConfiguration.applicationModuleName)
            .directive('pricingValueText', pricingValueTextDirective);

    pricingValueTextDirective.$inject = [];

    function pricingValueTextDirective() {
        return {
            replace: 'true',
            restrict: 'E',
            template: '<h3 class="package-price premium-price" ng-show="pricing.activeTab === 0"></h3>',
            link: pricingValueTextLink
        };

        function pricingValueTextLink(scope, iElement, iAttrs) {
            var sliderOdometer = document.querySelector('.premium-price');
            new Odometer({
                el: sliderOdometer,
                value: 19
            });
        }
    }
})(window.angular, window.ApplicationConfiguration);