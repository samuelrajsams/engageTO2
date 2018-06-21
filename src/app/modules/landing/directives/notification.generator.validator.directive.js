(function (angular) {
    'use strict';
    angular
            .module('landing')
            .directive('notificationGeneratorValidator',notificationGeneratorValidatorDirective);
    
    notificationGeneratorValidatorDirective.$inject = [
        '$timeout'
    ];
    function notificationGeneratorValidatorDirective(
            $timeout) {
        return {
            restrict: 'A',
            link: notificationGeneratorLink
        };
        function notificationGeneratorLink(scope, iElement, iAttrs) {
            //blur event on fields
            iElement.on('blur', function(){
                var urlRegex = /^(http[s]?:\/\/www\.|HTTP[S]?:\/\/WWW\.|http[s]?:\/\/|HTTP[S]?:\/\/|www\.|WWW\.|[A-Za-z]{0})[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                        utmRegex = /^[a-zA-Z0-9_-]*$/;
                $timeout(function () {
                    if (iAttrs.id === 'notificationTitle') {
                        scope.notificationGenerator.notification.isTitleBlured = true;
                        scope.notificationGenerator.notification.title === '' || !scope.notificationGenerator.notification.title ? scope.notificationGenerator.notification.isTitleRequired = true : scope.notificationGenerator.notification.isTitleRequired = false;
                    }
                    if (iAttrs.id === 'notificationDescription') {
                        scope.notificationGenerator.notification.isDescriptionBlured = true;
                        scope.notificationGenerator.notification.description === '' || !scope.notificationGenerator.notification.description ? scope.notificationGenerator.notification.isDescriptionRequired = true : scope.notificationGenerator.notification.isDescriptionRequired = false;
                    }
                    if (iAttrs.id === 'notificationUrl') {
                        if (scope.notificationGenerator.notification.url) {
                            var field = scope.notificationGenerator.notification.url;
                            scope.notificationGenerator.notification.isUrlValid = urlRegex.test(field);
                        } else {
                            scope.notificationGenerator.notification.isUTMParametersRequired = false;
                        }
                    }
                    if (iAttrs.id === 'utmSource') {
                        var field = scope.notificationGenerator.notification.uTMSource;
                        if (field === '' || !field)
                            scope.notificationGenerator.notification.isUtmSourceRequired = true;
                        else {
                            scope.notificationGenerator.notification.invalidUTMSourcePattern = !utmRegex.test(field);
                            scope.notificationGenerator.notification.isUtmSourceRequired = false;
                        }
                    }
                    if (iAttrs.id === 'utmMedium') {
                        var field = scope.notificationGenerator.notification.uTMMedium;
                        if (field !== '') {
                            scope.notificationGenerator.notification.invalidUTMMediumPattern = !utmRegex.test(field);
                        }
                        scope.notificationGenerator.notification.isUtmMediumBlured = true;
                    }
                    if (iAttrs.id === 'utmCampaign') {
                        var field = scope.notificationGenerator.notification.uTMCampaign;
                        if (field !== '') {
                            scope.notificationGenerator.notification.invalidUTMCompaignPattern = !utmRegex.test(field);
                        }
                        scope.notificationGenerator.notification.isUtmCompaignBlured = true;
                    }
                    if (iAttrs.id === 'utmTerm') {
                        var field = scope.notificationGenerator.notification.uTMTerm;
                        if (field !== '') {
                            scope.notificationGenerator.notification.invalidUTMTermPattern = !utmRegex.test(field);
                        }
                        scope.notificationGenerator.notification.isUtmTermBlured = true;
                    }
                    if (iAttrs.id === 'utmContent') {
                        var field = scope.notificationGenerator.notification.uTMContent;
                        if (field !== '') {
                            scope.notificationGenerator.notification.invalidUTMContentPattern = !utmRegex.test(field);
                        }
                        scope.notificationGenerator.notification.isUtmContentBlured = true;
                    }
                }, 1);
            });
            //focus event on fields
            iElement.on('focus', function () {
                $timeout(function () {
                    if (iAttrs.id === 'notificationTitle') {
                        scope.notificationGenerator.notification.isTitleBlured = false;
                        scope.notificationGenerator.notification.isTitleRequired = undefined;
                    }
                    if (iAttrs.id === 'notificationDescription') {
                        scope.notificationGenerator.notification.isDescriptionBlured = false;
                        scope.notificationGenerator.notification.isDescriptionRequired = undefined;
                    }
                    if (iAttrs.id === 'notificationUrl') {
                        scope.notificationGenerator.notification.isUrlValid = undefined;
                    }
                    if (iAttrs.id === 'utmSource') {
                        scope.notificationGenerator.notification.isUtmSourceRequired = undefined;
                        scope.notificationGenerator.notification.invalidUTMSourcePattern = false;
                    }
                    if (iAttrs.id === 'utmMedium') {
                        scope.notificationGenerator.notification.isUtmMediumBlured = false;
                        scope.notificationGenerator.notification.invalidUTMMediumPattern = false;
                    }
                    if (iAttrs.id === 'utmCampaign') {
                        scope.notificationGenerator.notification.isUtmCompaignBlured = false;
                        scope.notificationGenerator.notification.invalidUTMCompaignPattern = false;
                    }
                    if (iAttrs.id === 'utmTerm') {
                        scope.notificationGenerator.notification.isUtmTermBlured = false;
                        scope.notificationGenerator.notification.invalidUTMTermPattern = false;
                    }
                    if (iAttrs.id === 'utmContent') {
                        scope.notificationGenerator.notification.isUtmContentBlured = false;
                        scope.notificationGenerator.notification.invalidUTMContentPattern = false;
                    }
                }, 1);
            });
            //keypress event on fields
            iElement.on('keypress', function () {
                $timeout(function () {
                    if (iAttrs.id === 'notificationTitle') {
                        if (scope.notificationGenerator.notification.title)
                            scope.notificationGenerator.notification.titleCharaLength = 50 - scope.notificationGenerator.notification.title.length;
                        else
                            scope.notificationGenerator.notification.titleCharaLength = 50;

                        if (scope.notificationGenerator.notification.titleCharaLength >= 0) {
                            scope.notificationGenerator.notification.isTitleShorter = true;
                        } else {
                            scope.notificationGenerator.notification.titleCharaLength = 0;
                            scope.notificationGenerator.notification.isTitleShorter = false;
                        }
                    }
                    if (iAttrs.id === 'notificationDescription') {
                        if (scope.notificationGenerator.notification.description)
                            scope.notificationGenerator.notification.descriptionCharaLength = 100 - scope.notificationGenerator.notification.description.length;
                        else
                            scope.notificationGenerator.notification.descriptionCharaLength = 100;

                        if (scope.notificationGenerator.notification.descriptionCharaLength >= 0) {
                            scope.notificationGenerator.notification.isDescriptionShorter = true;
                        } else {
                            scope.notificationGenerator.notification.descriptionCharaLength = 0;
                            scope.notificationGenerator.notification.isDescriptionShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmSource') {
                        if (scope.notificationGenerator.notification.uTMSource)
                            scope.notificationGenerator.notification.utmSourceCharaLength = 50 - scope.notificationGenerator.notification.uTMSource.length;
                        else
                            scope.notificationGenerator.notification.utmSourceCharaLength = 50;
                        if (scope.notificationGenerator.notification.utmSourceCharaLength >= 0) {
                            scope.notificationGenerator.notification.isUtmSourceShorter = true;
                        } else {
                            scope.notificationGenerator.notification.utmSourceCharaLength = 0;
                            scope.notificationGenerator.notification.isUtmSourceShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmMedium') {
                        if (scope.notificationGenerator.notification.uTMMedium)
                            scope.notificationGenerator.notification.utmMediumCharaLength = 50 - scope.notificationGenerator.notification.uTMMedium.length;
                        else
                            scope.notificationGenerator.notification.utmMediumCharaLength = 50;
                        if (scope.notificationGenerator.notification.utmMediumCharaLength >= 0) {
                            scope.notificationGenerator.notification.isUtmMediumShorter = true;
                        } else {
                            scope.notificationGenerator.notification.utmMediumCharaLength = 0;
                            scope.notificationGenerator.notification.isUtmMediumShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmCampaign') {
                        if (scope.notificationGenerator.notification.uTMCampaign)
                            scope.notificationGenerator.notification.utmCompaignCharaLength = 50 - scope.notificationGenerator.notification.uTMCampaign.length;
                        else
                            scope.notificationGenerator.notification.utmCompaignCharaLength = 50;
                        if (scope.notificationGenerator.notification.utmCompaignCharaLength >= 0) {
                            scope.notificationGenerator.notification.isUtmCompaignShorter = true;
                        } else {
                            scope.notificationGenerator.notification.utmCompaignCharaLength = 0;
                            scope.notificationGenerator.notification.isUtmCompaignShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmTerm') {
                        if (scope.notificationGenerator.notification.uTMTerm)
                            scope.notificationGenerator.notification.utmTermCharaLength = 50 - scope.notificationGenerator.notification.uTMTerm.length;
                        else
                            scope.notificationGenerator.notification.utmTermCharaLength = 50;
                        if (scope.notificationGenerator.notification.utmTermCharaLength >= 0) {
                            scope.notificationGenerator.notification.isUtmTermShorter = true;
                        } else {
                            scope.notificationGenerator.notification.utmTermCharaLength = 0;
                            scope.notificationGenerator.notification.isUtmTermShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmContent') {
                        if (scope.notificationGenerator.notification.uTMContent)
                            scope.notificationGenerator.notification.utmContentCharaLength = 50 - scope.notificationGenerator.notification.uTMContent.length;
                        else
                            scope.notificationGenerator.notification.utmContentCharaLength = 50;
                        if (scope.notificationGenerator.notification.utmContentCharaLength >= 0) {
                            scope.notificationGenerator.notification.isUtmContentShorter = true;
                        } else {
                            scope.notificationGenerator.notification.utmContentCharaLength = 0;
                            scope.notificationGenerator.notification.isUtmContentShorter = false;
                        }
                    }
                }, 1);
            });
        }
    }
})(window.angular);