(function (angular) {

    'use strict';
    angular
            .module('website')
            .directive('addWebsiteValidator', addWebsiteValidatorDirective);
    addWebsiteValidatorDirective.$inject = [
        '$timeout'
    ];
    function addWebsiteValidatorDirective(
            $timeout) {
        var addWebsiteValidatorDirective = {
            restrict: 'A',
            template: '',
            link: addWebsiteValidatorLink
        };
        return addWebsiteValidatorDirective;
        function addWebsiteValidatorLink(scope, iElement, iAttrs) {
            //blur event on fields
            iElement.on('blur', function () {
                var urlRegex = /^(http[s]?:\/\/www\.|HTTP[S]?:\/\/WWW\.|http[s]?:\/\/|HTTP[S]?:\/\/|www\.|WWW\.|[A-Za-z]{0})[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
                $timeout(function () {
                    if (iAttrs.id === 'websiteName') {
                        scope.website.add_website.websiteName === '' || !scope.website.add_website.websiteName ? scope.website.add_website.isWebsiteRequired = true : scope.website.add_website.isWebsiteRequired = false;
                    }
                    if (iAttrs.id === 'subDomainName') {
                        scope.website.add_website.subDomainName === '' || !scope.website.add_website.subDomainName ? scope.website.add_website.issubDomainNameRequired = true : scope.website.add_website.issubDomainNameRequired = false;
                    }
                    if (iAttrs.id === 'websiteAddress') {
                        scope.website.add_website.websiteAddress === '' || !scope.website.add_website.websiteAddress ? scope.website.add_website.isWebsiteAddressRequired = true : scope.website.add_website.isWebsiteAddressRequired = false;
                        if (scope.website.add_website.websiteAddress) {
                            var field = scope.website.add_website.websiteAddress;
                            scope.website.add_website.isUrlValid = urlRegex.test(field);
                        }
                    }
                }, 1);
            });
            //focus event on fields
            iElement.on('focus', function () {
                $timeout(function () {
                    if (iAttrs.id === 'websiteName') {
                        scope.website.add_website.isWebsiteRequired = undefined;
                    }
                    if (iAttrs.id === 'subDomainName') {
                        scope.website.add_website.issubDomainNameRequired = undefined;
                    }
                    if (iAttrs.id === 'websiteAddress') {
                        scope.website.add_website.isWebsiteAddressRequired = undefined;
                        scope.website.add_website.isUrlValid = true;
                    }
                }, 1);
            });
            //keypress event on fields
            iElement.on('keypress keyup', function () {
                console.log('iAttrs.id',iAttrs.id);
                var subDomainRegex = /^[a-zA-Z0-9]*$/;
                var domainNameRegex = /^[a-zA-Z0-9\s]+$/;
                $timeout(function () {
                    if (iAttrs.id === 'websiteAddress') {
                        var websiteUrl = scope.website.add_website.websiteAddress;
                        if (websiteUrl !== '' && websiteUrl) {
                            scope.website.add_website.subDomainName = extractRootDomain(websiteUrl);
                            if(scope.website.add_website.subDomainName.indexOf('.') !== -1)
                                scope.website.add_website.subDomainName = scope.website.add_website.subDomainName.split('.')[0];
                        }
                    }
                    if (iAttrs.id === 'subDomainName') {
                        var subDomainName = scope.website.add_website.subDomainName;
                        console.log('subDomainName', subDomainName, subDomainRegex.test(subDomainName));
                        scope.website.isSubDomainValid = subDomainRegex.test(subDomainName);
                    }
                    if (iAttrs.id === 'websiteName') {
                        var domainName = scope.website.add_website.websiteName;
                        console.log('domainName', domainName, domainNameRegex.test(domainName));
                        scope.website.isDomainNameValid = domainNameRegex.test(domainName);
                    }
                }, 1);
            });
        }

        function extractHostname(url) {
            var hostname;
            //find & remove protocol (http, ftp, etc.) and get the hostname
            if (url.indexOf("://") > -1) {
                hostname = url.split('/')[2];
            }
            else {
                hostname = url.split('/')[0];
            }
            //find & remove port number
            hostname = hostname.split(':')[0];

            return hostname;
        }
        // to address those who want the "root domain"
        function extractRootDomain(url) {
            var domain = extractHostname(url),
                    splitArr = domain.split('www.'),
                    arrLen = splitArr.length;
            //extracting the root domain here
            if (arrLen > 1) {
                domain = splitArr[arrLen - 1];
            }
            return domain;
        }
    }
})(window.angular);