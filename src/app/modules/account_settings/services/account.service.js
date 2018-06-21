(function (angular) {
    'use strict';
    angular
            .module('accountSettings')
            .factory('AccountService', accountService);
    accountService.$inject = [
        '$http',
        '$q',
        'WEB_ENGAGETO_API_URL',
        'ADMIN_ENGAGETO_API_URL',
        '$localStorage',
        '$rootScope',
        'SmartSegmentConstant',
        'Upload'
    ];

    function accountService(
            $http,
            $q,
            WEB_ENGAGETO_API_URL,
            ADMIN_ENGAGETO_API_URL,
            $localStorage,
            $rootScope,
            SmartSegmentConstant,
            Upload) {

        return {
            getAccountDetails: getAccountDetails,
            editAccountDetails: editAccountDetails,
            getPlanDetailsById: getPlanDetailsById,
            getCitiesByCountry: getCitiesByCountry,
            getUserDetails: getUserDetails,
            getPlanDetails: getPlanDetails,
            getEditUserDetails: getEditUserDetails,
            uploadProfileAvtar: uploadProfileAvtar
        };

        /*
         * @author: sandeep
         * @created: 29 nov 2016
         * @params: userId(number)
         * @return: success, error functions
         * @purpose: getAccountDetails
         */
        function getAccountDetails(userId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + userId;
            var request = $http({
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl
            });
            return(request
                    .then(getAccountDetailsSuccess)
                    .catch(getAccountDetailsError));

            //loginError function
            function getAccountDetailsError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //loginSuccess function
            function getAccountDetailsSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 01 dec 2016
         * @params: accountDetails(object), userId(number)
         * @return: success, error functions
         * @purpose: editAccountDetails
         */
        function editAccountDetails(accountDetails, userId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + userId;
            var request = $http({
                method: "PUT",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl,
                data: accountDetails
            });
            return(request
                    .then(editAccountDetailsSuccess)
                    .catch(editAccountDetailsError));

            //loginError function
            function editAccountDetailsError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //loginSuccess function
            function editAccountDetailsSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 01 dec 2016
         * @params: planId(number)
         * @return: success, error functions
         * @purpose: getPlanDetailsById
         */
        function getPlanDetailsById(planId) {
            var apiUrl = ADMIN_ENGAGETO_API_URL + 'plans/' + planId;
            var request = $http({
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl
            });
            return(request
                    .then(getPlanDetailsByIdSuccess)
                    .catch(getPlanDetailsByIdError));

            //loginError function
            function getPlanDetailsByIdError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //loginSuccess function
            function getPlanDetailsByIdSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 31 may 2017
         * @params: data(object)
         * @return: success, error functions
         * @purpose: uploadProfileAvtar
         */
        function uploadProfileAvtar(data) {
            var apiUrl = ADMIN_ENGAGETO_API_URL + 'users/'+$localStorage.user_id+'/avatar';
            var request = Upload.upload({
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: data,
                url: apiUrl
            });
            return(request
                    .then(uploadProfileAvtarSuccess)
                    .catch(uploadProfileAvtarError));

            //uploadProfileAvtarError function
            function uploadProfileAvtarError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //uploadProfileAvtarSuccess function
            function uploadProfileAvtarSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 17 dec 2016
         * @params: country(string)
         * @return: citiesList(array)
         * @purpose: getting list of cities based on country
         */
        function getCitiesByCountry(countryName) {
            var deferred = $q.defer();
            angular.forEach(SmartSegmentConstant.cityWithCountry, function (v, k) {
                if (k === countryName) {
                    deferred.resolve(v);
                }
            });
            return deferred.promise;
        }
        /*
         * @author: sandeep
         * @created: 19 dec 2016
         * @params: no
         * @return: userDetails(object)
         * @purpose: getUserDetails
         */
        function getUserDetails() {
            return {
                firstName: '',
                lastName: '',
                emailAddress: '',
                role: '',
                companyName: '',
                country: '',
                city: '',
                timeZone: '',
                successAlert: false,
                load: true
            };
        }
        /*
         * @author: sandeep
         * @created: 19 dec 2016
         * @params: no
         * @return: planDetails(object)
         * @purpose: getPlanDetails
         */
        function getPlanDetails() {
            return {
                planName: '',
                planCost: '',
                nextBillingDate: '',
                noOfSubscribers: '',
                noOfWebsites: '',
                noOfTeamMembers: '',
                noOfPushJourneys: '',
                noOfAPICalls: ''
            };
        }
        /*
         * @author: sandeep
         * @created: 19 dec 2016
         * @params: no
         * @return: userDetails(object)
         * @purpose: getEditUserDetails
         */
        function getEditUserDetails() {
            return {
                firstName: '',
                isFirstNameRequired: false,
                lastName: '',
                isLastNameRequired: false,
                emailAddress: '',
                isEmailAddressRequired: false,
                isUrlValid: true,
                companyName: '',
                country: '',
                city: '',
                timeZone: '',
                successAlert: false,
                dangerAlert: false,
                success: '',
                danger: '',
                load: false
            };
        }
    }
})(window.angular);
