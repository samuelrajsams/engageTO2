(function (angular) {
    'use strict';
    angular
            .module('smartSegmentation')
            .directive('smartSegmentValidator', smartSegmentValidatorDirective);
    smartSegmentValidatorDirective.$inject = [
        'SmartSegmentationService',
        '$timeout'
    ];
    function smartSegmentValidatorDirective(
            SmartSegmentationService,
            $timeout) {
        return {
            restrict: 'A',
            link: smartSegmentValidatorDirectiveLink
        };
        function smartSegmentValidatorDirectiveLink(scope, element, attr) {
            var index = attr.id.replace(/^\D+/g, '');
            console.log('Attr ID: ', attr.id);
            console.log('Index: ', index);
            //keypress event on fields
            element.on('keypress', function () {
                var segmentNameRegex = /^[a-zA-Z0-9-_]+$/,
                        versionNumberRegex = /^([0-9]+\.){0,5}(\*|[0-9]+)$/,
                        urlRegex = /^(\/+[A-Za-z]*){0,5}$/;
                if (attr.id === 'segmentName') {
                    $timeout(function () {
                        var field = scope.newSmartSegment.segmentName;
                        if (field && field !== '')
                            scope.newSmartSegment.isSegmentNameValid = segmentNameRegex.test(field);
                    }, 1);
                }
                if (attr.id === 'browserVersion' + index) {
                    $timeout(function () {
                        var field = scope.newSmartSegment.criterias[index].versionNumber;
                        if (field && field !== '')
                            scope.newSmartSegment.criterias[index].isVersionValid = versionNumberRegex.test(field);
                    }, 1);
                }
                if (attr.id === 'searchUrl' + index) {
                    $timeout(function () {
                        var field = scope.newSmartSegment.criterias[index].searchUrl;
                        if (field && field !== '')
                            scope.newSmartSegment.criterias[index].isUrlValid = urlRegex.test(field);
                    }, 1);
                }
            });
            //blur event on fields
            element.on('blur', function () {
                if (attr.id === 'segmentName') {
                    $timeout(function () {
                        scope.newSmartSegment.isSegmentNameBlurded = true;
                    }, 1);
                }
                if (attr.id === 'browserVersion' + index) {
                    $timeout(function () {
                        scope.newSmartSegment.criterias[index].isVersionBlured = true;
                    }, 1);
                }
                if (attr.id === 'searchUrl' + index) {
                    $timeout(function () {
                        scope.newSmartSegment.criterias[index].isUrlBlured = true;
                    }, 1);
                }
            });
            //focus event on fields
            element.on('focus', function () {
                if (attr.id === 'segmentName') {
                    $timeout(function () {
                        scope.newSmartSegment.isSegmentNameBlurded = false;
                    }, 1);
                }
                if (attr.id === 'browserVersion' + index) {
                    $timeout(function () {
                        scope.newSmartSegment.criterias[index].isVersionBlured = false;
                    }, 1);
                }
                if (attr.id === 'searchUrl' + index) {
                    $timeout(function () {
                        scope.newSmartSegment.criterias[index].isUrlBlured = false;
                    }, 1);
                }
            });
        }
    }
})(window.angular);


