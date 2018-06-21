(function (angular) {

    'use strict';

    angular
            .module('smartAutomation')
            .factory('SmartAutomationService', smartAutomationService);

    smartAutomationService.$inject = [
        '$http',
        '$q',
        'WEB_ENGAGETO_API_URL',
        '$localStorage'
    ];

    function smartAutomationService(
            $http,
            $q,
            WEB_ENGAGETO_API_URL,
            $localStorage) {
        return {
            getSegments: getSegments,
            updateSegment: updateSegment,
            addRssFeed: addRssFeed,
            deleteRssFeed: deleteRssFeed,
            getSmartAutomationValues: getSmartAutomationValues
        };

        /*
         * @author: sandeep
         * @created: 09 dec 2016
         * @params: no
         * @return: success, error functions
         * @purpose: get segments
         */
        function getSegments() {
            var apiUrl = WEB_ENGAGETO_API_URL + '';
            var request = $http({
                method: "GET",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                }
            });
            return(request
                    .then(getSegmentsSuccess)
                    .catch(getSegmentsError));

            //getSegments error function
            function getSegmentsError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getSegments success function
            function getSegmentsSuccess(response) {
                return([]);
            }
        }
        /*
         * @author: sandeep
         * @created: 09 dec 2016
         * @params: 
         * @return: success, error functions
         * @purpose: update segment
         */
        function updateSegment() {
            var apiUrl = WEB_ENGAGETO_API_URL + '';
            var request = $http({
                method: "PUT",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                }
            });
            return(request
                    .then(updateSegmentSuccess)
                    .catch(updateSegmentError));

            //updateSegment error function
            function updateSegmentError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //updateSegment success function
            function updateSegmentSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 09 dec 2016
         * @params: 
         * @return: success, error functions
         * @purpose: add rss feed
         */
        function addRssFeed(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + '';
            var request = $http({
                method: "POST",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: data
            });
            return(request
                    .then(addRssFeedSuccess)
                    .catch(addRssFeedError));

            //addRssFeed error function
            function addRssFeedError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //addRssFeed success function
            function addRssFeedSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 09 dec 2016
         * @params: 
         * @return: success, error functions
         * @purpose: delete rss feed
         */
        function deleteRssFeed(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + '';
            var request = $http({
                method: "DELETE",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: data
            });
            return(request
                    .then(deleteRssFeedSuccess)
                    .catch(deleteRssFeedError));

            //deleteRssFeed error function
            function deleteRssFeedError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //deleteRssFeed success function
            function deleteRssFeedSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 09 dec 2016
         * @params: no
         * @return: no
         * @purpose: getting smart automation values
         */
        function getSmartAutomationValues() {
            return {
                name: '',
                isNameRequired: false,
                isNameBlured: false,
                url: '',
                isUrlRequired: false,
                isUrlBlured: false,
                isUrlValid: true,
                logo: ''
            };
        }
    }
})(window.angular);
