(function (angular) {

    'use strict';

    angular
            .module('website')
            .factory('WebsiteService', websiteService);

    websiteService.$inject = [
        '$http',
        '$q',
        'WEB_ENGAGETO_API_URL',
        '$localStorage'
    ];

    function websiteService(
            $http,
            $q,
            WEB_ENGAGETO_API_URL,
            $localStorage) {

        return {
            addWebsite: addWebsite,
            updateWebsite: updateWebsite,
            getWebsiteList: getWebsiteList,
            deleteWebsite: deleteWebsite,
            getWebsiteVerified: getWebsiteVerified,
            showInstallationCode: showInstallationCode,
            getWebsiteDetails: getWebsiteDetails,
            reActiveDomain: reActiveDomain,
            reNameDomain: reNameDomain
        };

        /*
         * @author: sandeep
         * @created: 30-11-2016
         * @params: data(object)
         * @return: success, error functions
         * @purpose: Add website
         * @modified: 29 dec 2016
         * @modified by: sandeep(added api calls)
         */
        function addWebsite(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains';
            var request = $http({
                method: "POST",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                },
                data: data
            });
            return(request
                    .then(addWebsiteSuccess)
                    .catch(addWebsiteError));

            //addWebsite error function
            function addWebsiteError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //addWebsite success function
            function addWebsiteSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 30-11-2016
         * @params: 
         * @return: success, error functions
         * @purpose: Update website
         */
        function updateWebsite(data, domainId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + domainId;
            var request = $http({
                method: "PUT",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                },
                data: data
            });
            return(request
                    .then(updateWebsiteSuccess)
                    .catch(updateWebsiteError));

            //updateWebsite error function
            function updateWebsiteError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //updateWebsite success function
            function updateWebsiteSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 29 dec 2016
         * @params: no
         * @return: success, error functions
         * @purpose: get website list
         */
        function getWebsiteList() {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains';
            var request = $http({
                method: "GET",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                }
            });
            return(request
                    .then(getWebsiteListSuccess)
                    .catch(getWebsiteListError));

            //getWebsiteList error function
            function getWebsiteListError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getWebsiteList success function
            function getWebsiteListSuccess(response) {
                if (response.data.data.length > 0) {
                    angular.forEach(response.data.data, function (domain, key) {
                        if (domain.domain_name === '') {
                            var subDomainName = extractRootDomain(domain.domain_address);
                            if (subDomainName.indexOf('.') !== -1)
                                domain.domain_name = subDomainName.split('.')[0];
                        }
                    });
                }
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 29 dec 2016
         * @params: no
         * @return: success, error functions
         * @purpose: deleteWebsite
         */
        function deleteWebsite(domainId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + domainId;
            var request = $http({
                method: "DELETE",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                }
            });
            return(request
                    .then(deleteWebsiteSuccess)
                    .catch(deleteWebsiteError));

            //deleteWebsite error function
            function deleteWebsiteError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //deleteWebsite success function
            function deleteWebsiteSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 29 dec 2016
         * @params: domainId
         * @return: success, error functions
         * @purpose: getWebsiteVerified
         */
        function getWebsiteVerified(domainId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + domainId + '/enable';
            var request = $http({
                method: "PUT",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                }
            });
            return(request
                    .then(getWebsiteVerifiedSuccess)
                    .catch(getWebsiteVerifiedError));

            //getWebsiteVerified error function
            function getWebsiteVerifiedError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getWebsiteVerified success function
            function getWebsiteVerifiedSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 02 may 2017
         * @params: domainId
         * @return: success, error functions
         * @purpose: showInstallationCode
         */
        function showInstallationCode(domainId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + domainId + '/code';
            var request = $http({
                method: "GET",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                }
            });
            return(request
                    .then(showInstallationCodeSuccess)
                    .catch(showInstallationCodeError));

            //showInstallationCode error function
            function showInstallationCodeError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //showInstallationCode success function
            function showInstallationCodeSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 05 may 2017
         * @params: domainId(number)
         * @return: success, error functions
         * @purpose: reActiveDomain function
         */
        function reActiveDomain(domainId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + domainId + '/enable';
            var request = $http({
                method: "PUT",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                }
            });
            return(request
                    .then(reActiveDomainSuccess)
                    .catch(reActiveDomainError));

            //reActiveDomain error function
            function reActiveDomainError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //reActiveDomain success function
            function reActiveDomainSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 05 may 2017
         * @params: domainId(number)
         * @return: success, error functions
         * @purpose: reNameDomain function
         */
        function reNameDomain(domainId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + domainId + '/override';
            var request = $http({
                method: "PUT",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                }
            });
            return(request
                    .then(reNameDomainSuccess)
                    .catch(reNameDomainError));

            //reNameDomain error function
            function reNameDomainError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //reNameDomain success function
            function reNameDomainSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 29 dec 2016
         * @params: no
         * @return: webstie details(object)
         * @purpose: get website details
         */
        function getWebsiteDetails() {
            return {
                websiteName: '',
                websiteAddress: '',
                subDomainName: '',
                isWebsiteRequired: false,
                isWebsiteAddressRequired: false,
                issubDomainNameRequired: false,
                isUrlValid: true,
                image: 'app/assets/images/blue-logo.png',
                logo: '',
                imageType: 'default',
                isEdit: false
            };
        }
        //focus event on fields
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
