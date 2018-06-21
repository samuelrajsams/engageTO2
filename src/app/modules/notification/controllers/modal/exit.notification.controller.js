(function (angular) {

    'use strict';

    angular
            .module('notification')
            .controller('ExitNotificationController', exitNotificationController);

    exitNotificationController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance'
    ];

    function exitNotificationController(
            $scope,
            $rootScope,
            $uibModalInstance) {
        $scope.exitNotification = {
            except: except,
            cancel: cancel
        };
        /*
         * @author: sandeep
         * @created: 01 nov 2016
         * @params: no
         * @return: no
         * @purpose: excepted to exit notification
         */
        function except(){
            $uibModalInstance.close('except');
        }
        /*
         * @author: sandeep
         * @created: 01 nov 2016
         * @params: no
         * @return: no
         * @purpose: cancelled to exit notification
         */
        function cancel(){
            $uibModalInstance.dismiss('cancel');            
        }
    }
})(window.angular);