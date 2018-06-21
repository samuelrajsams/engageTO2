(function (angular) {

    'use strict';

    angular
            .module('settings')
            .controller('SettingsController', settingsController);

    settingsController.$inject = [
        '$scope',
        '$rootScope',
        '$window'
    ];

    function settingsController(
            $scope,
            $rootScope,
            $window) {
        console.log('settingsController');
        //active class for settings
        $rootScope.engagetoApp.setting.active = 'settings';
        $rootScope.engagetoApp.isPageLoading = false;
        $scope.settings = {
            showSidebar: true,
            sidebarExpandCollapse: sidebarExpandCollapse,
            goBack: goBack
        };
        /*
         * @author: sandeep
         * @created: 05 oct 2016
         * @params: no
         * @return: no
         * @purpose: show/hide sidenav
         * @modified: 17 nov 2016
         * @modified by: sandeep(added parent scope)
         */
        function sidebarExpandCollapse() {
            $scope.settings.showSidebar = !$scope.settings.showSidebar;
        }
        /*
         * @author: sandeep
         * @created: 17 nov 2016
         * @params: no
         * @return: no
         * @purpose: go history back
         */
        function goBack() {
            $window.history.back();
        }
    }
})(window.angular);