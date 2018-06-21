(function (angular) {

    'use strict';

    angular
            .module('allNotifications')
            .factory('AllNotificationsService', allNotificationsService);

    allNotificationsService.$inject = [
        '$http',
        '$q',
        'WEB_ENGAGETO_API_URL',
        '$localStorage'
    ];

    function allNotificationsService(
            $http,
            $q,
            WEB_ENGAGETO_API_URL,
            $localStorage) {
        return {
            getSentPushNotifications: getSentPushNotifications,
            getSavedPushNotifications: getSavedPushNotifications,
            deleteSentPushNotification: deleteSentPushNotification,
            deleteSavedPushNotification: deleteSavedPushNotification,
            deleteWelcomeNotification: deleteWelcomeNotification,
            deleteScheduleNotification: deleteScheduleNotification,
            getScheduledPushNotifications: getScheduledPushNotifications,
            getWelcomeNotifications: getWelcomeNotifications,
            getNotificationInsightById: getNotificationInsightById,
            downloadReport: downloadReport
        };
        /*
         * @author: sandeep
         * @created: 27 dec 2016
         * @params: data(object)
         * @return: success, error functions
         * @purpose: Get sent push notifications
         */
        function getSentPushNotifications(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+ $localStorage.user_id +'/domains/'+$localStorage.domain_referer+'/sentnotifications';
            var request = $http({
                method: "POST",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                },
                data: data
            });
            return(request
                    .then(getSentPushNotificationsSuccess)
                    .catch(getSentPushNotificationsError));

            //getSentPushNotifications error function
            function getSentPushNotificationsError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getSentPushNotifications success function
            function getSentPushNotificationsSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 27 dec 2016
         * @params: data(object)
         * @return: success, error functions
         * @purpose: Get saved push notifications
         */
        function getSavedPushNotifications(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+ $localStorage.user_id +'/domains/'+$localStorage.domain_referer+'/savednotifications';
            var request = $http({
                method: "POST",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                },
                data: data
            });
            return(request
                    .then(getSavedPushNotificationsSuccess)
                    .catch(getSavedPushNotificationsError));

            //getSavedPushNotifications error function
            function getSavedPushNotificationsError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getSavedPushNotifications success function
            function getSavedPushNotificationsSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 17 may 2017
         * @params: id(object)
         * @return: success, error functions
         * @purpose: delete sent push notifications
         */
        function deleteSentPushNotification(id) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+ $localStorage.user_id +'/domains/'+$localStorage.domain_referer+'/sentnotifications/'+id;
            var request = $http({
                method: "DELETE",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                }
            });
            return(request
                    .then(deleteSentPushNotificationSuccess)
                    .catch(deleteSentPushNotificationError));

            //deleteSentPushNotification error function
            function deleteSentPushNotificationError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //deleteSentPushNotification success function
            function deleteSentPushNotificationSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 17 may 2017
         * @params: id(object)
         * @return: success, error functions
         * @purpose: delete saved push notifications
         */
        function deleteSavedPushNotification(id) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+ $localStorage.user_id +'/domains/'+$localStorage.domain_referer+'/savednotifications/'+id;
            var request = $http({
                method: "DELETE",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                }
            });
            return(request
                    .then(deleteSavedPushNotificationSuccess)
                    .catch(deleteSavedPushNotificationError));

            //deleteSavedPushNotification error function
            function deleteSavedPushNotificationError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //deleteSavedPushNotification success function
            function deleteSavedPushNotificationSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 22 may 2017
         * @params: id(object)
         * @return: success, error functions
         * @purpose: delete welcome notifications
         */
        function deleteWelcomeNotification(id) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+ $localStorage.user_id +'/domains/'+$localStorage.domain_referer+'/welcomenotifications/'+id;
            var request = $http({
                method: "DELETE",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                }
            });
            return(request
                    .then(deleteWelcomeNotificationSuccess)
                    .catch(deleteWelcomeNotificationError));

            //deleteWelcomeNotification error function
            function deleteWelcomeNotificationError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //deleteWelcomeNotification success function
            function deleteWelcomeNotificationSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 08 jun 2017
         * @params: id(object)
         * @return: success, error functions
         * @purpose: delete schedule notifications
         */
        function deleteScheduleNotification(id) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+ $localStorage.user_id +'/domains/'+$localStorage.domain_referer+'/schedulednotifications/'+id;
            var request = $http({
                method: "DELETE",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                }
            });
            return(request
                    .then(deleteScheduleNotificationSuccess)
                    .catch(deleteScheduleNotificationError));

            //deleteScheduleNotification error function
            function deleteScheduleNotificationError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //deleteScheduleNotification success function
            function deleteScheduleNotificationSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 27 dec 2016
         * @params: dateRangeData(object)
         * @return: success, error functions
         * @purpose: Get scheduled push notifications
         */
        function getScheduledPushNotifications(dateRangeData) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+ $localStorage.user_id +'/domains/'+$localStorage.domain_referer+'/schedulednotifications';
            var request = $http({
                method: "POST",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                },
                data: dateRangeData
            });
            return(request
                    .then(getScheduledPushNotificationsSuccess)
                    .catch(getScheduledPushNotificationsError));

            //getScheduledPushNotifications error function
            function getScheduledPushNotificationsError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getScheduledPushNotifications success function
            function getScheduledPushNotificationsSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 02 jan 2016
         * @params: paramsData(object)
         * @return: success, error functions
         * @purpose: getWelcomeNotifications function
         */
        function getWelcomeNotifications(welcomeData) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+$localStorage.user_id+'/domains/'+$localStorage.domain_referer+'/getwelcomenotifications';
            var request = $http({
                method: "POST",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                },
                data: welcomeData
            });
            return(request
                    .then(getWelcomeNotificationsSuccess)
                    .catch(getWelcomeNotificationsError));

            //getWelcomeNotifications error function
            function getWelcomeNotificationsError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getWelcomeNotifications success function
            function getWelcomeNotificationsSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 16 may 2017
         * @params: notificationId(number)
         * @return: success, error functions
         * @purpose: getNotificationInsightById function
         */
        function getNotificationInsightById(notificationId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+$localStorage.user_id+'/domains/'+$localStorage.domain_referer+'/sentnotifications/'+notificationId;
            var request = $http({
                method: "GET",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                }
            });
            return(request
                    .then(getNotificationInsightByIdSuccess)
                    .catch(getNotificationInsightByIdError));

            //getNotificationInsightById error function
            function getNotificationInsightByIdError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getNotificationInsightById success function
            function getNotificationInsightByIdSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 20 may 2017
         * @params: reportData(object), tabType(number)
         * @return: success, error functions
         * @purpose: downloadReport function
         */
        function downloadReport(reportData, tabType) {
            tabType === 0 ? tabType = 'sentnotifications' : tabType === 2 ? tabType = 'savednotifications' : tabType === 4 ? tabType = 'getwelcomenotifications' : '';
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+$localStorage.user_id+'/domains/'+$localStorage.domain_referer+'/'+tabType;
            var request = $http({
                method: "POST",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                },
                data: reportData
            });
            return(request
                    .then(downloadReportSuccess)
                    .catch(downloadReportError));

            //downloadReport error function
            function downloadReportError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //downloadReport success function
            function downloadReportSuccess(response) {
                return(response);
            }
        }
    }
})(window.angular);
