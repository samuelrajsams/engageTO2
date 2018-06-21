(function (angular) {
    'use strict';
    angular
            .module('smartSegmentation')
            .directive('autocompleteCity', autocompleteCityDirective);
    autocompleteCityDirective.$inject = [
        'SmartSegmentationService',
        '$timeout'
    ];
    function autocompleteCityDirective(
            SmartSegmentationService,
            $timeout) {
        return {
            restrict: 'A',
            link: autocompleteCityDirectiveLink
        };
        function autocompleteCityDirectiveLink(scope, element, attr) {
            //keypress event on fields
            element.on('keypress', function () {
                var index = attr.id.split('-').pop();
                $timeout(function () {
                    var param = scope.newSmartSegment.criterias[index].selectedCities;
                    param !== '' && param.length > 2 ? SmartSegmentationService.getCitiesByParam(param).then(function (response) {
                        scope.newSmartSegment.criterias[index].allCityList = response.data;
                    }, function (error) {
                        console.log(error);
                    }) : '';
                }, 1);
            });
        }
    }
})(window.angular);


