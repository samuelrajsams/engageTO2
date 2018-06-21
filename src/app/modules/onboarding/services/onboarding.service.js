(function (angular) {
    'use strict';
    angular
            .module('onboarding')
            .factory('OnboardingService', AuthService);
    AuthService.$inject = [
        '$http',
        '$q',
        'WEB_ENGAGETO_API_URL',
        '$localStorage'
    ];

    function AuthService(
            $http,
            $q,
            WEB_ENGAGETO_API_URL,
            $localStorage) {

        return {
            checkURLExists: checkURLExists,
            saveUserConfiguration: saveUserConfiguration,
            getAllPlans: getAllPlans
        };

        /*
         * @author: sandeep
         * @created: 07 jan 2017
         * @params: subDomain(string)
         * @return: success, error functions
         * @purpose: checkURLExists function
         */
        function checkURLExists(subDomain) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/subdomain/' + subDomain;
            var request = $http({
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl
            });
            return(request
                    .then(checkURLExistsSuccess)
                    .catch(checkURLExistsError));

            //checkURLExistsError function
            function checkURLExistsError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //checkURLExistsSuccess function
            function checkURLExistsSuccess(response) {
                return(response);
            }
        }

        /*
         * @author: sandeep
         * @created: 07 jan 2017
         * @params: subDomain(string)
         * @return: success, error functions
         * @purpose: saveUserConfiguration function
         */
        function saveUserConfiguration(configureObject) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/configure';
            var request = $http({
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl,
                data: configureObject
            });
            return(request
                    .then(saveUserConfigurationSuccess)
                    .catch(saveUserConfigurationError));

            //saveUserConfigurationError function
            function saveUserConfigurationError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //saveUserConfigurationSuccess function
            function saveUserConfigurationSuccess(response) {
                return(response);
            }
        }

        /*
         * @author: sandeep
         * @created: 17 apr 2017
         * @params: no
         * @return: success, error functions
         * @purpose: getAllPlans function
         */
        function getAllPlans() {
            var apiUrl = WEB_ENGAGETO_API_URL + 'plans';
            var request = $http({
                method: "GET",
                url: apiUrl
            });
            return(request
                    .then(getAllPlansSuccess)
                    .catch(getAllPlansError));

            //getAllPlansError function
            function getAllPlansError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getAllPlansSuccess function
            function getAllPlansSuccess(response) {
                return(response);
            }
        }
    }
})(window.angular);
