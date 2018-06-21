(function (angular) {
    'use strict';
    angular
            .module('notification')
            .directive('welcomeNotificationValidator', welcomeNotificationValidatorDirective);
    
    welcomeNotificationValidatorDirective.$inject = [
        '$timeout'
    ];
    function welcomeNotificationValidatorDirective(
            $timeout) {
        return {
            restrict: 'A',
            link: welcomeNotificationLink
        };
        function welcomeNotificationLink(scope, iElement, iAttrs) {
            //blur event on fields
            iElement.on('blur', function(){
                var urlRegex = /^(http[s]?:\/\/www\.|HTTP[S]?:\/\/WWW\.|http[s]?:\/\/|HTTP[S]?:\/\/|www\.|WWW\.|[A-Za-z]{0})[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                        utmRegex = /^[a-zA-Z0-9_-]*$/;
                $timeout(function () {
                    if (iAttrs.id === 'notificationTitle') {
                        scope.welcomeNotification.notification.isTitleBlured = true;
                        scope.welcomeNotification.notification.title === '' || !scope.welcomeNotification.notification.title ? scope.welcomeNotification.notification.isTitleRequired = true : scope.welcomeNotification.notification.isTitleRequired = false;
                    }
                    if (iAttrs.id === 'notificationDescription') {
                        scope.welcomeNotification.notification.isDescriptionBlured = true;
                        scope.welcomeNotification.notification.description === '' || !scope.welcomeNotification.notification.description ? scope.welcomeNotification.notification.isDescriptionRequired = true : scope.welcomeNotification.notification.isDescriptionRequired = false;
                    }
                    if (iAttrs.id === 'notificationUrl') {
                        if (scope.welcomeNotification.notification.url) {
                            var field = scope.welcomeNotification.notification.url;
                            scope.welcomeNotification.notification.isUrlValid = urlRegex.test(field);
                        } else {
                            scope.welcomeNotification.notification.isUTMParametersRequired = false;
                        }
                    }
                    if (iAttrs.id === 'utmSource') {
                        var field = scope.welcomeNotification.notification.uTMSource;
                        if (field === '' || !field)
                            scope.welcomeNotification.notification.isUtmSourceRequired = true;
                        else {
                            scope.welcomeNotification.notification.invalidUTMSourcePattern = !utmRegex.test(field);
                            scope.welcomeNotification.notification.isUtmSourceRequired = false;
                        }
                    }
                    if (iAttrs.id === 'utmMedium') {
                        var field = scope.welcomeNotification.notification.uTMMedium;
                        if (field !== '') {
                            scope.welcomeNotification.notification.invalidUTMMediumPattern = !utmRegex.test(field);
                        }
                        scope.welcomeNotification.notification.isUtmMediumBlured = true;
                    }
                    if (iAttrs.id === 'utmCampaign') {
                        var field = scope.welcomeNotification.notification.uTMCampaign;
                        if (field !== '') {
                            scope.welcomeNotification.notification.invalidUTMCompaignPattern = !utmRegex.test(field);
                        }
                        scope.welcomeNotification.notification.isUtmCompaignBlured = true;
                    }
                    if (iAttrs.id === 'utmTerm') {
                        var field = scope.welcomeNotification.notification.uTMTerm;
                        if (field !== '') {
                            scope.welcomeNotification.notification.invalidUTMTermPattern = !utmRegex.test(field);
                        }
                        scope.welcomeNotification.notification.isUtmTermBlured = true;
                    }
                    if (iAttrs.id === 'utmContent') {
                        var field = scope.welcomeNotification.notification.uTMContent;
                        if (field !== '') {
                            scope.welcomeNotification.notification.invalidUTMContentPattern = !utmRegex.test(field);
                        }
                        scope.welcomeNotification.notification.isUtmContentBlured = true;
                    }
                }, 1);
            });
            //focus event on fields
            iElement.on('focus', function () {
                $timeout(function () {
                    if (iAttrs.id === 'notificationTitle') {
                        scope.welcomeNotification.notification.isTitleBlured = false;
                        scope.welcomeNotification.notification.isTitleRequired = undefined;
                    }
                    if (iAttrs.id === 'notificationDescription') {
                        scope.welcomeNotification.notification.isDescriptionBlured = false;
                        scope.welcomeNotification.notification.isDescriptionRequired = undefined;
                    }
                    if (iAttrs.id === 'notificationUrl') {
                        scope.welcomeNotification.notification.isURLRequired = false;
                        scope.welcomeNotification.notification.isUrlValid = undefined;
                    }
                    if (iAttrs.id === 'utmSource') {
                        scope.welcomeNotification.notification.isUtmSourceRequired = undefined;
                        scope.welcomeNotification.notification.invalidUTMSourcePattern = false;
                    }
                    if (iAttrs.id === 'utmMedium') {
                        scope.welcomeNotification.notification.isUtmMediumBlured = false;
                        scope.welcomeNotification.notification.invalidUTMMediumPattern = false;
                    }
                    if (iAttrs.id === 'utmCampaign') {
                        scope.welcomeNotification.notification.isUtmCompaignBlured = false;
                        scope.welcomeNotification.notification.invalidUTMCompaignPattern = false;
                    }
                    if (iAttrs.id === 'utmTerm') {
                        scope.welcomeNotification.notification.isUtmTermBlured = false;
                        scope.welcomeNotification.notification.invalidUTMTermPattern = false;
                    }
                    if (iAttrs.id === 'utmContent') {
                        scope.welcomeNotification.notification.isUtmContentBlured = false;
                        scope.welcomeNotification.notification.invalidUTMContentPattern = false;
                    }
                }, 1);
            });
            //keypress event on fields
            iElement.on('keypress keyup', function () {
                $timeout(function () {
                    if (iAttrs.id === 'notificationTitle') {
                        if (scope.welcomeNotification.notification.title)
                            scope.welcomeNotification.notification.titleCharaLength = 50 - scope.welcomeNotification.notification.title.length;
                        else
                            scope.welcomeNotification.notification.titleCharaLength = 50;

                        if (scope.welcomeNotification.notification.titleCharaLength >= 0) {
                            scope.welcomeNotification.notification.isTitleShorter = true;
                        } else {
                            scope.welcomeNotification.notification.titleCharaLength = 0;
                            scope.welcomeNotification.notification.isTitleShorter = false;
                        }
                    }
                    if (iAttrs.id === 'notificationDescription') {
                        if (scope.welcomeNotification.notification.description)
                            scope.welcomeNotification.notification.descriptionCharaLength = 100 - scope.welcomeNotification.notification.description.length;
                        else
                            scope.welcomeNotification.notification.descriptionCharaLength = 100;

                        if (scope.welcomeNotification.notification.descriptionCharaLength >= 0) {
                            scope.welcomeNotification.notification.isDescriptionShorter = true;
                        } else {
                            scope.welcomeNotification.notification.descriptionCharaLength = 0;
                            scope.welcomeNotification.notification.isDescriptionShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmSource') {
                        if (scope.welcomeNotification.notification.uTMSource)
                            scope.welcomeNotification.notification.utmSourceCharaLength = 50 - scope.welcomeNotification.notification.uTMSource.length;
                        else
                            scope.welcomeNotification.notification.utmSourceCharaLength = 50;
                        if (scope.welcomeNotification.notification.utmSourceCharaLength >= 0) {
                            scope.welcomeNotification.notification.isUtmSourceShorter = true;
                        } else {
                            scope.welcomeNotification.notification.utmSourceCharaLength = 0;
                            scope.welcomeNotification.notification.isUtmSourceShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmMedium') {
                        if (scope.welcomeNotification.notification.uTMMedium)
                            scope.welcomeNotification.notification.utmMediumCharaLength = 50 - scope.welcomeNotification.notification.uTMMedium.length;
                        else
                            scope.welcomeNotification.notification.utmMediumCharaLength = 50;
                        if (scope.welcomeNotification.notification.utmMediumCharaLength >= 0) {
                            scope.welcomeNotification.notification.isUtmMediumShorter = true;
                        } else {
                            scope.welcomeNotification.notification.utmMediumCharaLength = 0;
                            scope.welcomeNotification.notification.isUtmMediumShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmCampaign') {
                        if (scope.welcomeNotification.notification.uTMCampaign)
                            scope.welcomeNotification.notification.utmCompaignCharaLength = 50 - scope.welcomeNotification.notification.uTMCampaign.length;
                        else
                            scope.welcomeNotification.notification.utmCompaignCharaLength = 50;
                        if (scope.welcomeNotification.notification.utmCompaignCharaLength >= 0) {
                            scope.welcomeNotification.notification.isUtmCompaignShorter = true;
                        } else {
                            scope.welcomeNotification.notification.utmCompaignCharaLength = 0;
                            scope.welcomeNotification.notification.isUtmCompaignShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmTerm') {
                        if (scope.welcomeNotification.notification.uTMTerm)
                            scope.welcomeNotification.notification.utmTermCharaLength = 50 - scope.welcomeNotification.notification.uTMTerm.length;
                        else
                            scope.welcomeNotification.notification.utmTermCharaLength = 50;
                        if (scope.welcomeNotification.notification.utmTermCharaLength >= 0) {
                            scope.welcomeNotification.notification.isUtmTermShorter = true;
                        } else {
                            scope.welcomeNotification.notification.utmTermCharaLength = 0;
                            scope.welcomeNotification.notification.isUtmTermShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmContent') {
                        if (scope.welcomeNotification.notification.uTMContent)
                            scope.welcomeNotification.notification.utmContentCharaLength = 50 - scope.welcomeNotification.notification.uTMContent.length;
                        else
                            scope.welcomeNotification.notification.utmContentCharaLength = 50;
                        if (scope.welcomeNotification.notification.utmContentCharaLength >= 0) {
                            scope.welcomeNotification.notification.isUtmContentShorter = true;
                        } else {
                            scope.welcomeNotification.notification.utmContentCharaLength = 0;
                            scope.welcomeNotification.notification.isUtmContentShorter = false;
                        }
                    }
                }, 1);
            });
        }
    }
})(window.angular);