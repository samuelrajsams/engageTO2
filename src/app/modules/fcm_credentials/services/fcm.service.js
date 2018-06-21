(function (angular) {

    'use strict';

    angular
            .module('fcm.credentials')
            .factory('FCMService', fCMService);

    fCMService.$inject = [
        '$http',
        '$q',
        'WEB_ENGAGETO_API_URL',
        '$localStorage',
        '$rootScope',
        'Upload',
        'Engageto_Default_Image'
    ];

    function fCMService(
            $http,
            $q,
            WEB_ENGAGETO_API_URL,
            $localStorage,
            $rootScope,
            Upload,
            Engageto_Default_Image) {

        return {
            saveFCMDetails: saveFCMDetails
        };
        /*
         * @author: sandeep
         * @created: 07 jun 2017
         * @params: data (object)
         * @return: success, error functions
         * @purpose: saveFCMDetails function
         */
        function saveFCMDetails(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/fcm';
            var request = $http({
                method: "POST",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                }
            });
            return(request
                    .then(saveFCMDetailsSuccess)
                    .catch(saveFCMDetailsError));

            //saveFCMDetails function
            function saveFCMDetailsError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //saveFCMDetails function
            function saveFCMDetailsSuccess(response) {
                return(response);
            }
        }        
    }
})(window.angular);
