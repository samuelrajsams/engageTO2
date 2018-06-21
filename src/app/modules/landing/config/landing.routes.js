(function (angular) {
    'use strict';

// Setting up route
    angular
            .module('landing')
            .config(langingConfig);

    langingConfig.$inject = [
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
		'$qProvider'
    ];

    function langingConfig(
            $stateProvider,
            $urlRouterProvider,
            $locationProvider,
			$qProvider) {
        // Home state routing
        $stateProvider.
                state('landing', {
                    url: '/',
                    templateUrl: 'app/modules/landing/views/landing.html',
                    controller: 'LandingController'
                }).
                state('signin', {
                    url: '/app/signin',
                    params: {
                      isPasswordSet: false,
                      isPasswordReset: false
                    },
                    templateUrl: 'app/modules/landing/views/signin.html',
                    controller: 'LoginController'
                }).
                state('register', {
                    url: '/app/signup',
                    templateUrl: 'app/modules/landing/views/register.html',
                    controller: 'RegisterController'
                }).
                state('set-password', {
                    url: '/user/password?token1&hash&email&refBy&domainId&new',
                    templateUrl: 'app/modules/landing/views/set.password.html',
                    controller: 'SetPasswordController'
                }).
                state('reset-password', {
                    url: '/user/password/reset?token1&hash&email',
                    templateUrl: 'app/modules/landing/views/reset.password.form.html',
                    controller: 'ReSettingPasswordController'
                }).
                state('forgotPasswordRequest', {
                    url: '/app/forgot-password',
                    templateUrl: 'app/modules/landing/views/reset-password.html',
                    controller: 'ReSetPasswordController'
                }).
                state('newActivationRequest', {
                    url: '/app/resend-activation',
                    templateUrl: 'app/modules/landing/views/resend-activation.html',
                    controller: 'ReSendMailController'
                }).
                state('pricing', {
//                    url: '/pricing/:newLogin/:subDomain/:domainAddress/:isDomainValid',
                    url: '/pricing',
                    templateUrl: 'app/modules/landing/views/pricing.html',
                    controller: 'PricingController'
                }).
                state('partners', {
                    url: '/partners',
                    templateUrl: 'app/modules/landing/views/partners.html',
                    controller: 'PartnersController'
                }).
                state('notification-generator', {
                    url: '/notification-generator',
                    templateUrl: 'app/modules/landing/views/notification.generator.html',
                    controller: 'NotificationGeneratorController'
                }).
                state('blog', {
                    url: '/blog',
                    templateUrl: 'app/modules/landing/views/blog.html',
                    controller: 'BlogController'
                }).
                state('affiliates', {
                    url: '/affiliates',
                    templateUrl: 'app/modules/landing/views/affiliates.html',
                    controller: 'AffiliatesController'
                }).
                state('termAndCondition', {
                    url: '/terms-and-conditions',
                    templateUrl: 'app/modules/landing/views/terms-and-condition.html',
                    controller: 'TermsnConditionController'
                }).
                state('faq', {
                    url: '/faq',
                    templateUrl: 'app/modules/landing/views/faq.html',
                    controller: 'FAQController'
                }).
                state('privacyPolicy', {
                    url: '/privacy-policy',
                    templateUrl: 'app/modules/landing/views/privacy-policy.html',
                    controller: 'PrivacyPolicyController'
                }).
                state('engagetoCoupon', {
                    url: '/engageto-coupon',
                    templateUrl: 'app/modules/landing/views/engageto-coupon.html',
                    controller: 'EngagetoCouponController'
                }).
                state('settings-side-nav-template', {
                    abstract: true,
                    url: '',
                    templateUrl: 'app/shared/navigation/settings.side.nav.template.html'
                }).
                state('side-nav-template.code-installation', {
                    url: '/code-installation?id&state',
                    templateUrl: 'app/modules/landing/views/code.installation.html',
                    controller: 'CodeInstallationController',
                    authenticate: true
                }).
                state('page-not-found', {
                    url: '/404',
                    templateUrl: 'app/shared/navigation/error-404.html'
                }).
                state('chromePushNotification', {
                    url: '/chrome-push-notification',
                    templateUrl: 'app/modules/landing/views/chrome-push-notification.html',
                    controller: 'ChromePushNotificationController'
                }).
                state('joomlaPushNotification', {
                    url: '/joomla-push-notification',
                    templateUrl: 'app/modules/landing/views/joomla-push-notification.html',
                    controller: 'JoomlaPushNotificationController'
                }).
                state('androidPushNotification', {
                    url: '/android-push-notification',
                    templateUrl: 'app/modules/landing/views/android-push-notification.html',
                    controller: 'AndroidPushNotificationController'
                }).
                state('firefoxPushNotification', {
                    url: '/firefox-push-notification',
                    templateUrl: 'app/modules/landing/views/firefox-push-notification.html',
                    controller: 'FirefoxPushNotificationController'
                }).
                state('wordpressPushNotification', {
                    url: '/wordpress-push-notification',
                    templateUrl: 'app/modules/landing/views/wordpress-push-notification.html',
                    controller: 'WordpressPushNotificationController'
                }).
                state('features', {
                    url: '/features',
                    templateUrl: 'app/modules/landing/views/features.html',
                    controller: 'FeaturesController'
                }).
                state('how-it-works', {
                    url: '/how-it-works',
                    templateUrl: 'app/modules/landing/views/how-it-works.html',
                    controller: 'HowItWorksController'
                });
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/404');
        $locationProvider.hashPrefix('');
		$qProvider.errorOnUnhandledRejections(false);
    }
})(window.angular);
