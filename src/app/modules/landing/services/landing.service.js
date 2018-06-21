(function (angular) {
    'use strict';
    angular
            .module('landing')
            .factory('AuthService', AuthService);
    AuthService.$inject = [
        '$http',
        '$q',
        'WEB_ENGAGETO_API_URL',
        'PUSH_NOTIFICATION_API_URL',
        '$localStorage',
        '$rootScope',
        'Language_Code',
        'Upload',
        'Engageto_Default_Image'
    ];

    function AuthService(
            $http,
            $q,
            WEB_ENGAGETO_API_URL,
            PUSH_NOTIFICATION_API_URL,
            $localStorage,
            $rootScope,
            Language_Code,
            Upload,
            Engageto_Default_Image) {

        return {
            login: login,
            register: register,
            domainSignUp: domainSignUp,
            sendDomainData: sendDomainData,
            setPassword: setPassword,
            activateTeamMember: activateTeamMember,
            resetPassword: resetPassword,
            changePassword: changePassword,
            sendEmail: sendEmail,
            getCodeInstallationPath: getCodeInstallationPath,
            isLinkExpired: isLinkExpired,
            getDefaultImage: getDefaultImage,
            setPaymentSuccess: setPaymentSuccess,
            isEmailActivated: isEmailActivated,
            accountActivate: accountActivate,
            reSendActivationLink: reSendActivationLink,
            sendPwdResetLink: sendPwdResetLink,
            revokeAuth: revokeAuth,
            sendActivationStatus: sendActivationStatus,
            onPlanSubscription: onPlanSubscription,
            onSubmitPricingForm: onSubmitPricingForm,
            uploadNotificationGeneratorImage: uploadNotificationGeneratorImage,
            getNotificationGeneratorValues: getNotificationGeneratorValues,
            getNotificationGeneratorAdvanceValues: getNotificationGeneratorAdvanceValues,
            getNotificationGeneratorAdvanceCtaValue: getNotificationGeneratorAdvanceCtaValue,
            getAccountDetails: getAccountDetails,
            getLandingPageInfo:getLandingPageInfo
//            getCityCountryTimezone: getCityCountryTimezone
        };

        /*
         * @author: sandeep
         * @created: 18-10-2016
         * @params: User credentials(object)
         * @return: success, error functions
         * @purpose: Login customer
         */
        function login(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/signin';
            var request = $http({
                method: "POST",
                url: apiUrl,
                data: data
            });
            return(request
                    .then(loginSuccess)
                    .catch(loginError));

            //loginError function
            function loginError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //loginSuccess function
            function loginSuccess(response) {
                return(response);
            }
        }

        /*
         * @author: sandeep
         * @created: 18-10-2016
         * @params: Visitor details(object)
         * @return: success, error functions
         * @purpose: Register visitor
         */
        function register(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users';
            var request = $http({
                method: "POST",
                url: apiUrl,
                data: data
            });
            return(request
                    .then(registerSuccess)
                    .catch(registerError));

            //register error function
            function registerError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //register success function
            function registerSuccess(response, status, headers, config) {
//                $localStorage.token = response.headers('sid');
//                console.log("token", $localStorage.token);
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 18-10-2016
         * @params: Domain details(object)
         * @return: success, error functions
         * @purpose: Domain signup
         */
        function domainSignUp(data) {
            var apiUrl = PUSH_NOTIFICATION_API_URL + 'domainSignUp';
            var request = $http({
                method: "POST",
                url: apiUrl,
                data: data
            });
            return(request
                    .then(domainSignUpSuccess)
                    .catch(domainSignUpError));

            //dominSignUp error function
            function domainSignUpError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //dominSignUp success function
            function domainSignUpSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 18-10-2016
         * @params: Registered Domain details(object)
         * @return: success, error functions
         * @purpose: Sending registered domain data
         */
        function sendDomainData(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'node/domains/' + data.domain_referer;
            var request = $http({
                method: "PUT",
                url: apiUrl,
                data: data
            });
            return(request
                    .then(successSendDomainData)
                    .catch(errorSendDomainData));
            //sendDomainData error function
            function errorSendDomainData(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }
            //sendDomainData success function
            function successSendDomainData(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 24-10-2016
         * @params: Email data(object)
         * @return: success, error functions
         * @purpose: Checking account activated or not
         */
        function isEmailActivated(email) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + email + '/status';
            var request = $http({
                method: "GET",
                url: apiUrl
            });
            return(request
                    .then(successIsEmailActivated)
                    .catch(errorIsEmailActivated));
            //IsEmailActivated error function
            function errorIsEmailActivated(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }
            //IsEmailActivated success function
            function successIsEmailActivated(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 25-10-2016
         * @params: data (object)
         * @return: success, error functions
         * @purpose: Checking link expired
         */
        function isLinkExpired(data) {
            console.log(data);
            var apiUrl = WEB_ENGAGETO_API_URL + 'user/password/' + data.token1 + '/' + data.hash + '/isActive';
            var request = $http({
                method: "PUT",
                url: apiUrl,
                data: {
                    user_email: data.user_email
                }
            });
            return(request
                    .then(successIsLinkExpired)
                    .catch(errorIsLinkExpired));
            //isLinkExpired error function
            function errorIsLinkExpired(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }
            //isLinkExpired success function
            function successIsLinkExpired(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 27 feb 2017
         * @params: no
         * @return: success, error functions
         * @purpose: getDefaultImage function
         */
        function getDefaultImage() {
            var apiUrl = WEB_ENGAGETO_API_URL + 'user/default/image';
            var request = $http({
                method: "GET",
                url: apiUrl
            });
            return(request
                    .then(successGetDefaultImage)
                    .catch(errorGetDefaultImage));
            //getDefaultImage error function
            function errorGetDefaultImage(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }
            //getDefaultImage success function
            function successGetDefaultImage(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 20 apr 2017
         * @params: paymentId(number)
         * @return: success, error functions
         * @purpose: setPaymentSuccess function
         */
        function setPaymentSuccess(paymentId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/checkoutSuccess';
            var request = $http({
                method: "GET",
                url: apiUrl
            });
            return(request
                    .then(successSetPaymentSuccess)
                    .catch(errorSetPaymentSuccess));
            //setPaymentSuccess error function
            function errorSetPaymentSuccess(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }
            //setPaymentSuccess success function
            function successSetPaymentSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 24-10-2016
         * @params: email (string)
         * @return: success, error functions
         * @purpose: activating account
         */
        function accountActivate(email) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + email + '/status';
            var request = $http({
                method: "PUT",
                url: apiUrl
            });
            return(request
                    .then(successaccountActivate)
                    .catch(erroraccountActivate));
            //IsEmailActivated error function
            function erroraccountActivate(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }
            //IsEmailActivated success function
            function successaccountActivate(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 24-10-2016
         * @params: Email data(object)
         * @return: success, error functions
         * @purpose: Sending account activation status
         */
        function sendActivationStatus(email) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + email + '/status';
            var request = $http({
                method: "PUT",
                url: apiUrl
            });
            return(request
                    .then(successIsEmailActivated)
                    .catch(errorIsEmailActivated));
            //IsEmailActivated error function
            function errorIsEmailActivated(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }
            //IsEmailActivated success function
            function successIsEmailActivated(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 28 apr 2017
         * @params: data(object), planKey(string)
         * @returns: no
         * @purpose: onPlanSubscription function
         */
        function onPlanSubscription(data, planKey) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/checkout/' + planKey;
            var request = $http({
                url: apiUrl,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: data
            });
            return(request
                    .then(onPlanSubscriptionSuccess)
                    .catch(onPlanSubscriptionError));

            //onPlanSubscriptionError function
            function onPlanSubscriptionError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //onPlanSubscriptionSuccess function
            function onPlanSubscriptionSuccess(response) {
                return(response);
            }
        }

        /*
         * @author: sandeep
         * @created: 28 apr 2017
         * @params: data(object)
         * @returns: no
         * @purpose: onSubmitPricingForm function
         */
        function onSubmitPricingForm(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/getSegments/' + segmentType;
            var request = $http({
                url: apiUrl,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: data
            });
            return(request
                    .then(onSubmitPricingFormSuccess)
                    .catch(onSubmitPricingFormError));

            //onSubmitPricingFormError function
            function onSubmitPricingFormError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //onSubmitPricingFormSuccess function
            function onSubmitPricingFormSuccess(response) {
                console.log(response);
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 20 feb 2017
         * @params: image(object)
         * @return: success, error functions
         * @purpose: upload image for notification generator
         */
        function uploadNotificationGeneratorImage(image) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'generator/image';
            var request = Upload.upload({
                url: apiUrl,
                method: 'POST',
                data: {logo: image}
            });
            return(request
                    .then(successUploadNotificationGeneratorImage)
                    .catch(errorUploadNotificationGeneratorImage));
            //uploadNotificationGeneratorImage error function
            function errorUploadNotificationGeneratorImage(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }
            //uploadNotificationGeneratorImage success function
            function successUploadNotificationGeneratorImage(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 21-10-2016
         * @params: password data(object)
         * @return: success, error functions
         * @purpose: Setting Password
         */
        function setPassword(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'user/password/' + data.token1 + '/' + data.hash;
            var request = $http({
                method: "PUT",
                url: apiUrl,
                data: {
                    user_email: data.user_email,
                    password: data.password,
                    confirm_password: data.confirm_password,
                }
            });
            return(request
                    .then(successSetPassword)
                    .catch(errorSetPassword));
            //Setting Password error function
            function errorSetPassword(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }
            //Setting Password success function
            function successSetPassword(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 06 may 2017
         * @params: refererUser(number), domainId(number), email(string)
         * @return: success, error functions
         * @purpose: activateTeamMember function
         */
        function activateTeamMember(refererUser, domainId, email) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + refererUser + '/domains/' + domainId + '/teams/' + email +'/activate';
            var request = $http({
                method: "GET",
                url: apiUrl
            });
            return(request
                    .then(activateTeamMemberSuccess)
                    .catch(activateTeamMemberError));
            //activateTeamMember error function
            function activateTeamMemberError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }
            //activateTeamMember success function
            function activateTeamMemberSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 22-10-2016
         * @params: password data(object)
         * @return: success, error functions
         * @purpose: Reset Password
         */
        function resetPassword(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'user/password/' + data.token1 + '/' + data.hash + '/reset';
            var request = $http({
                method: "PUT",
                url: apiUrl,
                data: {
                    user_email: data.user_email,
                    password: data.password,
                    confirm_password: data.confirm_password,
                }
            });
            return(request
                    .then(successResetPassword)
                    .catch(errorResetPassword));
            //Reset Password error function
            function errorResetPassword(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }
            //Reset Password success function
            function successResetPassword(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 22-10-2016
         * @params: password data(object)
         * @return: success, error functions
         * @purpose: Change Password
         */
        function changePassword(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/password/change';
            var request = $http({
                method: "POST",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: data
            });
            return(request
                    .then(successChangePassword)
                    .catch(errorChangePassword));
            //changePassword error function
            function errorChangePassword(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }
            //changePassword success function
            function successChangePassword(response) {
                return(response);
            }
        }

        /*
         * @author: sandeep
         * @created: 21-10-2016
         * @params: email data(object)
         * @return: success, error functions
         * @purpose: Re sending Activation Link
         */
        function reSendActivationLink(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'user/password/activation/resend?user_email=' + data.user_email;
            var request = $http({
                method: "GET",
                url: apiUrl
            });
            return(request
                    .then(successReSendActivationLink)
                    .catch(errorReSendActivationLink));
            //Re sending Activation Link error function
            function errorReSendActivationLink(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }
            //Re sending Activation Link success function
            function successReSendActivationLink(response) {
                return(response);
            }
        }

        /*
         * @author: sandeep
         * @created: 22-10-2016
         * @params: email data(object)
         * @return: success, error functions
         * @purpose: Sending password reset Link
         */
        function sendPwdResetLink(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'user/password/reset/resend?user_email=' + data.user_email;
            var request = $http({
                method: "GET",
                url: apiUrl
            });
            return(request
                    .then(successSendPwdResetLink)
                    .catch(errorSendPwdResetLink));
            //password reset Link error function
            function errorSendPwdResetLink(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }
            //password reset Link success function
            function successSendPwdResetLink(response) {
                return(response);
            }
        }


        /*
         * @author: sandeep
         * @created: 04-11-2016
         * @params: data(object)
         * @return: success, error functions
         * @purpose: Send email to developer
         */
        function sendEmail(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/domains/' + $localStorage.domain_referer + '/code';
            var request = $http({
                method: "PUT",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: data
            });
            return(request
                    .then(successSendEmail)
                    .catch(errorSendEmail));
            //sendEmail error function
            function errorSendEmail(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }
            //sendEmail success function
            function successSendEmail(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 20 apr 2017
         * @params: data(object)
         * @return: success, error functions
         * @purpose: getCodeInstallationPath function
         */
        function getCodeInstallationPath(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + data.user_id + '/domains/' + data.domain_id + '/code';
            var request = $http({
                method: "GET",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                }
            });
            return(request
                    .then(successGetCodeInstallationPath)
                    .catch(errorGetCodeInstallationPath));
            //getCodeInstallationPath error function
            function errorGetCodeInstallationPath(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }
            //getCodeInstallationPath success function
            function successGetCodeInstallationPath(response) {
                return(response);
            }
        }

        // revokeAuth function
        function revokeAuth() {
            console.log('revoked..');
            delete $localStorage.token;
            delete $localStorage.domain_referer;
            delete $localStorage.domain_address;
            delete $localStorage.user_geo_details;
            delete $localStorage.user_id;
            delete $localStorage.userPlan;
            delete $localStorage.user_email;
            delete $localStorage.user;
            delete $localStorage.firstName;
            delete $localStorage.lastName;
            delete $localStorage.initial;
            delete $localStorage.domainList;
            delete $localStorage.steps;
            delete $localStorage.progressPercentage;
            $rootScope.$storage.token = false;
        }
        /*
         * @author: sandeep
         * @created: 03 dec 2016
         * @params: no
         * @return: userGeoDetails(object)
         * @purpose: get city, country and timezone using GeoIP
         */
//        function getCityCountryTimezone() {
//            var userGeoDetails = {}, deferred = $q.defer();
//            geoip2.city(onCitySuccess, onCityError);
//            function onCitySuccess(response) {
//                userGeoDetails.country = response.country.names[Language_Code];
//                userGeoDetails.city = response.city.names[Language_Code];
//                userGeoDetails.timezone = response.location.time_zone;
//                deferred.resolve(userGeoDetails);
//            }
//            function onCityError(error) {
//                deferred.reject(error);
//            }
//            return deferred.promise;
//        }

        /*
         * @author: sandeep
         * @created: 25 jan 2017
         * @params: no
         * @return: notification(object)
         * @purpose: getNotificationGeneratorValues function
         */
        function getNotificationGeneratorValues() {
            var getNotificationValues = {
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
//            if (data) {
//                getNotificationValues = data;
//            }
            return getNotificationValues;
        }
        /*
         * @author: sandeep
         * @created: 25 jan 2017
         * @params: no
         * @return: advanceOptions(object)
         * @purpose: getNotificationGeneratorAdvanceValues function
         */
        function getNotificationGeneratorAdvanceValues(data) {
            var getNotificationAdvanceValues = {
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
            if (data) {
                getNotificationAdvanceValues = data;
            }
            return getNotificationAdvanceValues;
        }
        /*
         * @author: sandeep
         * @created: 25 jan 2017
         * @params: no
         * @return: cta(object)
         * @purpose: getNotificationGeneratorAdvanceCtaValue function
         */
        function getNotificationGeneratorAdvanceCtaValue(data) {
            var getNotificationAdvanceCtaValue = {
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
            if (data) {
                getNotificationAdvanceCtaValue = data;
            }
            return getNotificationAdvanceCtaValue;
        }

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
         * @author: anurag
         * @created: 12 sept 2017
         * @params: 
         * @return: success, error functions
         * @purpose: get landing page info - notification sent, subscibers
         */
        function getLandingPageInfo(){
             var apiUrl = WEB_ENGAGETO_API_URL + 'landingpageinfo';
            var request = $http({
                method: "GET",
                url: apiUrl
            });
            return(request
                    .then(getLandingPageInfoSuccess)
                    .catch(getLandingPageInfoError));

            //loginError function
            function getLandingPageInfoError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //loginSuccess function
            function getLandingPageInfoSuccess(response) {
                return(response);
            }
        }
    }
})(window.angular);

