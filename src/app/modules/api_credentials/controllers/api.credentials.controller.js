(function(angular){
    'use strict';
    
    angular
            .module('api.credentials')
            .controller('ApiCredentialsController', apiCredentialsController);
    
    apiCredentialsController.$inject = [
      '$scope',
      '$state',
      '$rootScope'
    ];
    
    function apiCredentialsController(
            $scope,
            $state,
            $rootScope){
        console.log('In API Credentials Controller');
        //active class for credentials
        $rootScope.engagetoApp.setting.active = 'credentials';
    }
})(window.angular);