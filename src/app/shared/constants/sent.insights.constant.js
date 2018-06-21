(function (angular, ApplicationConfiguration) {
    'use strict';

    angular
            .module(ApplicationConfiguration.applicationModuleName)
            .constant('InsightDeviceData', [
                {
                    "name": "laptop",
                    "percent": "23.9"
                },
                {
                    "name": "tablet",
                    "percent": "25.6"
                },
                {
                    "name": "mobile",
                    "percent": "50.5"
                }
            ])
            .constant('InsightOperatingSystemData', [
                {
                    "name": "windows",
                    "percent": "23.9"
                },
                {
                    "name": "linux",
                    "percent": "74.1"
                }
            ])
            .constant('InsightGeoMapData', [
                {
                    "name": "firefox",
                    "percent": "23.9"
                },
                {
                    "name": "bing",
                    "percent": "25.6"
                },
                {
                    "name": "ie",
                    "percent": "50.5"
                }
            ])
            .constant('InsightBrowserData', [
                {
                    "name": "firefox",
                    "percent": "23.9"
                },
                {
                    "name": "bing",
                    "percent": "25.6"
                },
                {
                    "name": "ie",
                    "percent": "50.5"
                }
            ]);
})(window.angular, window.ApplicationConfiguration);