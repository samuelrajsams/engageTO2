(function (angular, ApplicationConfiguration) {

    'use strict';

    angular
            .module(ApplicationConfiguration.applicationModuleName)
            .directive('clickAndDisable', clickAndDisable);
    clickAndDisable.$inject = [
    ];
    function clickAndDisable() {
        console.log("clickAndDisable");
        return {
            scope: {
                clickAndDisable: '&'
            },
            link: function (scope, iElement, iAttrs) {
                iElement.bind('click', function () {
                    iElement.prop('disabled', true);
                    scope.clickAndDisable().finally(function () {
                        iElement.prop('disabled', false);
                    })
                });
            }
        };
    }

})(window.angular, window.ApplicationConfiguration);
