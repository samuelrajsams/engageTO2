(function (angular) {
    'use strict';

// Setting up route
    angular
            .module('smartSegmentation')
            .config(smartSegmentationConfig);

    smartSegmentationConfig.$inject = [
        '$stateProvider'
    ];

    function smartSegmentationConfig(
            $stateProvider) {
        // Home state routing
        $stateProvider.
                state('side-nav-template.smart-segmentation', {
                    url: '/app/smart_segment',
                    templateUrl: 'app/modules/smartsegmentation/views/smart.segmentation.html',
                    controller: 'SmartSegmentionController',
                    authenticate: true,
                    domainTab: true
                });
    }
})(window.angular);
