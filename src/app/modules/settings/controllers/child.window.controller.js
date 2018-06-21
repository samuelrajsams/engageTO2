(function (angular) {
    'use strict';

    angular
            .module('settings')
            .controller('ChildWindowController', childWindowController);

    childWindowController.$inject = [
        '$scope',
        '$rootScope'
    ];

    function childWindowController(
            $scope,
            $rootScope) {
        $rootScope.engagetoApp.isPageLoading = false;
        $scope.childWindow = {
            title: '',
            subTitle: '',
            isRemoveBranding: false,
            onClickSave: onClickSave
        };
        /*
         * @author: sandeep
         * @created: 05 may 2017
         * @params: optinType(string), id(number)
         * @return: no
         * @purpose: onClickOptin function opens optin overlay
         */
        function onClickSave(){
            
        }
    }
})(window.angular);