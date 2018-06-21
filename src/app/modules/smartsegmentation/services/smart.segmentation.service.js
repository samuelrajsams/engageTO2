(function (angular) {

    'use strict';

    angular
            .module('smartSegmentation')
            .factory('SmartSegmentationService', smartSegmentationService);

    smartSegmentationService.$inject = [
        '$http',
        'SmartSegmentConstant',
        '$q',
        'WEB_ENGAGETO_API_URL',
        '$localStorage',
        '$rootScope',
        'Country_List'
    ];

    function smartSegmentationService(
            $http,
            SmartSegmentConstant,
            $q,
            WEB_ENGAGETO_API_URL,
            $localStorage,
            $rootScope,
            Country_List) {
        return {
            addSegment: addSegment,
            getSegments: getSegments,
            getSegmentById: getSegmentById,
            updateSegment: updateSegment,
            deleteSegment: deleteSegment,
            getSubscribers: getSubscribers,
            getSmartSegmentValues: getSmartSegmentValues,
            getSmartSegmentConditionValues: getSmartSegmentConditionValues,
            getCountryList: getCountryList,
            getCitiesByCountry: getCitiesByCountry,
            getCitiesByParam: getCitiesByParam
        };

        /*
         * @author: sandeep
         * @created: 13 jan 2016
         * @params: data(object)
         * @return: success, error functions
         * @purpose: add segment
         */
        function addSegment(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+$localStorage.user_id+'/domains/'+$localStorage.domain_referer+'/segments';
//            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+$localStorage.user_id+'/domains/7bc6dcc0-d994-11e6-87ba-4f23c1354824/segments';
            var request = $http({
                method: "POST",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: data
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
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 05 dec 2016
         * @params: no
         * @return: success, error functions
         * @purpose: get segments
         */
        function getSegments() {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+$localStorage.user_id+'/domains/'+$localStorage.domain_referer+'/segments';
//            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+$localStorage.user_id+'/domains/7bc6dcc0-d994-11e6-87ba-4f23c1354824/segments';
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
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 13 jan 2016
         * @params: segmentId(number)
         * @return: success, error functions
         * @purpose: get segment by id
         */
        function getSegmentById(segmentId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+$localStorage.user_id+'/domains/'+$localStorage.domain_referer+'/segments/'+segmentId;
//            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+$localStorage.user_id+'/domains/7bc6dcc0-d994-11e6-87ba-4f23c1354824/segments/'+segmentId;
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
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 05 dec 2016
         * @params: segmentData(boject), segmentId(number)
         * @return: success, error functions
         * @purpose: update segment
         */
        function updateSegment(segmentData, segmentId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+$localStorage.user_id+'/domains/'+$localStorage.domain_referer+'/segments/'+segmentId;
//            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+$localStorage.user_id+'/domains/7bc6dcc0-d994-11e6-87ba-4f23c1354824/segments/'+segmentId;
            var request = $http({
                method: "PUT",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: segmentData
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
         * @created: 05 dec 2016
         * @params: segmentId(number)
         * @return: success, error functions
         * @purpose: delete segment
         * @modified: 16 jan 2017
         * @modified by: sandeep(added api calls with params)
         */
        function deleteSegment(segmentId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+$localStorage.user_id+'/domains/'+$localStorage.domain_referer+'/segments/'+segmentId;
//            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+$localStorage.user_id+'/domains/7bc6dcc0-d994-11e6-87ba-4f23c1354824/segments/'+segmentId;
            var request = $http({
                method: "DELETE",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                }
            });
            return(request
                    .then(deleteSegmentSuccess)
                    .catch(deleteSegmentError));

            //deleteSegment error function
            function deleteSegmentError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //deleteSegment success function
            function deleteSegmentSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 15 feb 2017
         * @params: segmentData
         * @return: success, error functions
         * @purpose: getSubscribers
         */
        function getSubscribers(segmentData) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+$localStorage.user_id+'/domains/'+$localStorage.domain_referer+'/segments/subscribers';
//            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+$localStorage.user_id+'/domains/7bc6dcc0-d994-11e6-87ba-4f23c1354824/segments/'+segmentId;
            var request = $http({
                method: "POST",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: segmentData
            });
            return(request
                    .then(getSubscribersSuccess)
                    .catch(getSubscribersError));

            //getSubscribers error function
            function getSubscribersError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getSubscribers success function
            function getSubscribersSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 05 dec 2016
         * @params: no
         * @return: no
         * @purpose: getting smart segment values
         */
        function getSmartSegmentValues() {
            return {
                segmentName: 'Pricing',
                segmentType: 'Audience Segment',
                totalSubscribers: '300',
                load: true
            };
        }
        /*
         * @author: sandeep
         * @created: 05 dec 2016
         * @params: no
         * @return: no
         * @purpose: getting smart segment condition values
         */
        function getSmartSegmentConditionValues() {
            return {
                selectedCategory: 'Select Category',
                selectedConditionOne: 'Select Condition',
                countryList: getCountryList(),
                selectedCountry: '',
                autocompleteList: [],
                selectedAutocomplete: '',
                selectedWildcard: '',
                allCityList: [],
                selectedCities: '',
                selectedConditionTwo: 'Select Condition',
                versionNumber: '',
                isVersionValid: true,
                isVersionBlured: false,
                searchUrl: '',
                isUrlBlured: false,
                isUrlValid: true,
                urlKeywords: '',
                subscriberDate: '',
                trafficKeywords: ''
            };
        }
        /*
         * @author: sandeep
         * @created: 07 dec 2016
         * @params: no
         * @return: segment country list
         * @purpose: defining countries for segment
         */
        function getCountryList() {
            return Country_List;
        }

        /*
         * @author: sandeep
         * @created: 08 dec 2016
         * @params: country(string)
         * @return: citiesList(array)
         * @purpose: getting list of cities based on country
         */
        function getCitiesByCountry(countryName) {
            var deferred = $q.defer();
            angular.forEach(SmartSegmentConstant.cityWithCountry, function (v, k) {
                if (k === countryName) {
                    console.log('Matched...');
                    deferred.resolve(v);
                }
            });
            return deferred.promise;
        }
        /*
         * @author: sandeep
         * @created: 08 dec 2016
         * @params: param(string)
         * @return: citiesList(array)
         * @purpose: getting list of cities based on param
         */
        function getCitiesByParam(param) {
            var geoCityApi = 'http://gd.geobytes.com/AutoCompleteCity?callback=JSON_CALLBACK&q=' + param;
            var request = $http({
                url: geoCityApi,
                method: 'JSONP'
            });
            return(request
                    .then(getCitiesByParamSuccess)
                    .catch(getCitiesByParamError));

            //getCitiesByParam error function
            function getCitiesByParamError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return((response.data));
                }
                // Otherwise, use expected error message.
                return((response.data.message));
            }

            //getCitiesByParam success function
            function getCitiesByParamSuccess(response) {
                console.log(response);
                return response;
            }
        }
    }
})(window.angular);
