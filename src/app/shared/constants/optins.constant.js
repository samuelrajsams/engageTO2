(function (angular, ApplicationConfiguration) {
    'use strict';

    angular
            .module(ApplicationConfiguration.applicationModuleName)
            .constant('OptinsConstant', [
                {
                    key: 'side',
                    isActive: false,
                    image: 'app/assets/images/optin 1.png',
                    title: 'Side Style'
                },
                {
                    key: 'top',
                    isActive: false,
                    image: 'app/assets/images/optin 2.png',
                    title: 'Top Safari Style'
                },
                {
                    key: 'buttom',
                    isActive: false,
                    image: 'app/assets/images/optin 3.png',
                    title: 'Bottom Scroll'
                },
                {
                    key: 'dialogue',
                    isActive: false,
                    image: 'app/assets/images/optin 4.png',
                    title: 'Dialogue Pop Style'
                },
                {
                    key: 'converting',
                    isActive: false,
                    image: 'app/assets/images/optin 5.png',
                    title: 'Converting Native Opt-in (For SSL-enabled websites only)'
                },
                {
                    key: 'native',
                    isActive: false,
                    image: 'app/assets/images/optin 6.png',
                    title: 'Native style optin for Non-SSL?'
                }
                
            ]);
})(window.angular, window.ApplicationConfiguration);