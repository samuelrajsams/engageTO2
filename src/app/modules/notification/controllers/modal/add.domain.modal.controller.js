(function (angular) {

    'use strict';
    angular
            .module('notification')
            .controller('DomainModalController', domainModalController);
    domainModalController.$inject = [
        '$scope',
        '$rootScope',
        'AuthService',
        'NotificationService',
        '$localStorage',
        '$q',
        '$timeout',
        '$uibModalInstance',
        '$state'
    ];
    function domainModalController(
            $scope,
            $rootScope,
            AuthService,
            NotificationService,
            $localStorage,
            $q,
            $timeout,
            $uibModalInstance,
            $state) {
        //initializing addDomain variables
        $scope.addDomain = {
            webSiteUrl: '',
            successAlert: false,
            dangerAlert: false,
            success: '',
            danger: '',
            doubleClick: false,
            load: false
        };
        var domain_name = '';
        var data = {
            user_email: $localStorage.user_email,
            user_id: $localStorage.user_id
//            domain_id: $localStorage.domain_id
        };
        /*
         * @author: sandeep
         * @created: 27-10-2016
         * @params: no
         * @return: no
         * @purpose: Add domains
         */
        $scope.addDomains = function () {
            $scope.addDomain.doubleClick = true;
            $scope.addDomain.load = true;
            var data = {
                domain_address: $scope.addDomain.webSiteUrl,
                user_id: $localStorage.user_id
            };
            NotificationService.addDomain(data).then(function (response) {
                $scope.addDomain.successAlert = true;
                $scope.addDomain.dangerAlert = false;
                $scope.addDomain.success = response.data.data.message;
                domain_name = data.domain_address;
                extractDomain().then(function (domainResponse) {
                    var domainData = {
                        domain_name: domainResponse,
                        emailId: $localStorage.user_email,
                        domain_referer: response.data.data.domain_referer,
                        user_domain_name: response.data.data.domain_address
                    }
                    AuthService.domainSignUp(domainData).then(function (response) {
                        var domainInfo = {
                            node_domain_name: response.data.domain_name,
                            node_domain_id: response.data.domain_id,
                            domain_referer: domainData.domain_referer
                        }
                        AuthService.sendDomainData(domainInfo).then(function (response) {
                            $scope.addDomain.load = false;
                            $rootScope.engagetoApp.domainList.push($scope.addDomain.webSiteUrl);
                            $timeout(function () {
                                $scope.addDomain.doubleClick = false;
                            }, 100);
                        }, function (error) {
                            console.log(error);
                            $scope.addDomain.load = false;
                            $scope.addDomain.dangerAlert = true;
                            $scope.addDomain.successAlert = false;
                            $timeout(function () {
                                $scope.addDomain.doubleClick = false;
                            }, 100);
                            if (error.code == 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                                angular.forEach(error.error.info, function (val, key) {
                                    $scope.addDomain.danger = val;
                                });
                            } else {
                                $scope.addDomain.danger = error.data.message;
                            }
                        });
                    }, function (error) {
                        console.log(error);
                        $scope.addDomain.load = false;
                        $scope.addDomain.dangerAlert = true;
                        $scope.addDomain.successAlert = false;
                        $timeout(function () {
                            $scope.addDomain.doubleClick = false;
                        }, 100);
                        if (error.code == 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                            angular.forEach(error.error.info, function (val, key) {
                                $scope.addDomain.danger = val;
                            });
                        } else {
                            $scope.addDomain.danger = error.data.message;
                        }
                    });
                }, function (error) {
                    console.log(error);
                    $scope.addDomain.load = false;
                });
            }, function (error) {
                console.log("error", error);
                $scope.addDomain.dangerAlert = true;
                $scope.addDomain.successAlert = false;
                $scope.addDomain.load = false;
                $timeout(function () {
                    $scope.addDomain.doubleClick = false;
                }, 100);
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
                    $state.go('landing');
                } else if (error.code === 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                    angular.forEach(error.error.info, function (val, key) {
                        $scope.addDomain.danger = val;
                    });
                } else {
                    $scope.addDomain.danger = error.data.message;
                }
            });
        };
        /*
         * @author: sandeep
         * @created: 27-10-2016
         * @params: no
         * @return: no
         * @purpose: Retrieving only Domain name from given Website url
         */
        function extractDomain() {
            var defer = $q.defer()
            if (domain_name.indexOf('http') >= 0) {
                domain_name = domain_name.replace('https://www.', '');
                domain_name = domain_name.replace('http://www.', '');
                domain_name = domain_name.replace('https://', '');
                domain_name = domain_name.replace('http://', '');
            } else if (domain_name.indexOf('www') >= 0) {
                domain_name = domain_name.replace('www.', '');
            }
            domain_name = domain_name.split('.')[0];
            defer.resolve(domain_name);
            return defer.promise;
        }
        /*
         * @author : sandeep
         * @created : 28-10-2016
         * @params: no
         * @return: no
         * @purpose: closing modal pop up
         */
        $scope.closeModal = function () {
            $uibModalInstance.close('close');
        };
        /*
         * @author : sandeep
         * @created : 03-10-2016
         * @params: no
         * @return: no
         * @purpose: closing success, error alerts
         */
        $scope.hideSuccessAlert = function () {
            $scope.addDomain.successAlert = false;
            $scope.addDomain.successAlert = false;
        };
        $scope.hideDangerAlert = function () {
            $scope.addDomain.dangerAlert = false;
            $scope.addDomain.dangerAlert = false;
        };
    }
})(window.angular);