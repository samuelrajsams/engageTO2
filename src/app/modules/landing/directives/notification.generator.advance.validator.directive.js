(function (angular) {
    'use strict';
    angular
            .module('landing')
            .directive('notificationGeneratorAdvanceValidator',notificationGeneratorAdvanceValidatorDirective);

    notificationGeneratorAdvanceValidatorDirective.$inject = [
        '$timeout'
    ];
    function notificationGeneratorAdvanceValidatorDirective(
            $timeout) {
        return {
            restrict: 'A',
            link: notificationGeneratorAdvanceValidatorLink
        };
        function notificationGeneratorAdvanceValidatorLink(scope, iElement, iAttrs) {
            //blur event on fields
            iElement.on('blur', function () {
                var urlRegex = /^(http[s]?:\/\/www\.|HTTP[S]?:\/\/WWW\.|http[s]?:\/\/|HTTP[S]?:\/\/|www\.|WWW\.|[A-Za-z]{0})[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                        index = iAttrs.id.indexOf('0') !== -1 ? 0 : iAttrs.id.indexOf('1') !== -1 ? 1 : '',
                        utmRegex = /^[a-zA-Z0-9_-]*$/,
                        alphaNumericRegex = /^(\+|-)?(0|[1-9][0-9]*)$/;
                $timeout(function () {
                    if (iAttrs.id === 'ctaText' + index) {
                        var url = scope.notificationGenerator.advanceOptions.cta[index].url,
                                text = scope.notificationGenerator.advanceOptions.cta[index].text;
                        scope.notificationGenerator.advanceOptions.cta[index].isCtaTextBlured = true;
                        if ((url === '' || url.trim() == '') && text !== '' && text.trim() != '')
                            scope.notificationGenerator.advanceOptions.cta[index].isCtaUrlRequired = true;
                        if (url !== '' && url.trim() != '' && (text === '' || text.trim() == ''))
                            scope.notificationGenerator.advanceOptions.cta[index].isCtaTextRequired = true;
                        if (url === '' && url.trim() == '' && text === '' && text.trim() == '') {
                            scope.notificationGenerator.advanceOptions.cta[index].isCtaTextRequired = false;
                            scope.notificationGenerator.advanceOptions.cta[index].isCtaTextRequired = false;
                            scope.notificationGenerator.advanceOptions.cta[index].isCtaUrlValid = undefined;
                        }
                    }
                    if (iAttrs.id === 'ctaUrl' + index) {
                        var url = scope.notificationGenerator.advanceOptions.cta[index].url,
                                text = scope.notificationGenerator.advanceOptions.cta[index].text;
                        scope.notificationGenerator.advanceOptions.cta[index].isCtaUrlBlured = true;
                        if (url !== '' && url.trim() != '') {
                            scope.notificationGenerator.advanceOptions.cta[index].isCtaUrlValid = urlRegex.test(url);
                        } else {
                            scope.notificationGenerator.advanceOptions.cta[index].isAddUTMParametersRequired = false;
                        }
                        if ((url === '' || url.trim() == '') && text !== '' && text.trim() != '')
                            scope.notificationGenerator.advanceOptions.cta[index].isCtaUrlRequired = true;
                        if (url !== '' && url.trim() != '' && (text === '' || text.trim() == ''))
                            scope.notificationGenerator.advanceOptions.cta[index].isCtaTextRequired = true;
                        if (url === '' && url.trim() == '' && text === '' && text.trim() == '') {
                            scope.notificationGenerator.advanceOptions.cta[index].isCtaTextRequired = false;
                            scope.notificationGenerator.advanceOptions.cta[index].isCtaTextRequired = false;
                            scope.notificationGenerator.advanceOptions.cta[index].isCtaUrlValid = undefined;
                        }
                    }
                    if (iAttrs.id === 'utmSource' + index) {
                        var field = scope.notificationGenerator.advanceOptions.cta[index].uTMSource;
                        if (field !== '' && field) {
                            scope.notificationGenerator.advanceOptions.cta[index].isUTMSourceRequired = false;
                            scope.notificationGenerator.advanceOptions.cta[index].invalidUTMSourcePattern = !utmRegex.test(field);
                        } else
                            scope.notificationGenerator.advanceOptions.cta[index].isUTMSourceRequired = true;
                        scope.notificationGenerator.advanceOptions.cta[index].isUTMSourceBlured = true;
                    }
                    if (iAttrs.id === 'utmMedium' + index) {
                        var field = scope.notificationGenerator.advanceOptions.cta[index].uTMMedium;
                        if (field !== '') {
                            scope.notificationGenerator.advanceOptions.cta[index].invalidUTMMediumPattern = !utmRegex.test(field);
                        }
                        scope.notificationGenerator.advanceOptions.cta[index].isUTMMediumBlured = true;
                    }
                    if (iAttrs.id === 'utmCampaign' + index) {
                        var field = scope.notificationGenerator.advanceOptions.cta[index].uTMCampaign;
                        if (field !== '') {
                            scope.notificationGenerator.advanceOptions.cta[index].invalidUTMCampaignPattern = !utmRegex.test(field);
                        }
                        scope.notificationGenerator.advanceOptions.cta[index].isUTMCampaignBlured = true;
                    }
                    if (iAttrs.id === 'utmTerm' + index) {
                        var field = scope.notificationGenerator.advanceOptions.cta[index].uTMTerm;
                        if (field !== '') {
                            scope.notificationGenerator.advanceOptions.cta[index].invalidUTMTermPattern = !utmRegex.test(field);
                        }
                        scope.notificationGenerator.advanceOptions.cta[index].isUTMTermBlured = true;
                    }
                    if (iAttrs.id === 'utmContent' + index) {
                        var field = scope.notificationGenerator.advanceOptions.cta[index].uTMContent;
                        if (field !== '') {
                            scope.notificationGenerator.advanceOptions.cta[index].invalidUTMContentPattern = !utmRegex.test(field);
                        }
                        scope.notificationGenerator.advanceOptions.cta[index].isUTMContentBlured = true;
                    }
                    if (iAttrs.id === 'notificationExpiry') {
                        var field = scope.notificationGenerator.advanceOptions.expiryValue;
                        if (field !== null && field !== '') {
                            scope.notificationGenerator.advanceOptions.isExpiryValid = alphaNumericRegex.test(field);
                        }
                        scope.notificationGenerator.advanceOptions.isExpiryBlured = true;
                    }
                    if (iAttrs.id === 'durationInSecs') {
                        var field = scope.notificationGenerator.advanceOptions.durationInSecs;
                        if (field !== null && field !== '') {
                            scope.notificationGenerator.advanceOptions.isDurationValid = alphaNumericRegex.test(field);
                        }
                        scope.notificationGenerator.advanceOptions.isDurationBlured = true;
                    }
                }, 1);
            });
            //focus event on fields
            iElement.on('focus', function () {
                var index = iAttrs.id.indexOf('0') !== -1 ? 0 : iAttrs.id.indexOf('1') !== -1 ? 1 : '';
                $timeout(function () {
                    if (iAttrs.id === 'ctaText' + index) {
                        scope.notificationGenerator.advanceOptions.cta[index].isCtaTextRequired = false;
                        scope.notificationGenerator.advanceOptions.cta[index].isCtaTextBlured = false;
                    }
                    if (iAttrs.id === 'ctaUrl' + index) {
                        scope.notificationGenerator.advanceOptions.cta[index].isCtaUrlRequired = false;
                        scope.notificationGenerator.advanceOptions.cta[index].isCtaUrlBlured = false;
                    }
                    if (iAttrs.id === 'utmSource' + index) {
                        scope.notificationGenerator.advanceOptions.cta[index].isUTMSourceRequired = false;
                        scope.notificationGenerator.advanceOptions.cta[index].isUTMSourceBlured = false;
                        scope.notificationGenerator.advanceOptions.cta[index].invalidUTMSourcePattern = false;
                    }
                    if (iAttrs.id === 'utmMedium' + index) {
                        scope.notificationGenerator.advanceOptions.cta[index].isUTMMediumBlured = false;
                        scope.notificationGenerator.advanceOptions.cta[index].invalidUTMMediumPattern = false;
                    }
                    if (iAttrs.id === 'utmCampaign' + index) {
                        scope.notificationGenerator.advanceOptions.cta[index].isUTMCampaignBlured = false;
                        scope.notificationGenerator.advanceOptions.cta[index].invalidUTMCampaignPattern = false;
                    }
                    if (iAttrs.id === 'utmTerm' + index) {
                        scope.notificationGenerator.advanceOptions.cta[index].isUTMTermBlured = false;
                        scope.notificationGenerator.advanceOptions.cta[index].invalidUTMTermPattern = false;
                    }
                    if (iAttrs.id === 'utmContent' + index) {
                        scope.notificationGenerator.advanceOptions.cta[index].isUTMContentBlured = false;
                        scope.notificationGenerator.advanceOptions.cta[index].invalidUTMContentPattern = false;
                    }
                    if (iAttrs.id === 'notificationExpiry') {
                        scope.notificationGenerator.advanceOptions.isExpiryBlured = false;
                        scope.notificationGenerator.advanceOptions.isExpiryValid = true;
                    }
                    if (iAttrs.id === 'durationInSecs') {
                        scope.notificationGenerator.advanceOptions.isDurationBlured = false;
                        scope.notificationGenerator.advanceOptions.isDurationValid = true;
                    }
                }, 1);
            });
            //keypress event on fields
            iElement.on('keypress keyup', function () {
                var index = iAttrs.id.indexOf('0') !== -1 ? 0 : iAttrs.id.indexOf('1') !== -1 ? 1 : '';
                $timeout(function () {
                    if (iAttrs.id === 'ctaText' + index) {
                        scope.notificationGenerator.advanceOptions.cta[index].ctaTextCharaLength = 12 - scope.notificationGenerator.advanceOptions.cta[index].text.length;
                        if (scope.notificationGenerator.advanceOptions.cta[index].ctaTextCharaLength >= 0) {
                            scope.notificationGenerator.advanceOptions.cta[index].isCtaTextShorter = true;
                        } else {
                            scope.notificationGenerator.advanceOptions.cta[index].ctaTextCharaLength = 0;
                            scope.notificationGenerator.advanceOptions.cta[index].isCtaTextShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmSource' + index) {
                        if (scope.notificationGenerator.advanceOptions.cta[index].uTMSource)
                            scope.notificationGenerator.advanceOptions.cta[index].utmSourceCharLength = 50 - scope.notificationGenerator.advanceOptions.cta[index].uTMSource.length;
                        else
                            scope.notificationGenerator.advanceOptions.cta[index].utmSourceCharLength = 50;
                        if (scope.notificationGenerator.advanceOptions.cta[index].utmSourceCharLength >= 0) {
                            scope.notificationGenerator.advanceOptions.cta[index].isUTMSourceShorter = true;
                        } else {
                            scope.notificationGenerator.advanceOptions.cta[index].utmSourceCharLength = 0;
                            scope.notificationGenerator.advanceOptions.cta[index].isUTMSourceShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmMedium' + index) {
                        scope.notificationGenerator.advanceOptions.cta[index].utmMediumCharLength = 50 - scope.notificationGenerator.advanceOptions.cta[index].uTMMedium.length;
                        if (scope.notificationGenerator.advanceOptions.cta[index].utmMediumCharLength >= 0) {
                            scope.notificationGenerator.advanceOptions.cta[index].isUTMMediumShorter = true;
                        } else {
                            scope.notificationGenerator.advanceOptions.cta[index].utmMediumCharLength = 0;
                            scope.notificationGenerator.advanceOptions.cta[index].isUTMMediumShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmCampaign' + index) {
                        scope.notificationGenerator.advanceOptions.cta[index].utmCampaignCharLength = 50 - scope.notificationGenerator.advanceOptions.cta[index].uTMCampaign.length;
                        if (scope.notificationGenerator.advanceOptions.cta[index].utmCampaignCharLength >= 0) {
                            scope.notificationGenerator.advanceOptions.cta[index].isUTMCampaignShorter = true;
                        } else {
                            scope.notificationGenerator.advanceOptions.cta[index].utmCampaignCharLength = 0;
                            scope.notificationGenerator.advanceOptions.cta[index].isUTMCampaignShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmTerm' + index) {
                        scope.notificationGenerator.advanceOptions.cta[index].utmTermCharLength = 50 - scope.notificationGenerator.advanceOptions.cta[index].uTMTerm.length;
                        if (scope.notificationGenerator.advanceOptions.cta[index].utmTermCharLength >= 0) {
                            scope.notificationGenerator.advanceOptions.cta[index].isUTMTermShorter = true;
                        } else {
                            scope.notificationGenerator.advanceOptions.cta[index].utmTermCharLength = 0;
                            scope.notificationGenerator.advanceOptions.cta[index].isUTMTermShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmContent' + index) {
                        scope.notificationGenerator.advanceOptions.cta[index].utmContentCharLength = 50 - scope.notificationGenerator.advanceOptions.cta[index].uTMContent.length;
                        if (scope.notificationGenerator.advanceOptions.cta[index].utmContentCharLength >= 0) {
                            scope.notificationGenerator.advanceOptions.cta[index].isUTMContentShorter = true;
                        } else {
                            scope.notificationGenerator.advanceOptions.cta[index].utmContentCharLength = 0;
                            scope.notificationGenerator.advanceOptions.cta[index].isUTMContentShorter = false;
                        }
                    }
                }, 1);
            });
        }
    }
})(window.angular);