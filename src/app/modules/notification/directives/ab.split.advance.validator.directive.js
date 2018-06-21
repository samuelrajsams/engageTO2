(function (angular) {

    angular
            .module('notification')
            .directive('abSplitAdvanceValidator', abSplitAdvanceValidatorDirective);
    abSplitAdvanceValidatorDirective.$inject = [
        '$timeout'
    ];
    function abSplitAdvanceValidatorDirective(
            $timeout) {
        var abSplitAdvanceValidatorDirective = {
            restrict: 'A',
            template: '',
            link: abSplitAdvanceValidatorLink
        };

        return abSplitAdvanceValidatorDirective;

        function abSplitAdvanceValidatorLink(scope, iElement, iAttrs) {
            //blur event on fields
            iElement.on('blur', function () {
                var urlRegex = /^(http[s]?:\/\/www\.|HTTP[S]?:\/\/WWW\.|http[s]?:\/\/|HTTP[S]?:\/\/|www\.|WWW\.|[A-Za-z]{0})[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                        index = iAttrs.id.indexOf('0') !== -1 ? 0 : iAttrs.id.indexOf('1') !== -1 ? 1 : '',
                        utmRegex = /^[a-zA-Z0-9_-]*$/,
                        alphaNumericRegex = /^(\+|-)?(0|[1-9][0-9]*)$/;
                $timeout(function () {
                    if (iAttrs.id === 'ctaText' + index) {
                        var url = scope.abSplitNotification.advanceOptions.cta[index].url,
                                text = scope.abSplitNotification.advanceOptions.cta[index].text;
                        scope.abSplitNotification.advanceOptions.cta[index].isCtaTextBlured = true;
                        if ((url === '' || url.trim() == '') && text !== '' && text.trim() != '')
                            scope.abSplitNotification.advanceOptions.cta[index].isCtaUrlRequired = true;
                        if (url !== '' && url.trim() != '' && (text === '' || text.trim() == ''))
                            scope.abSplitNotification.advanceOptions.cta[index].isCtaTextRequired = true;
                        if (url === '' && url.trim() == '' && text === '' && text.trim() == '') {
                            scope.abSplitNotification.advanceOptions.cta[index].isCtaTextRequired = false;
                            scope.abSplitNotification.advanceOptions.cta[index].isCtaTextRequired = false;
                            scope.abSplitNotification.advanceOptions.cta[index].isCtaUrlValid = undefined;
                        }
                    }
                    if (iAttrs.id === 'ctaUrl' + index) {
                        var url = scope.abSplitNotification.advanceOptions.cta[index].url,
                                text = scope.abSplitNotification.advanceOptions.cta[index].text;
                        scope.abSplitNotification.advanceOptions.cta[index].isCtaUrlBlured = true;
                        if (url !== '' && url.trim() != '') {
                            scope.abSplitNotification.advanceOptions.cta[index].isCtaUrlValid = urlRegex.test(url);
                            if(scope.abSplitNotification.advanceOptions.cta[index].isCtaUrlValid){
                                scope.abSplitNotification.listOfNotification[scope.abSplitNotification.listIndex].advanceOptions.cta[index].url = url;
                            }
                        } else {
                            scope.abSplitNotification.advanceOptions.cta[index].isAddUTMParametersRequired = false;
                        }
                        if ((url === '' || url.trim() == '') && text !== '' && text.trim() != '')
                            scope.abSplitNotification.advanceOptions.cta[index].isCtaUrlRequired = true;
                        if (url !== '' && url.trim() != '' && (text === '' || text.trim() == ''))
                            scope.abSplitNotification.advanceOptions.cta[index].isCtaTextRequired = true;
                        if (url === '' && url.trim() == '' && text === '' && text.trim() == '') {
                            scope.abSplitNotification.advanceOptions.cta[index].isCtaTextRequired = false;
                            scope.abSplitNotification.advanceOptions.cta[index].isCtaTextRequired = false;
                            scope.abSplitNotification.advanceOptions.cta[index].isCtaUrlValid = undefined;
                        }
                    }
                    if (iAttrs.id === 'utmSource' + index) {
                        var field = scope.abSplitNotification.advanceOptions.cta[index].uTMSource;
                        if (field !== '' && field) {
                            scope.abSplitNotification.advanceOptions.cta[index].isUTMSourceRequired = false;
                            scope.abSplitNotification.advanceOptions.cta[index].invalidUTMSourcePattern = !utmRegex.test(field);
                        } else
                            scope.abSplitNotification.advanceOptions.cta[index].isUTMSourceRequired = true;
                        scope.abSplitNotification.advanceOptions.cta[index].isUTMSourceBlured = true;
                    }
                    if (iAttrs.id === 'utmMedium' + index) {
                        var field = scope.abSplitNotification.advanceOptions.cta[index].uTMMedium;
                        if (field !== '') {
                            scope.abSplitNotification.advanceOptions.cta[index].invalidUTMMediumPattern = !utmRegex.test(field);
                        }
                        scope.abSplitNotification.advanceOptions.cta[index].isUTMMediumBlured = true;
                    }
                    if (iAttrs.id === 'utmCampaign' + index) {
                        var field = scope.abSplitNotification.advanceOptions.cta[index].uTMCompaign;
                        if (field !== '') {
                            scope.abSplitNotification.advanceOptions.cta[index].invalidUTMCampaignPattern = !utmRegex.test(field);
                        }
                        scope.abSplitNotification.advanceOptions.cta[index].isUTMCampaignBlured = true;
                    }
                    if (iAttrs.id === 'utmTerm' + index) {
                        var field = scope.abSplitNotification.advanceOptions.cta[index].uTMTerm;
                        if (field !== '') {
                            scope.abSplitNotification.advanceOptions.cta[index].invalidUTMTermPattern = !utmRegex.test(field);
                        }
                        scope.abSplitNotification.advanceOptions.cta[index].isUTMTermBlured = true;
                    }
                    if (iAttrs.id === 'utmContent' + index) {
                        var field = scope.abSplitNotification.advanceOptions.cta[index].uTMContent;
                        if (field !== '') {
                            scope.abSplitNotification.advanceOptions.cta[index].invalidUTMContentPattern = !utmRegex.test(field);
                        }
                        scope.abSplitNotification.advanceOptions.cta[index].isUTMContentBlured = true;
                    }
                    if (iAttrs.id === 'notificationExpiry') {
                        var field = scope.abSplitNotification.advanceOptions.expiryValue;
                        if (field !== null && field !== '') {
                            scope.abSplitNotification.advanceOptions.isExpiryValid = alphaNumericRegex.test(field);
                        }
                        scope.abSplitNotification.advanceOptions.isExpiryBlured = true;
                    }
                    if (iAttrs.id === 'durationInSecs') {
                        var field = scope.abSplitNotification.advanceOptions.durationInSecs;
                        if (field !== null && field !== '') {
                            scope.abSplitNotification.advanceOptions.isDurationValid = alphaNumericRegex.test(field);
                        }
                        scope.abSplitNotification.advanceOptions.isDurationBlured = true;
                    }
                }, 1);
            });
            //focus event on fields
            iElement.on('focus', function () {
                var index = iAttrs.id.indexOf('0') !== -1 ? 0 : iAttrs.id.indexOf('1') !== -1 ? 1 : '';
                $timeout(function () {
                    if (iAttrs.id === 'ctaText' + index) {
                        scope.abSplitNotification.advanceOptions.cta[index].isCtaTextRequired = false;
                        scope.abSplitNotification.advanceOptions.cta[index].isCtaTextBlured = false;
                    }
                    if (iAttrs.id === 'ctaUrl' + index) {
                        scope.abSplitNotification.advanceOptions.cta[index].isCtaUrlRequired = false;
                        scope.abSplitNotification.advanceOptions.cta[index].isCtaUrlBlured = false;
                    }
                    if (iAttrs.id === 'utmSource' + index) {
                        scope.abSplitNotification.advanceOptions.cta[index].isUTMSourceRequired = false;
                        scope.abSplitNotification.advanceOptions.cta[index].isUTMSourceBlured = false;
                        scope.abSplitNotification.advanceOptions.cta[index].invalidUTMSourcePattern = false;
                    }
                    if (iAttrs.id === 'utmMedium' + index) {
                        scope.abSplitNotification.advanceOptions.cta[index].isUTMMediumBlured = false;
                        scope.abSplitNotification.advanceOptions.cta[index].invalidUTMMediumPattern = false;
                    }
                    if (iAttrs.id === 'utmCampaign' + index) {
                        scope.abSplitNotification.advanceOptions.cta[index].isUTMCampaignBlured = false;
                        scope.abSplitNotification.advanceOptions.cta[index].invalidUTMCampaignPattern = false;
                    }
                    if (iAttrs.id === 'utmTerm' + index) {
                        scope.abSplitNotification.advanceOptions.cta[index].isUTMTermBlured = false;
                        scope.abSplitNotification.advanceOptions.cta[index].invalidUTMTermPattern = false;
                    }
                    if (iAttrs.id === 'utmContent' + index) {
                        scope.abSplitNotification.advanceOptions.cta[index].isUTMContentBlured = false;
                        scope.abSplitNotification.advanceOptions.cta[index].invalidUTMContentPattern = false;
                    }
                    if (iAttrs.id === 'notificationExpiry') {
                        scope.abSplitNotification.advanceOptions.isExpiryBlured = false;
                        scope.abSplitNotification.advanceOptions.isExpiryValid = true;
                    }
                    if (iAttrs.id === 'durationInSecs') {
                        scope.abSplitNotification.advanceOptions.isDurationBlured = false;
                        scope.abSplitNotification.advanceOptions.isDurationValid = true;
                    }
                }, 1);
            });
            //keypress event on fields
            iElement.on('keypress', function () {
                var index = iAttrs.id.indexOf('0') !== -1 ? 0 : iAttrs.id.indexOf('1') !== -1 ? 1 : '';
                $timeout(function () {
                    if (iAttrs.id === 'ctaText' + index) {
                        scope.abSplitNotification.listOfNotification[scope.abSplitNotification.listIndex].advanceOptions.cta[index].text = scope.abSplitNotification.advanceOptions.cta[index].text;
                        scope.abSplitNotification.advanceOptions.cta[index].ctaTextCharaLength = 12 - scope.abSplitNotification.advanceOptions.cta[index].text.length;
                        if (scope.abSplitNotification.advanceOptions.cta[index].ctaTextCharaLength >= 0) {
                            scope.abSplitNotification.advanceOptions.cta[index].isCtaTextShorter = true;
                        } else {
                            scope.abSplitNotification.advanceOptions.cta[index].ctaTextCharaLength = 0;
                            scope.abSplitNotification.advanceOptions.cta[index].isCtaTextShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmSource' + index) {
                        if (scope.abSplitNotification.advanceOptions.cta[index].uTMSource)
                            scope.abSplitNotification.advanceOptions.cta[index].utmSourceCharLength = 50 - scope.abSplitNotification.advanceOptions.cta[index].uTMSource.length;
                        else
                            scope.abSplitNotification.advanceOptions.cta[index].utmSourceCharLength = 50;
                        if (scope.abSplitNotification.advanceOptions.cta[index].utmSourceCharLength >= 0) {
                            scope.abSplitNotification.advanceOptions.cta[index].isUTMSourceShorter = true;
                        } else {
                            scope.abSplitNotification.advanceOptions.cta[index].utmSourceCharLength = 0;
                            scope.abSplitNotification.advanceOptions.cta[index].isUTMSourceShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmMedium' + index) {
                        scope.abSplitNotification.advanceOptions.cta[index].utmMediumCharLength = 50 - scope.abSplitNotification.advanceOptions.cta[index].uTMMedium.length;
                        if (scope.abSplitNotification.advanceOptions.cta[index].utmMediumCharLength >= 0) {
                            scope.abSplitNotification.advanceOptions.cta[index].isUTMMediumShorter = true;
                        } else {
                            scope.abSplitNotification.advanceOptions.cta[index].utmMediumCharLength = 0;
                            scope.abSplitNotification.advanceOptions.cta[index].isUTMMediumShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmCampaign' + index) {
                        scope.abSplitNotification.advanceOptions.cta[index].utmCampaignCharLength = 50 - scope.abSplitNotification.advanceOptions.cta[index].uTMCompaign.length;
                        if (scope.abSplitNotification.advanceOptions.cta[index].utmCampaignCharLength >= 0) {
                            scope.abSplitNotification.advanceOptions.cta[index].isUTMCampaignShorter = true;
                        } else {
                            scope.abSplitNotification.advanceOptions.cta[index].utmCampaignCharLength = 0;
                            scope.abSplitNotification.advanceOptions.cta[index].isUTMCampaignShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmTerm' + index) {
                        scope.abSplitNotification.advanceOptions.cta[index].utmTermCharLength = 50 - scope.abSplitNotification.advanceOptions.cta[index].uTMTerm.length;
                        if (scope.abSplitNotification.advanceOptions.cta[index].utmTermCharLength >= 0) {
                            scope.abSplitNotification.advanceOptions.cta[index].isUTMTermShorter = true;
                        } else {
                            scope.abSplitNotification.advanceOptions.cta[index].utmTermCharLength = 0;
                            scope.abSplitNotification.advanceOptions.cta[index].isUTMTermShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmContent' + index) {
                        scope.abSplitNotification.advanceOptions.cta[index].utmContentCharLength = 50 - scope.abSplitNotification.advanceOptions.cta[index].uTMContent.length;
                        if (scope.abSplitNotification.advanceOptions.cta[index].utmContentCharLength >= 0) {
                            scope.abSplitNotification.advanceOptions.cta[index].isUTMContentShorter = true;
                        } else {
                            scope.abSplitNotification.advanceOptions.cta[index].utmContentCharLength = 0;
                            scope.abSplitNotification.advanceOptions.cta[index].isUTMContentShorter = false;
                        }
                    }
                }, 1);
            });
        }
    }

})(window.angular);


