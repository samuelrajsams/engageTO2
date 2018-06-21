(function (angular) {

    angular
            .module('notification')
            .directive('abSplitValidator', abSplitValidatorDirective);
    abSplitValidatorDirective.$inject = [
        '$timeout'
    ];
    function abSplitValidatorDirective(
            $timeout) {
        var abSplitValidatorDirective = {
            restrict: 'A',
            template: '',
            link: abSplitValidatorLink
        };

        return abSplitValidatorDirective;

        function abSplitValidatorLink(scope, iElement, iAttrs) {
            //blur event on fields
            iElement.on('blur', function () {
                var urlRegex = /^(http[s]?:\/\/www\.|HTTP[S]?:\/\/WWW\.|http[s]?:\/\/|HTTP[S]?:\/\/|www\.|WWW\.|[A-Za-z]{0})[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                        utmRegex = /^[a-zA-Z0-9_-]*$/;
                $timeout(function () {
                    if (iAttrs.id === 'notificationTitle') {
                        scope.abSplitNotification.notification.isTitleBlured = true;
                        scope.abSplitNotification.notification.title === '' || !scope.abSplitNotification.notification.title ? scope.abSplitNotification.notification.isTitleRequired = true : scope.abSplitNotification.notification.isTitleRequired = false;
                    }
                    if (iAttrs.id === 'notificationMessage') {
                        scope.abSplitNotification.notification.isMessageBlured = true;
                        scope.abSplitNotification.notification.message === '' || !scope.abSplitNotification.notification.message ? scope.abSplitNotification.notification.isMessageRequired = true : scope.abSplitNotification.notification.isMessageRequired = false;
                    }
                    if (iAttrs.id === 'notificationURL') {
                        if (scope.abSplitNotification.notification.url) {
                            var field = scope.abSplitNotification.notification.url;
                            scope.abSplitNotification.notification.isUrlValid = urlRegex.test(field);
                            if (scope.abSplitNotification.notification.isUrlValid) {
                                scope.abSplitNotification.listOfNotification[scope.abSplitNotification.listIndex].notification.url = field;
                            }
                        } else {
                            scope.abSplitNotification.notification.isUTMParametersRequired = false;
                        }
                    }
                    if (iAttrs.id === 'utmSource') {
                        var field = scope.abSplitNotification.notification.uTMSource;
                        if (field === '' || !field)
                            scope.abSplitNotification.notification.isUtmSourceRequired = true;
                        else {
                            scope.abSplitNotification.notification.invalidUTMSourcePattern = !utmRegex.test(field);
                            scope.abSplitNotification.notification.isUtmSourceRequired = false;
                        }
                    }
                    if (iAttrs.id === 'utmMedium') {
                        var field = scope.abSplitNotification.notification.uTMMedium;
                        if (field !== '') {
                            scope.abSplitNotification.notification.invalidUTMMediumPattern = !utmRegex.test(field);
                        }
                        scope.abSplitNotification.notification.isUtmMediumBlured = true;
                    }
                    if (iAttrs.id === 'utmCampaign') {
                        var field = scope.abSplitNotification.notification.uTMCompaign;
                        if (field !== '') {
                            scope.abSplitNotification.notification.invalidUTMCompaignPattern = !utmRegex.test(field);
                        }
                        scope.abSplitNotification.notification.isUtmCompaignBlured = true;
                    }
                    if (iAttrs.id === 'utmTerm') {
                        var field = scope.abSplitNotification.notification.uTMTerm;
                        if (field !== '') {
                            scope.abSplitNotification.notification.invalidUTMTermPattern = !utmRegex.test(field);
                        }
                        scope.abSplitNotification.notification.isUtmTermBlured = true;
                    }
                    if (iAttrs.id === 'utmContent') {
                        var field = scope.abSplitNotification.notification.uTMContent;
                        if (field !== '') {
                            scope.abSplitNotification.notification.invalidUTMContentPattern = !utmRegex.test(field);
                        }
                        scope.abSplitNotification.notification.isUtmContentBlured = true;
                    }
                }, 1);
            });
            //focus event on fields
            iElement.on('focus', function () {
                $timeout(function () {
                    if (iAttrs.id === 'notificationTitle') {
                        scope.abSplitNotification.notification.isTitleBlured = false;
                        scope.abSplitNotification.notification.isTitleRequired = undefined;
                    }
                    if (iAttrs.id === 'notificationMessage') {
                        scope.abSplitNotification.notification.isMessageBlured = false;
                        scope.abSplitNotification.notification.isMessageRequired = undefined;
                    }
                    if (iAttrs.id === 'notificationURL') {
                        scope.abSplitNotification.notification.isUrlValid = undefined;
                    }
                    if (iAttrs.id === 'utmSource') {
                        scope.abSplitNotification.notification.isUtmSourceRequired = undefined;
                        scope.abSplitNotification.notification.invalidUTMSourcePattern = false;
                    }
                    if (iAttrs.id === 'utmMedium') {
                        scope.abSplitNotification.notification.isUtmMediumBlured = false;
                        scope.abSplitNotification.notification.invalidUTMMediumPattern = false;
                    }
                    if (iAttrs.id === 'utmCampaign') {
                        scope.abSplitNotification.notification.isUtmCompaignBlured = false;
                        scope.abSplitNotification.notification.invalidUTMCompaignPattern = false;
                    }
                    if (iAttrs.id === 'utmTerm') {
                        scope.abSplitNotification.notification.isUtmTermBlured = false;
                        scope.abSplitNotification.notification.invalidUTMTermPattern = false;
                    }
                    if (iAttrs.id === 'utmContent') {
                        scope.abSplitNotification.notification.isUtmContentBlured = false;
                        scope.abSplitNotification.notification.invalidUTMContentPattern = false;
                    }
                }, 1);
            });
            //keypress event on fields
            iElement.on('keypress', function () {
                $timeout(function () {
                    if (iAttrs.id === 'notificationTitle') {
                        scope.abSplitNotification.listOfNotification[scope.abSplitNotification.listIndex].notification.title = scope.abSplitNotification.notification.title;
                        if (scope.abSplitNotification.notification.title)
                            scope.abSplitNotification.notification.titleCharaLength = 50 - scope.abSplitNotification.notification.title.length;
                        else
                            scope.abSplitNotification.notification.titleCharaLength = 50;

                        if (scope.abSplitNotification.notification.titleCharaLength >= 0) {
                            scope.abSplitNotification.notification.isTitleShorter = true;
                        } else {
                            scope.abSplitNotification.notification.titleCharaLength = 0;
                            scope.abSplitNotification.notification.isTitleShorter = false;
                        }
                    }
                    if (iAttrs.id === 'notificationMessage') {
                        scope.abSplitNotification.listOfNotification[scope.abSplitNotification.listIndex].notification.message = scope.abSplitNotification.notification.message;
                        if (scope.abSplitNotification.notification.message)
                            scope.abSplitNotification.notification.messageCharaLength = 100 - scope.abSplitNotification.notification.message.length;
                        else
                            scope.abSplitNotification.notification.messageCharaLength = 100;

                        if (scope.abSplitNotification.notification.messageCharaLength >= 0) {
                            scope.abSplitNotification.notification.isMessageShorter = true;
                        } else {
                            scope.abSplitNotification.notification.messageCharaLength = 0;
                            scope.abSplitNotification.notification.isMessageShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmSource') {
                        if (scope.abSplitNotification.notification.uTMSource)
                            scope.abSplitNotification.notification.utmSourceCharaLength = 50 - scope.abSplitNotification.notification.uTMSource.length;
                        else
                            scope.abSplitNotification.notification.utmSourceCharaLength = 50;
                        if (scope.abSplitNotification.notification.utmSourceCharaLength >= 0) {
                            scope.abSplitNotification.notification.isUtmSourceShorter = true;
                        } else {
                            scope.abSplitNotification.notification.utmSourceCharaLength = 0;
                            scope.abSplitNotification.notification.isUtmSourceShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmMedium') {
                        if (scope.abSplitNotification.notification.uTMMedium)
                            scope.abSplitNotification.notification.utmMediumCharaLength = 50 - scope.abSplitNotification.notification.uTMMedium.length;
                        else
                            scope.abSplitNotification.notification.utmMediumCharaLength = 50;
                        if (scope.abSplitNotification.notification.utmMediumCharaLength >= 0) {
                            scope.abSplitNotification.notification.isUtmMediumShorter = true;
                        } else {
                            scope.abSplitNotification.notification.utmMediumCharaLength = 0;
                            scope.abSplitNotification.notification.isUtmMediumShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmCampaign') {
                        if (scope.abSplitNotification.notification.uTMCompaign)
                            scope.abSplitNotification.notification.utmCompaignCharaLength = 50 - scope.abSplitNotification.notification.uTMCompaign.length;
                        else
                            scope.abSplitNotification.notification.utmCompaignCharaLength = 50;
                        if (scope.abSplitNotification.notification.utmCompaignCharaLength >= 0) {
                            scope.abSplitNotification.notification.isUtmCompaignShorter = true;
                        } else {
                            scope.abSplitNotification.notification.utmCompaignCharaLength = 0;
                            scope.abSplitNotification.notification.isUtmCompaignShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmTerm') {
                        if (scope.abSplitNotification.notification.uTMTerm)
                            scope.abSplitNotification.notification.utmTermCharaLength = 50 - scope.abSplitNotification.notification.uTMTerm.length;
                        else
                            scope.abSplitNotification.notification.utmTermCharaLength = 50;
                        if (scope.abSplitNotification.notification.utmTermCharaLength >= 0) {
                            scope.abSplitNotification.notification.isUtmTermShorter = true;
                        } else {
                            scope.abSplitNotification.notification.utmTermCharaLength = 0;
                            scope.abSplitNotification.notification.isUtmTermShorter = false;
                        }
                    }
                    if (iAttrs.id === 'utmContent') {
                        if (scope.abSplitNotification.notification.uTMContent)
                            scope.abSplitNotification.notification.utmContentCharaLength = 50 - scope.abSplitNotification.notification.uTMContent.length;
                        else
                            scope.abSplitNotification.notification.utmContentCharaLength = 50;
                        if (scope.abSplitNotification.notification.utmContentCharaLength >= 0) {
                            scope.abSplitNotification.notification.isUtmContentShorter = true;
                        } else {
                            scope.abSplitNotification.notification.utmContentCharaLength = 0;
                            scope.abSplitNotification.notification.isUtmContentShorter = false;
                        }
                    }
                }, 1);
            });
        }
    }

})(window.angular);


