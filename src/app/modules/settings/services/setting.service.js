(function (angular) {
    'use strict';
    angular
            .module('settings')
            .factory('SettingService', settingService);
    settingService.$inject = [
        '$http',
        '$q',
        'WEB_ENGAGETO_API_URL',
        '$localStorage'
    ];

    function settingService(
            $http,
            $q,
            WEB_ENGAGETO_API_URL,
            $localStorage) {

        return {
            getRESTAPIKeyToken: getRESTAPIKeyToken,
            getOptinList: getOptinList,
            getOptinListByDomain: getOptinListByDomain,
            getOptinById: getOptinById,
            addOptin: addOptin,
            updateOptin: updateOptin,
            getSubOptinList: getSubOptinList,
            getSubOptinListByDomain: getSubOptinListByDomain,
            getSubOptinById: getSubOptinById,
            addSubOptin: addSubOptin,
            updateSubOptin: updateSubOptin,
            getDownloadFile:getDownloadFile
        };

        /*
         * @author: sandeep
         * @created: 13 jul 2017
         * @params: no
         * @return: success, error functions
         * @purpose: getRESTAPIKeyToken function
         */
        function getRESTAPIKeyToken() {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer;
            var request = $http({
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl
            });
            return(request
                    .then(getRESTAPIKeyTokenSuccess)
                    .catch(getRESTAPIKeyTokenError));

            //getRESTAPIKeyTokenError function
            function getRESTAPIKeyTokenError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getRESTAPIKeyTokenSuccess function
            function getRESTAPIKeyTokenSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 18 jul 2017
         * @params: no
         * @return: success, error functions
         * @purpose: getOptinList function
         */
        function getOptinList() {
            var apiUrl = WEB_ENGAGETO_API_URL + 'optins';
            var request = $http({
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl
            });
            return(request
                    .then(getOptinListSuccess)
                    .catch(getOptinListError));

            //getOptinListError function
            function getOptinListError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getOptinListSuccess function
            function getOptinListSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 19 jul 2017
         * @params: no
         * @return: success, error functions
         * @purpose: getOptinListByDomain function
         */
        function getOptinListByDomain() {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+ $localStorage.user_id +'/domains/'+ $localStorage.domain_referer +'/optins';
            var request = $http({
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl
            });
            return(request
                    .then(getOptinListByDomainSuccess)
                    .catch(getOptinListByDomainError));

            //getOptinListByDomainError function
            function getOptinListByDomainError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getOptinListByDomainSuccess function
            function getOptinListByDomainSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 18 jul 2017
         * @params: optinId(number)
         * @return: success, error functions
         * @purpose: getOptinById function
         */
        function getOptinById(optinId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id +'/domains/' + $localStorage.domain_referer + '/optins/' + optinId;
            var request = $http({
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl
            });
            return(request
                    .then(getOptinByIdSuccess)
                    .catch(getOptinByIdError));

            //getOptinByIdError function
            function getOptinByIdError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getOptinByIdSuccess function
            function getOptinByIdSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 19 jul 2017
         * @params: optinData(object)
         * @return: success, error functions
         * @purpose: addOptin function
         */
        function addOptin(optinData) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id +'/domains/' + $localStorage.domain_referer + '/optins';
            var request = $http({
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl,
                data: optinData
            });
            return(request
                    .then(addOptinSuccess)
                    .catch(addOptinError));

            //addOptinError function
            function addOptinError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //addOptinSuccess function
            function addOptinSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 18 jul 2017
         * @params: optinData(object), optinReferer(number)
         * @return: success, error functions
         * @purpose: updateOptin function
         */
        function updateOptin(optinData, optinReferer) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/optins/' + optinReferer;
            var request = $http({
                method: "PUT",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl,
                data: optinData
            });
            return(request
                    .then(updateOptinSuccess)
                    .catch(updateOptinError));

            //updateOptinError function
            function updateOptinError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //updateOptinSuccess function
            function updateOptinSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 24 jul 2017
         * @params: no
         * @return: success, error functions
         * @purpose: getSubOptinList function
         */
        function getSubOptinList() {
            var apiUrl = WEB_ENGAGETO_API_URL + 'suboptins';
            var request = $http({
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl
            });
            return(request
                    .then(getSubOptinListSuccess)
                    .catch(getSubOptinListError));

            //getSubOptinListError function
            function getSubOptinListError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getSubOptinListSuccess function
            function getSubOptinListSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 24 jul 2017
         * @params: no
         * @return: success, error functions
         * @purpose: getSubOptinListByDomain function
         */
        function getSubOptinListByDomain() {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+ $localStorage.user_id +'/domains/'+ $localStorage.domain_referer +'/suboptins';
            var request = $http({
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl
            });
            return(request
                    .then(getSubOptinListByDomainSuccess)
                    .catch(getSubOptinListByDomainError));

            //getSubOptinListByDomainError function
            function getSubOptinListByDomainError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getSubOptinListByDomainSuccess function
            function getSubOptinListByDomainSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 24 jul 2017
         * @params: subOptinId(number)
         * @return: success, error functions
         * @purpose: getSubOptinById function
         */
        function getSubOptinById(subOptinId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id +'/domains/' + $localStorage.domain_referer + '/suboptins/' + subOptinId;
            var request = $http({
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl
            });
            return(request
                    .then(getSubOptinByIdSuccess)
                    .catch(getSubOptinByIdError));

            //getSubOptinByIdError function
            function getSubOptinByIdError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getSubOptinByIdSuccess function
            function getSubOptinByIdSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 24 jul 2017
         * @params: subOptinData(object)
         * @return: success, error functions
         * @purpose: addSubOptin function
         */
        function addSubOptin(subOptinData) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id +'/domains/' + $localStorage.domain_referer + '/suboptins';
            var request = $http({
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl,
                data: subOptinData
            });
            return(request
                    .then(addSubOptinSuccess)
                    .catch(addSubOptinError));

            //addSubOptinError function
            function addSubOptinError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //addSubOptinSuccess function
            function addSubOptinSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 24 jul 2017
         * @params: subOptinData(object), subOptinReferer(number)
         * @return: success, error functions
         * @purpose: updateSubOptin function
         */
        function updateSubOptin(subOptinData, subOptinReferer) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/suboptins/' + subOptinReferer;
            var request = $http({
                method: "PUT",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl,
                data: subOptinData
            });
            return(request
                    .then(updateSubOptinSuccess)
                    .catch(updateSubOptinError));

            //updateSubOptinError function
            function updateSubOptinError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //updateSubOptinSuccess function
            function updateSubOptinSuccess(response) {
                return(response);
            }
        }
         /*
         * @author: anurag
         * @created: 11 sept 2017
         * @params: none
         * @return: success, error functions
         * @purpose: get file download link
         */
        function getDownloadFile(){
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/native-optin-files';
            var request = $http({
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl
            });
            return(request
                    .then(getDownloadFileSuccess)
                    .catch(getDownloadFileError));

            //updateSubOptinError function
            function getDownloadFileError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //updateSubOptinSuccess function
            function getDownloadFileSuccess(response) {
                return(response);
            }
        }
    }
})(window.angular);
