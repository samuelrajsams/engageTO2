(function (angular) {
    'use strict';
    angular
            .module('smartAutomation')
            .directive('rssFeedValidator', rssFeedValidatorDirective);
    rssFeedValidatorDirective.$inject = [
        '$timeout'
    ];
    function rssFeedValidatorDirective(
            $timeout) {
        return {
            restirct: 'A',
            link: rssFeedValidatorLink
        };

        function rssFeedValidatorLink(scope, iElement, iAttrs) {
            //blur event on fields
            iElement.on('blur', function () {
                var urlRegex = /^(http[s]?:\/\/www\.|HTTP[S]?:\/\/WWW\.|http[s]?:\/\/|HTTP[S]?:\/\/|www\.|WWW\.|[A-Za-z]{0})[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
                $timeout(function () {
                    if (iAttrs.id === 'rss-feed-name') {
                        scope.addRssFeed.rssFeed.isNameBlured = true;
                        scope.addRssFeed.rssFeed.name === '' ? scope.addRssFeed.rssFeed.isNameRequired = true : scope.addRssFeed.rssFeed.isNameRequired = false;
                    }
                    if (iAttrs.id === 'rss-feed-url') {
                        scope.addRssFeed.rssFeed.isUrlBlured = true;
                        if (scope.addRssFeed.rssFeed.url) {
                            var field = scope.addRssFeed.rssFeed.url;
                            scope.addRssFeed.rssFeed.isUrlValid = urlRegex.test(field);
                        } else {
                            scope.addRssFeed.rssFeed.isUrlRequired = true;
                        }
                    }
                }, 1);
            });
            //focus event on fields
            iElement.on('focus', function () {
                $timeout(function () {
                    if (iAttrs.id === 'rss-feed-name') {
                        scope.addRssFeed.rssFeed.isNameBlured = false;
                        scope.addRssFeed.rssFeed.isNameRequired = false;
                    }
                    if (iAttrs.id === 'rss-feed-url') {
                        scope.addRssFeed.rssFeed.isUrlBlured = false;
                        scope.addRssFeed.rssFeed.isUrlRequired = false;
                        scope.addRssFeed.rssFeed.isUrlValid = true;
                    }
                }, 1);
            });
        }
    }
})(window.angular);