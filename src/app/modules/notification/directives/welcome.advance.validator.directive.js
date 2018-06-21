(function (angular) {
    'use strict';
    angular
            .module('notification')
            .directive('welcomeAdvanceValidator', welcomeAdvanceValidatorDirective);

    welcomeAdvanceValidatorDirective.$inject = [
        '$timeout'
    ];
    function welcomeAdvanceValidatorDirective(
            $timeout) {
        return {
            restrict: 'A',
            link: welcomeAdvanceValidatorLink
        };
        function welcomeAdvanceValidatorLink(scope, iElement, iAttrs) {
            //blur event on fields
            iElement.on('blur', function () {
                var urlRegex = /^(http[s]?:\/\/www\.|HTTP[S]?:\/\/WWW\.|http[s]?:\/\/|HTTP[S]?:\/\/|www\.|WWW\.|[A-Za-z]{0})[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                        index = iAttrs.id.indexOf('0') !== -1 ? 0 : iAttrs.id.indexOf('1') !== -1 ? 1 : '',
                        utmRegex = /^[a-zA-Z0-9_-]*$/,
                        alphaNumericRegex = /^(\+|-)?(0|[1-9][0-9]*)$/;
                $timeout(function () {
                    if (iAttrs.id === 'ctaText' + index) {
                        var url = scope.welcomeNotification.advanceOptions.cta[index].url,
                                text = scope.welcomeNotification.advanceOptions.cta[index].text;
                        scope.welcomeNotification.advanceOptions.cta[index].isCtaTextBlured = true;
                        if ((url === '' || url.trim() == '') && text !== '' && text.trim() != '')
                            scope.welcomeNotification.advanceOptions.cta[index].isCtaUrlRequired = true;
                        if (url !== '' && url.trim() != '' && (text === '' || text.trim() == ''))
                            scope.welcomeNotification.advanceOptions.cta[index].isCtaTextRequired = true;
                        if (url === '' && url.trim() == '' && text === '' && text.trim() == '') {
                            scope.welcomeNotification.advanceOptions.cta[index].isCtaTextRequired = false;
                            scope.welcomeNotification.advanceOptions.cta[index].isCtaTextRequired = false;
                            scope.welcomeNotification.advanceOptions.cta[index].isCtaUrlValid = undefined;
                        }
                    }
                    if (iAttrs.id === 'ctaUrl' + index) {
                        var url = scope.welcomeNotification.advanceOptions.cta[index].url,
                                text = scope.welcomeNotification.advanceOptions.cta[index].text;
                        scope.welcomeNotification.advanceOptions.cta[index].isCtaUrlBlured = true;
                        if (url !== '' && url.trim() != '') {
                            scope.welcomeNotification.advanceOptions.cta[index].isCtaUrlValid = urlRegex.test(url);
                        } else {
                            scope.welcomeNotification.advanceOptions.cta[index].isAddUTMParametersRequired = false;
                        }
                        if ((url === '' || url.trim() == '') && text !== '' && text.trim() != '')
                            scope.welcomeNotification.advanceOptions.cta[index].isCtaUrlRequired = true;
                        if (url !== '' && url.trim() != '' && (text === '' || text.trim() == ''))
                            scope.welcomeNotification.advanceOptions.cta[index].isCtaTextRequired = true;
                        if (url === '' && url.trim() == '' && text === '' && text.trim() == '') {
                            scope.welcomeNotification.advanceOptions.cta[index].isCtaTextRequired = false;
                            scope.welcomeNotification.advanceOptions.cta[index].isCtaTextRequired = false;
                            scope.welcomeNotification.advanceOptions.cta[index].isCtaUrlValid = undefined;
                        }
                    }
                    if (iAttrs.id === 'utmSource' + index) {
                        var field = scope.welcomeNotification.advanceOptions.cta[index].uTMSource;
                        if (field !== '' && field) {
                            scope.welcomeNotification.advanceOptions.cta[index].isUTMSourceRequired = false;
                            scope.welcomeNotification.advanceOptions.cta[index].invalidUTMSourcePattern = !utmRegex.test(field);
                        } else
                            scope.welcomeNotification.advanceOptions.cta[index].isUTMSourceRequired = true;
                        scope.welcomeNotification.advanceOptions.cta[index].isUTMSourceBlured = true;
                    }
                    if (iAttrs.id === 'utmMedium' + index) {
                        var field = scope.welcomeNotification.advanceOptions.cta[index].uTMMedium;
                        if (field !== '') {
                            scope.welcomeNotification.advanceOptions.cta[index].invalidUTMMediumPattern = !utmRegex.test(field);
                        }
                        scope.welcomeNotification.advanceOptions.cta[index].isUTMMediumBlured = true;
                    }
                    if (iAttrs.id === 'utmCampaign' + index) {
                        var field = scope.welcomeNotification.advanceOptions.cta[index].uTMCampaign;
                        if (field !== '') {
                            scope.welcomeNotification.advanceOptions.cta[index].invalidUTMCampaignPattern = !utmRegex.test(field);
                        }
                        scope.welcomeNotification.advanceOptions.cta[index].isUTMCampaignBlured = true;
                    }
                    if (iAttrs.id === 'utmTerm' + index) {
                        var field = scope.welcomeNotification.advanceOptions.cta[index].uTMTerm;
                        if (field !== '') {
                            scope.welcomeNotification.advanceOptions.cta[index].invalidUTMTermPattern = !utmRegex.test(field);
                        }
                        scope.welcomeNotification.advanceOptions.cta[index].isUTMTermBlured = true;
                    }
                    if (iAttrs.id === 'utmContent' + index) {
                        var field = scope.welcomeNotification.advanceOptions.cta[index].uTMContent;
                        if (field !== '') {
                            scope.welcomeNotification.advanceOptions.cta[index].invalidUTMContentPattern = !utmRegex.test(field);
                        }
                        scope.welcomeNotification.advanceOptions.cta[index].isUTMContentBlured = true;
                    }
                    if (iAttrs.id === 'notificationExpiry') {
                        var field = scope.welcomeNotification.advanceOptions.expiryValue;
                        if (field !== null && field !== '') {
                            scope.welcomeNotification.advanceOptions.isExpiryValid = alphaNumericRegex.test(field);
                        }
                        scope.welcomeNotification.advanceOptions.isExpiryBlured = true;
                    }
                    if (iAttrs.id === 'durationInSecs') {
                        var field = scope.welcomeNotification.advanceOptions.durationInSecs;
                        if (field !== null && field !== '') {
                            scope.welcomeNotification.advanceOptions.isDurationValid = alphaNumericRegex.test(field);
                        }
                        scope.welcomeNotification.advanceOptions.isDurationBlured = true;
                    }
                }, 1);
            });
            //focus event on fields
            iElement.on('focus', function () {
                var index = iAttrs.id.indexOf('0') !== -1 ? 0 : iAttrs.id.indexOf('1') !== -1 ? 1 : '';
                $timeout(function () {
                    if (iAttrs.id === 'ctaText' + index) {
                        scope.welcomeNotification.advanceOptions.cta[index].isCtaTextRequired = false;
                        scope.welcomeNotification.advanceOptions.cta[index].isCtaTextBlured = false;
                    }
                    if (iAttrs.id === 'ctaUrl' + index) {
                        scope.welcomeNotification.advanceOptions.cta[index].isCtaUrlRequired = false;
                        scope.welcomeNotification.advanceOptions.cta[index].isCtaUrlBlured = false;
                    }
                    if (iAttrs.id === 'utmSource' + index) {
                        scope.welcomeNotification.advanceOptions.cta[index].isUTMSourceRequired = false;
                        scope.welcomeNotification.advanceOptions.cta[index].isUTMSourceBlured = false;
                        scope.welcomeNotification.advanceOptions.cta[index].invalidUTMSourcePattern = false;
                    }
                    if (iAttrs.id === 'utmMedium' + index) {
                        scope.welcomeNotification.advanceOptions.cta[index].isUTMMediumBlured = false;
                        scope.welcomeNotification.advanceOptions.cta[index].invalidUTMMediumPattern = false;
                    }
                    if (iAttrs.id === 'utmCampaign' + index) {
                        scope.welcomeNotification.advanceOptions.cta[index].isUTMCampaignBlured = false;
                        scope.welcomeNotification.advanceOptions.cta[index].invalidUTMCampaignPattern = false;
                    }
                    if (iAttrs.id === 'utmTerm' + index) {
                        scope.welcomeNotification.advanceOptions.cta[index].isUTMTermBlured = false;
                        scope.welcomeNotification.advanceOptions.cta[index].invalidUTMTermPattern = false;
                    }
                    if (iAttrs.id === 'utmContent' + index) {
                        scope.welcomeNotification.advanceOptions.cta[index].isUTMContentBlured = false;
                        scope.welcomeNotification.advanceOptions.cta[index].invalidUTMContentPattern = false;
                    }
                    if (iAttrs.id === 'notificationExpiry') {
                        scope.welcomeNotification.advanceOptions.isExpiryBlured = false;
                        scope.welcomeNotification.advanceOptions.isExpiryValid = true;
                    }
                    if (iAttrs.id === 'durationInSecs') {
                        scope.welcomeNotification.advanceOptions.isDurationBlured = false;
                        scope.welcomeNotification.advanceOptions.isDurationValid = true;
                    }
                }, 1);
            });
            //keypress event on fields
            iElement.on('keypress', function () {
                var index = iAttrs.id.indexOf('0') !== -1 ? 0 : iAttrs.id.indexOf('1') !== -1 ? 1 : '';
                $timeout(function () {
                    if (iAttrs.id === 'ctaText' + index) {
                        scope.welcomeNotification.advanceOptions.cta[index].ctaTextCharaLength = 12 - scope.welcomeNotification.advanceOptions.cta[index].text.length;
                        if (scope.welcomeNotification.advanceOptions.cta[index].ctaTextCharaLength >= 0) {
                            scope.welcomeNotification.advanceOptions.cta[index].isCtaTextShorter = true;
                        } else {
                            scope.welcomeNotification.advanceOptions.cta[index].ctaTextCharaLength = 0;
                            scope.welcomeNotification.advanceOptions.cta[index].isCtaTextShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmSource' + index) {
                        if (scope.welcomeNotification.advanceOptions.cta[index].uTMSource)
                            scope.welcomeNotification.advanceOptions.cta[index].utmSourceCharLength = 50 - scope.welcomeNotification.advanceOptions.cta[index].uTMSource.length;
                        else
                            scope.welcomeNotification.advanceOptions.cta[index].utmSourceCharLength = 50;
                        if (scope.welcomeNotification.advanceOptions.cta[index].utmSourceCharLength >= 0) {
                            scope.welcomeNotification.advanceOptions.cta[index].isUTMSourceShorter = true;
                        } else {
                            scope.welcomeNotification.advanceOptions.cta[index].utmSourceCharLength = 0;
                            scope.welcomeNotification.advanceOptions.cta[index].isUTMSourceShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmMedium' + index) {
                        scope.welcomeNotification.advanceOptions.cta[index].utmMediumCharLength = 50 - scope.welcomeNotification.advanceOptions.cta[index].uTMMedium.length;
                        if (scope.welcomeNotification.advanceOptions.cta[index].utmMediumCharLength >= 0) {
                            scope.welcomeNotification.advanceOptions.cta[index].isUTMMediumShorter = true;
                        } else {
                            scope.welcomeNotification.advanceOptions.cta[index].utmMediumCharLength = 0;
                            scope.welcomeNotification.advanceOptions.cta[index].isUTMMediumShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmCampaign' + index) {
                        scope.welcomeNotification.advanceOptions.cta[index].utmCampaignCharLength = 50 - scope.welcomeNotification.advanceOptions.cta[index].uTMCampaign.length;
                        if (scope.welcomeNotification.advanceOptions.cta[index].utmCampaignCharLength >= 0) {
                            scope.welcomeNotification.advanceOptions.cta[index].isUTMCampaignShorter = true;
                        } else {
                            scope.welcomeNotification.advanceOptions.cta[index].utmCampaignCharLength = 0;
                            scope.welcomeNotification.advanceOptions.cta[index].isUTMCampaignShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmTerm' + index) {
                        scope.welcomeNotification.advanceOptions.cta[index].utmTermCharLength = 50 - scope.welcomeNotification.advanceOptions.cta[index].uTMTerm.length;
                        if (scope.welcomeNotification.advanceOptions.cta[index].utmTermCharLength >= 0) {
                            scope.welcomeNotification.advanceOptions.cta[index].isUTMTermShorter = true;
                        } else {
                            scope.welcomeNotification.advanceOptions.cta[index].utmTermCharLength = 0;
                            scope.welcomeNotification.advanceOptions.cta[index].isUTMTermShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmContent' + index) {
                        scope.welcomeNotification.advanceOptions.cta[index].utmContentCharLength = 50 - scope.welcomeNotification.advanceOptions.cta[index].uTMContent.length;
                        if (scope.welcomeNotification.advanceOptions.cta[index].utmContentCharLength >= 0) {
                            scope.welcomeNotification.advanceOptions.cta[index].isUTMContentShorter = true;
                        } else {
                            scope.welcomeNotification.advanceOptions.cta[index].utmContentCharLength = 0;
                            scope.welcomeNotification.advanceOptions.cta[index].isUTMContentShorter = false;
                        }
                    }
                }, 1);
            });
        }
    }
})(window.angular);