(function (angular) {

    'use strict';

    angular
        .module('notification')
        .factory('NotificationService', notificationService);

    notificationService.$inject = [
        '$http',
        '$q',
        'WEB_ENGAGETO_API_URL',
        '$localStorage',
        '$rootScope',
        'Upload',
        'Engageto_Default_Image'
    ];

    function notificationService(
        $http,
        $q,
        WEB_ENGAGETO_API_URL,
        $localStorage,
        $rootScope,
        Upload,
        Engageto_Default_Image) {

        return {
            getDomainList: getDomainList,
            getDomainById: getDomainById,
            addDomain: addDomain,
            deleteDomain: deleteDomain,
            sendNewPushNotification: sendNewPushNotification,
            sendPushNotificationWithImage: sendPushNotificationWithImage,
            getUploadedImageList: getUploadedImageList,
            getDefaultImage: getDefaultImage,
            uploadCroppedNotificationImage: uploadCroppedNotificationImage,
            getABSplitNotificationValues: getABSplitNotificationValues,
            getWelcomeNotificationValues: getWelcomeNotificationValues,
            getWelcomeAdvanceValues: getWelcomeAdvanceValues,
            getWelcomeAdvanceCtaValue: getWelcomeAdvanceCtaValue,
            createWelcomeNotification: createWelcomeNotification,
            createWelcomeNotificationWithImage: createWelcomeNotificationWithImage,
            getSegmentList: getSegmentList,
            getNotificationById: getNotificationById,
            updateSavedPushNotification: updateSavedPushNotification,
            getSubscriberDetails: getSubscriberDetails,
            getAllNotificationDetails: getAllNotificationDetails,
            timeZoneList: timeZoneList,
            getSegments: getSegments
        };

        /*
         * @author: sandeep
         * @created: 27-10-2016
         * @params: data (object)
         * @return: success, error functions
         * @purpose: Get domain list
         */
        function getDomainList(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + data.user_id + '/domains';
            var request = $http({
                method: "GET",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                }
            });
            return (request
                .then(getDomainListSuccess)
                .catch(getDomainListError));

            //getDomainList function
            function getDomainListError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return ($q.reject(response.data.message));
            }

            //getDomainList function
            function getDomainListSuccess(response) {
                if (response.data.data.length > 0) {
                    angular.forEach(response.data.data, function (domain, key) {
                        if (domain.domain_name === '') {
                            var subDomainName = extractRootDomain(domain.domain_address);
                            if (subDomainName.indexOf('.') !== -1)
                                domain.domain_name = subDomainName.split('.')[0];
                        }
                    });
                }
                return (response);
            }
        }
        /*
         * @author: sandeep
         * @created: 27-10-2016
         * @params: domain id, user id(object)
         * @return: success, error functions
         * @purpose: Get domain by id
         */
        function getDomainById(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + data.user_id + '/domains/' + data.domain_id;
            var request = $http({
                method: "GET",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                }
            });
            return (request
                .then(getDomainByIdSuccess)
                .catch(getDomainByIdError));

            //getDomainById function
            function getDomainByIdError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return ($q.reject(response.data.message));
            }

            //getDomainById function
            function getDomainByIdSuccess(response) {
                return (response);
            }
        }
        /*
         * @author: sandeep
         * @created: 27-10-2016
         * @params: domain name, user id(object)
         * @return: success, error functions
         * @purpose: Add domain
         */
        function addDomain(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + data.user_id + '/domains';
            var request = $http({
                method: "POST",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                },
                data: {
                    domain_name: data.domain_name
                }
            });
            return (request
                .then(addDomainSuccess)
                .catch(addDomainError));

            //addDomain function
            function addDomainError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return ($q.reject(response.data.message));
            }

            //addDomain function
            function addDomainSuccess(response) {
                return (response);
            }
        }
        /*
         * @author: sandeep
         * @created: 27-10-2016
         * @params: user id and domain id(object)
         * @return: success, error functions
         * @purpose: Delete domain
         */
        function deleteDomain(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + data.user_id + '/domains';
            var request = $http({
                method: "POST",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: data
            });
            return (request
                .then(deleteDomainSuccess)
                .catch(deleteDomainError));

            //deleteDomain function
            function deleteDomainError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return ($q.reject(response.data.message));
            }

            //deleteDomain function
            function deleteDomainSuccess(response) {
                return (response);
            }
        }
        /*
         * @author: sandeep
         * @created: 02-11-2016
         * @params: data(object), scheduledId(number)
         * @return: success, error functions
         * @purpose: sendNewPushNotification function
         */
        function sendNewPushNotification(data, scheduledId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/notifications';
            var method = 'POST';
            if (scheduledId) {
                apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/schedulednotifications/' + scheduledId;
                method = 'PUT';
            }
            var request = $http({
                method: method,
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: data
            });
            return (request
                .then(sendNewPushNotificationSuccess)
                .catch(sendNewPushNotificationError));

            //sendNewPushNotification function
            function sendNewPushNotificationError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return ($q.reject(response.data.message));
            }

            //sendNewPushNotification function
            function sendNewPushNotificationSuccess(response) {
                return (response);
            }
        }
        /*
         * @author: sandeep
         * @created: 18 nov 2016
         * @params: data(object)
         * @return: success, error functions
         * @purpose: sendPushNotificationWithImage function
         */
        function sendPushNotificationWithImage(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/notifications';
            var request = Upload.upload({
                url: apiUrl,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: data
            });
            return (request
                .then(sendPushNotificationWithImageSuccess)
                .catch(sendPushNotificationWithImageError));

            //sendNewPushNotification function
            function sendPushNotificationWithImageError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return ($q.reject(response.data.message));
            }

            //sendNewPushNotification function
            function sendPushNotificationWithImageSuccess(response) {
                return (response);
            }
        }
        /*
         * @author: sandeep
         * @created: 14 may 2017
         * @params: no
         * @return: success, error functions
         * @purpose: getUploadedImageList function
         */
        function getUploadedImageList() {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/image';
            var request = $http({
                url: apiUrl,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                }
            });
            return (request
                .then(getUploadedImageListSuccess)
                .catch(getUploadedImageListError));

            //getUploadedImageList function
            function getUploadedImageListError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return ($q.reject(response.data.message));
            }

            //getUploadedImageList function
            function getUploadedImageListSuccess(response) {
                return (response);
            }
        }
        /*
         * @author: sandeep
         * @created: 19 may 2017
         * @params: no
         * @return: success, error functions
         * @purpose: getDefaultImage function
         */
        function getDefaultImage() {
            var apiUrl = WEB_ENGAGETO_API_URL + 'default/image';
            var request = $http({
                url: apiUrl,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                }
            });
            return (request
                .then(getDefaultImageSuccess)
                .catch(getDefaultImageError));

            //getDefaultImage function
            function getDefaultImageError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return ($q.reject(response.data.message));
            }

            //getDefaultImage function
            function getDefaultImageSuccess(response) {
                return (response);
            }
        }
        /*
         * @author: sandeep
         * @created: 15 may 2017
         * @params: data(object)
         * @return: success, error functions
         * @purpose: uploadCroppedNotificationImage function
         */
        function uploadCroppedNotificationImage(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/image';
            var request = Upload.upload({
                url: apiUrl,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: data
            });
            return (request
                .then(uploadCroppedNotificationImageSuccess)
                .catch(uploadCroppedNotificationImageError));

            //uploadCroppedNotificationImage function
            function uploadCroppedNotificationImageError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return ($q.reject(response.data.message));
            }

            //uploadCroppedNotificationImage function
            function uploadCroppedNotificationImageSuccess(response) {
                return (response);
            }
        }
        /*
         * @author: sandeep
         * @created: 29 nov 2016
         * @params: no
         * @return: notification(object)
         * @purpose: getABSplitNotificationValues function
         */
        function getABSplitNotificationValues() {
            return {
                advanceOptions: {
                    cta: [{
                        label: 'First CTA Text',
                        text: '',
                        isCtaTextShorter: true,
                        isCtaTextRequired: false,
                        isCtaTextBlured: false,
                        ctaTextCharaLength: 12,
                        value: 'First CTA URL',
                        url: '',
                        isCtaUrlValid: undefined,
                        isCtaUrlBlured: false,
                        isCtaUrlRequired: false,
                        uTMSource: 'engageto',
                        isUTMSourceShorter: true,
                        utmSourceCharLength: 40,
                        isUTMSourceBlured: false,
                        isUTMSourceRequired: false,
                        uTMMedium: 'web-push-notification',
                        isUTMMediumShorter: true,
                        utmMediumCharLength: 29,
                        isUTMMediumBlured: false,
                        uTMCompaign: '',
                        isUTMCampaignShorter: true,
                        utmCampaignCharLength: 50,
                        isUTMCampaignBlured: false,
                        uTMTerm: '',
                        isUTMTermShorter: true,
                        utmTermCharLength: 50,
                        isUTMTermBlured: false,
                        uTMContent: '',
                        isUTMContentShorter: true,
                        utmContentCharLength: 50,
                        isUTMContentBlured: false,
                        isAddUTMParametersRequired: false
                    }],
                    expiryType: 'Days',
                    expiryValue: null,
                    isExpiryBlured: false,
                    isExpiryValid: true,
                    isDurationInSecs: 'unlimited',
                    durationInSecs: null,
                    isDUrationBlured: false,
                    isDurationValid: true,
                    advanceSegment: 'Include',
                    advanceSegmentValue: ''
                },
                notification: {
                    title: '',
                    isTitleRequired: undefined,
                    titleCharaLength: 50,
                    isTitleShorter: true,
                    message: '',
                    isMessageRequired: undefined,
                    messageCharaLength: 100,
                    isMessageShorter: true,
                    url: '',
                    isUrlValid: undefined,
                    isUTMParametersRequired: false,
                    uTMSource: 'engageto',
                    isUtmSourceRequired: false,
                    utmSourceCharaLength: 40,
                    invalidUTMSourcePattern: false,
                    isUtmSourceShorter: true,
                    uTMMedium: 'web-push_-notification',
                    utmMediumCharaLength: 29,
                    invalidUTMMediumPattern: false,
                    isUtmMediumShorter: true,
                    isUtmMediumBlured: true,
                    uTMCompaign: '',
                    utmCompaignCharaLength: 50,
                    invalidUTMCompaignPattern: false,
                    isUtmCompaignShorter: true,
                    isUtmCompaignBlured: true,
                    uTMTerm: '',
                    utmTermCharaLength: 50,
                    invalidUTMTermPattern: false,
                    isUtmTermShorter: true,
                    isUtmTermBlured: false,
                    uTMContent: '',
                    utmContentCharaLength: 50,
                    invalidUTMContentPattern: false,
                    isUtmContentShorter: true,
                    isUtmContentBlured: false,
                    image: 'app/assets/images/blue-logo.png',
                    logo: ''
                }
            };
        }
        /*
         * @author: sandeep
         * @created: 13 dec 2016
         * @params: no
         * @return: notification(object)
         * @purpose: getWelcomeNotificationValues function
         */
        function getWelcomeNotificationValues() {
            return {
                title: '',
                isTitleRequired: undefined,
                isTitleBlured: false,
                titleCharaLength: 50,
                isTitleShorter: true,
                description: '',
                isDescriptionRequired: undefined,
                isDecriptionBlured: false,
                descriptionCharaLength: 100,
                isDescriptionShorter: true,
                url: '',
                isURLRequired: false,
                isUrlValid: undefined,
                isUTMParametersRequired: false,
                uTMSource: 'browser',
                utmSourceCharaLength: 43,
                isUtmSourceShorter: true,
                isUtmSourceRequired: undefined,
                invalidUTMSourcePattern: false,
                uTMMedium: 'push-notification',
                utmMediumCharaLength: 33,
                isUtmMediumShorter: true,
                invalidUTMMediumPattern: false,
                isUtmMediumBlured: false,
                uTMCampaign: 'engageto-notification',
                utmCompaignCharaLength: 21,
                isUtmCompaignShorter: true,
                invalidUTMCompaignPattern: false,
                isUtmCompaignBlured: false,
                uTMTerm: '',
                utmTermCharaLength: 50,
                isUtmTermShorter: true,
                invalidUTMTermPattern: false,
                isUtmTermBlured: false,
                uTMContent: '',
                utmContentCharaLength: 50,
                isUtmContentShorter: true,
                invalidUTMContentPattern: false,
                isUtmContentBlured: false,
                image: Engageto_Default_Image,
                logo: '',
                imageType: 'default'
            };
        }
        /*
         * @author: sandeep
         * @created: 13 dec 2016
         * @params: no
         * @return: advanceOptions(object)
         * @purpose: getWelcomeAdvanceValues function
         */
        function getWelcomeAdvanceValues() {
            return {
                cta: [{
                    label: 'First CTA Text',
                    text: '',
                    isCtaTextShorter: true,
                    isCtaTextBlured: false,
                    ctaTextCharaLength: 12,
                    isCtaTextRequired: false,
                    value: 'First CTA URL',
                    url: '',
                    isCtaUrlValid: undefined,
                    isCtaUrlBlured: false,
                    isCtaUrlRequired: false,
                    isAddUTMParametersRequired: false,
                    uTMSource: 'engageto',
                    utmSourceCharLength: 40,
                    isUTMSourceBlured: false,
                    invalidUTMSourcePattern: false,
                    isUTMSourceShorter: true,
                    isUTMSourceRequired: false,
                    uTMMedium: 'web-push-notification',
                    utmMediumCharLength: 29,
                    isUTMMediumShorter: true,
                    invalidUTMMediumPattern: false,
                    isUTMMediumBlured: false,
                    uTMCampaign: '',
                    utmCampaignCharLength: 50,
                    isUTMCampaignBlured: false,
                    invalidUTMCampaignPattern: false,
                    isUTMCampaignShorter: true,
                    uTMTerm: '',
                    utmTermCharLength: 50,
                    isUTMTermBlured: false,
                    invalidUTMTermPattern: false,
                    isUTMTermShorter: true,
                    uTMContent: '',
                    utmContentCharLength: 50,
                    isUTMContentBlured: false,
                    invalidUTMContentPattern: false,
                    isUTMContentShorter: true
                }],
                expiryType: 'Days',
                expiryValue: '',
                isExpiryValid: true,
                isExpiryBlured: false,
                isDurationInSecs: 'unlimited',
                durationInSecs: '',
                isDurationValid: true,
                isDurationBlured: false
            };
        }
        /*
         * @author: sandeep
         * @created: 13 dec 2016
         * @params: no
         * @return: cta(object)
         * @purpose: getWelcomeAdvanceCtaValue function
         */
        function getWelcomeAdvanceCtaValue() {
            return {
                label: 'Second CTA Text',
                text: '',
                isCtaTextShorter: true,
                isCtaTextBlured: false,
                ctaTextCharaLength: 12,
                isCtaTextRequired: false,
                value: 'Second CTA URL',
                url: '',
                isCtaUrlValid: undefined,
                isCtaUrlBlured: false,
                isCtaUrlRequired: false,
                isAddUTMParametersRequired: false,
                uTMSource: 'engageto',
                utmSourceCharLength: 40,
                isUTMSourceBlured: false,
                invalidUTMSourcePattern: false,
                isUTMSourceShorter: true,
                isUTMSourceRequired: false,
                uTMMedium: 'web-push-notification',
                utmMediumCharLength: 29,
                isUTMMediumShorter: true,
                invalidUTMMediumPattern: false,
                isUTMMediumBlured: false,
                uTMCampaign: '',
                utmCampaignCharLength: 50,
                isUTMCampaignBlured: false,
                invalidUTMCampaignPattern: false,
                isUTMCampaignShorter: true,
                uTMTerm: '',
                utmTermCharLength: 50,
                isUTMTermBlured: false,
                invalidUTMTermPattern: false,
                isUTMTermShorter: true,
                uTMContent: '',
                utmContentCharLength: 50,
                isUTMContentBlured: false,
                invalidUTMContentPattern: false,
                isUTMContentShorter: true
            };
        }
        /*
         * @author: sandeep
         * @created: 14 dec 2016
         * @params: welcome notification(object), id(number)
         * @returns: no
         * @purpose: createWelcomeNotification
         */
        function createWelcomeNotification(notificationData, id) {
            var apiUrl, method;
            if (!id) {
                method = 'POST';
                apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/welcomenotifications';
            } else if (id) {
                method = 'PUT';
                apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/welcomenotifications/' + id;
            }
            var request = $http({
                url: apiUrl,
                method: method,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: notificationData
            });
            return (request
                .then(createWelcomeNotificationSuccess)
                .catch(createWelcomeNotificationError));

            //createWelcomeNotification function
            function createWelcomeNotificationError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return ($q.reject(response.data.message));
            }

            //createWelcomeNotification function
            function createWelcomeNotificationSuccess(response) {
                return (response);
            }
        }
        /*
         * @author: sandeep
         * @created: 14 dec 2016
         * @params: welcome notification(object)
         * @returns: no
         * @purpose: createWelcomeNotificationWithImage
         */
        function createWelcomeNotificationWithImage(notificationData) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/welcomenotifications';
            var request = Upload.upload({
                url: apiUrl,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: notificationData
            });
            return (request
                .then(createWelcomeNotificationWithImageSuccess)
                .catch(createWelcomeNotificationWithImageError));

            //createWelcomeNotificationWithImage function
            function createWelcomeNotificationWithImageError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return ($q.reject(response.data.message));
            }

            //createWelcomeNotificationWithImage function
            function createWelcomeNotificationWithImageSuccess(response) {
                return (response);
            }
        }
        /*
         * @author: sandeep
         * @created: 29 dec 2016
         * @params: segmentType(string)
         * @returns: no
         * @purpose: getSegmentList function
         */
        function getSegmentList(segmentType) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/getSegments/' + segmentType;
            var request = $http({
                url: apiUrl,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                }
            });
            return (request
                .then(getSegmentListSuccess)
                .catch(getSegmentListError));

            //getSegmentListError function
            function getSegmentListError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return ($q.reject(response.data.message));
            }

            //getSegmentListSuccess function
            function getSegmentListSuccess(response) {
                return (response);
            }
        }
        /*
         * @author: sandeep
         * @created: 20 may 2017
         * @params: notificationId(number), notificationType(string)
         * @returns: no
         * @purpose: getNotificationById function
         */
        function getNotificationById(notificationId, notificationType) {
            var apiUrl = notificationType === 'save' ? WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/savednotifications/' + notificationId :
                notificationType === 'schedule' ? WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/schedulednotifications/' + notificationId :
                    notificationType === 'sent' ? WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/sentnotifications/' + notificationId :
                        notificationType === 'welcome' ? WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/welcomenotifications/' + notificationId : '';
            var request = $http({
                url: apiUrl,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                }
            });
            return (request
                .then(getNotificationByIdSuccess)
                .catch(getNotificationByIdError));

            //getNotificationById function
            function getNotificationByIdError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return ($q.reject(response.data.message));
            }

            //getNotificationById function
            function getNotificationByIdSuccess(response) {
                return (response);
            }
        }
        /*
         * @author: sandeep
         * @created: 20 may 2017
         * @params: notificationData(object), notificationId(number)
         * @returns: no
         * @purpose: updateSavedPushNotification function
         */
        function updateSavedPushNotification(notificationData, notificationId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/savednotifications/' + notificationId;
            var request = $http({
                url: apiUrl,
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: notificationData
            });
            return (request
                .then(updateSavedPushNotificationSuccess)
                .catch(updateSavedPushNotificationError));

            //updateSavedPushNotification function
            function updateSavedPushNotificationError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return ($q.reject(response.data.message));
            }

            //updateSavedPushNotification function
            function updateSavedPushNotificationSuccess(response) {
                return (response);
            }
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

        /*
         * @author: anurag
         * @created: 12 sept 2017
         * @params: none)
         * @return: success, error functions
         * @purpose: get subsciber details
         */
        function getSubscriberDetails() {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/subcribersdetails';
            var request = $http({
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl
            });
            return (request
                .then(getSubscriberDetailsSuccess)
                .catch(getSubscriberDetailsError));

            //addSubOptinError function
            function getSubscriberDetailsError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return ($q.reject(response.data.message));
            }

            //addSubOptinSuccess function
            function getSubscriberDetailsSuccess(response) {
                return (response);
            }
        }
        /*
         * @author: anurag
         * @created: 12 sept 2017
         * @params: none)
         * @return: success, error functions
         * @purpose: get all notification details
         */
        function getAllNotificationDetails() {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/allnotifications';
            var request = $http({
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                url: apiUrl
            });
            return (request
                .then(getAllNotificationDetailsSuccess)
                .catch(getAllNotificationDetailsError));

            //addSubOptinError function
            function getAllNotificationDetailsError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return ($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return ($q.reject(response.data.message));
            }

            //addSubOptinSuccess function
            function getAllNotificationDetailsSuccess(response) {
                return (response);
            }
        }
        function timeZoneList() {

            var apiUrl = WEB_ENGAGETO_API_URL + 'timezone_list'
            var request = $http({
                method: "GET",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                }
            });
            return (request
                .then(getTimeZoneListSuccess)
                .catch(getTimeZoneListError));


            function getTimeZoneListError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return err;
                }
                return ($q.reject(response.data.message));
            }

            function getTimeZoneListSuccess(response) {
                return (response);
            }

        }
        function getSegments() {
            var apiUrl = WEB_ENGAGETO_API_URL + "users/9f38ff60-52c0-11e8-a871-ad4e57aed6a5/domains/2a996ee0-63d5-11e8-87fd-11bd0399fec0/getSegments/Audience";
            var request = $http({
                method: "GET",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token,
                }
            });
            return (request
                .then(getSegmentsListSuccess)
                .catch(getSegmentsListError));


            function getSegmentsListError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return err;
                }
                return ($q.reject(response.data.message));
            }

            function getSegmentsListSuccess(response) {
                return (response);
            }

        }
    }
})(window.angular);

