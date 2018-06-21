(function(angular){
    'use strict';
    
    angular
            .module('integrations')
            .controller('IntegrationsController', integrationsController);
    
    integrationsController.$inject = [
      '$scope',
      '$state',
      '$rootScope'
    ];
    
    function integrationsController(
            $scope,
            $state,
            $rootScope){
        console.log('In integrations Controller');
        //active class for integration
        $rootScope.engagetoApp.setting.active = 'integration';
    }
})(window.angular);