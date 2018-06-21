(function (angular) {
    'use strict';

    angular
            .module('settings')
            .controller('GetAPIKeyController', getAPIKeyController);

    getAPIKeyController.$inject = [
        '$scope',
        '$rootScope',
        'SettingService'
    ];

    function getAPIKeyController(
            $scope,
            $rootScope,
            SettingService) {
        $rootScope.engagetoApp.isPageLoading = false;
        $scope.getAPIKey = {
            getRESTAPIKeyToken: getRESTAPIKeyToken
        };        
        
        /*
         * @author: sandeep
         * @created: 13 jul 2017
         * @params: no
         * @returns: no
         * @purpose: get REST api key token  
         */
        function getRESTAPIKeyToken(){
//            SettingService.getRESTAPIKeyToken().then(function(response){
//                console.log(response);
//            }, function(error){
//                console.log(error);
//            });
        }
    }
})(window.angular);