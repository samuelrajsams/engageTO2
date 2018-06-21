(function (angular) {

    'use strict';

    angular
            .module('website')
            .controller('DeleteWebsiteModalController', deleteWebsiteModalController);

    deleteWebsiteModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'WebsiteService',
        'AuthService',
        '$state',
        'WebsiteDetail',
        '$localStorage'
    ];

    function deleteWebsiteModalController(
            $scope,
            $rootScope,
            $uibModalInstance,
            WebsiteService,
            AuthService,
            $state,
            WebsiteDetail,
            $localStorage) {
        $scope.website = {
            add_website: WebsiteDetail,
            close: close,
            remove: remove
        };
        /*
         * @author: sandeep
         * @created: 18 nov 2016
         * @params: no
         * @return: no
         * @purpose: close delete website modal popup
         */
        function close() {
            $uibModalInstance.dismiss('cancle');
        }
        /*
         * @author: sandeep
         * @created: 29 dec 2016
         * @params: Website ID(number)
         * @return: no
         * @purpose: remove website
         */
        function remove() {
            WebsiteService.deleteWebsite(WebsiteDetail.domain_referer).then(function (response) {
                var index = -1;
                angular.forEach($rootScope.engagetoApp.allDomainList, function (v, k) {
                    if (v.domain_status === 'active') {
                        index === -1 && v.primary ? index = k : '';
                    }
                });
                $localStorage.domain_referer = $rootScope.engagetoApp.allDomainList[index].domain_referer;
                $localStorage.domain_address = $rootScope.engagetoApp.allDomainList[index].domain_address;
                $localStorage.subDomainName = $rootScope.engagetoApp.allDomainList[index].app_domain;
                $rootScope.engagetoApp.profile.domainName = $rootScope.engagetoApp.allDomainList[index].domain_address;
                $rootScope.engagetoApp.profile.subDomainName = $rootScope.engagetoApp.allDomainList[index].app_domain;
                $rootScope.engagetoApp.selectedDomainName = $rootScope.engagetoApp.allDomainList[index].domain_referer;
                $uibModalInstance.close(response.data.data.message);
            }, function (error) {
                console.log(error);
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
                    $uibModalInstance.dismiss('failed');
                    $state.go('landing');
                }
            });
        }
    }
})(window.angular);