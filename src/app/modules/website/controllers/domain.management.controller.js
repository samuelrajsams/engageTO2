(function (angular) {

    'use strict';

    angular
            .module('website')
            .controller('DomainManagementController', domainManagementController);

    domainManagementController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        '$state',
        'DTOptionsBuilder',
        'DTColumnDefBuilder',
        'WebsiteService',
        'AuthService',
        '$timeout',
        'SigninModalService',
        'EngagetoAppService',
        '$localStorage',
        'TeamManagementService'
    ];

    function domainManagementController(
            $scope,
            $rootScope,
            $uibModal,
            $state,
            DTOptionsBuilder,
            DTColumnDefBuilder,
            WebsiteService,
            AuthService,
            $timeout,
            SigninModalService,
            EngagetoAppService,
            $localStorage,
            TeamManagementService) {
        //Initializing Domain Management variables
        $scope.domainManagement = {
            websitesList: [],
            dtOptions: DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10)
                    .withOption('bFilter', false)
                    .withOption('lengthChange', false),
            dtColumnDefs: [
                DTColumnDefBuilder.newColumnDef(3).notSortable(),
                DTColumnDefBuilder.newColumnDef(4).notSortable(),
                DTColumnDefBuilder.newColumnDef(5).notSortable()
            ],
            deletedWebsiteName: '',
            addWebsiteModal: addWebsiteModal,
            editWebsiteModal: editWebsiteModal,
            deleteWebsiteModal: deleteWebsiteModal,
            showInstallationCode: showInstallationCode,
            verifyCodeInstallationModal: verifyCodeInstallationModal,
            hideSuccessAlert: hideSuccessAlert
        };
        var roleList = [], addedDomainCount = 0;
        //active website management
        $rootScope.engagetoApp.setting.active = 'website';
        /*
         * @author: sandeep
         * @created: 29 dec 2016
         * @params: no
         * @return: no
         * @purpose: get website list
         */
        TeamManagementService.getRolesList().then(function (response) {
            roleList = response.data.data['active_roles'];
            WebsiteService.getWebsiteList().then(function (response) {
                angular.forEach(response.data.data, function (domain, key) {
                    if (domain.domain_status === 'active') {
                        angular.forEach(roleList, function (role, key) {
                            if (role._role_id === domain.role_id)
                                domain.role = role.name;
                        });
                        domain.role === 'Super Administrator' ? addedDomainCount++ : '';
                        $scope.domainManagement.websitesList.push(domain);
                    }
                });
                $rootScope.engagetoApp.allDomainList = response.data.data;
                $localStorage.allDomainList = $rootScope.engagetoApp.allDomainList;
                $rootScope.engagetoApp.domainList = $scope.domainManagement.websitesList;
                $localStorage.domainList = $scope.domainManagement.websitesList;
                $rootScope.engagetoApp.isPageLoading = false;
            }, function (error) {
                console.log(error);
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
                    $state.go('landing');
                }
            });
        }, function (error) {
            console.log(error);
            if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                AuthService.revokeAuth();
                $rootScope.engagetoApp.isAuthenticatedUser = false;
                $state.go('landing');
            }
        });
        /*
         * @author: sandeep
         * @created: 18 nov 2016
         * @params: no
         * @return: no
         * @purpose: add website modal popup
         */
        function addWebsiteModal() {
            if ($rootScope.engagetoApp.userPlan === 'Free') {
                SigninModalService.openPricingModal('Domain');
            } else {
                var isPlanSuits = false;
                angular.forEach($rootScope.engagetoApp.planList, function (plan, key) {
                    if (plan.plan_name === $rootScope.engagetoApp.userPlan && plan.max_domains > addedDomainCount)
                        isPlanSuits = true;
                });
                if (isPlanSuits) {
                    var addWebsiteModalInstance = $uibModal.open({
                        templateUrl: 'app/modules/website/views/modal/add.website.modal.html',
                        controller: 'AddWebsiteModalController',
                        windowClass: 'add-website-modal',
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false
                    });

                    addWebsiteModalInstance.result.then(function (response) {
                        console.log(response);
                        $state.reload();
                    }, function (error) {
                        console.log(error);
                    });
                }
                else
                    SigninModalService.openPricingModal('Domain');
            }
        }
        /*
         * @author: sandeep
         * @created: 18 nov 2016
         * @params: index(number)
         * @return: no
         * @purpose: edit website modal popup
         * @modified: 29 dec 2016
         * @modified: sandeep(added param index)
         */
        function editWebsiteModal(index) {
            console.log('editWebsiteModal');
            var editWebsiteModalInstance = $uibModal.open({
                templateUrl: 'app/modules/website/views/modal/edit.website.modal.html',
                controller: 'EditWebsiteModalController',
                windowClass: 'edit-website-modal',
                resolve: {
                    WebsiteDetail: function () {
                        return $scope.domainManagement.websitesList[index];
                    }
                }
            });

            editWebsiteModalInstance.result.then(function (response) {
                $state.reload();
            }, function (error) {
                console.log(error);
            });
        }
        /*
         * @author: sandeep
         * @created: 18 nov 2016
         * @params: index(number)
         * @return: no
         * @purpose: delete website modal popup
         * @modified: 29 dec 2016
         * @modified: sandeep(added param index)
         */
        function deleteWebsiteModal(index) {
            var deleteWebsiteModalInstance = $uibModal.open({
                templateUrl: 'app/modules/website/views/modal/delete.website.modal.html',
                controller: 'DeleteWebsiteModalController',
                windowClass: 'delete-website-modal',
                resolve: {
                    WebsiteDetail: function () {
                        return $scope.domainManagement.websitesList[index];
                    }
                }
            });

            deleteWebsiteModalInstance.result.then(function (response) {
                EngagetoAppService.showSuccessMessage(response);
                $timeout(function () {
                    $state.reload();
                }, 500);
            }, function (error) {
                console.log(error);
            });
        }
        /*
         * @author: sandeep
         * @created: 02 may 2017
         * @params: index(number)
         * @return: no
         * @purpose: showInstallationCode modal popup
         */
        function showInstallationCode(index) {
            var showInstallationCodeInstance = $uibModal.open({
                templateUrl: 'app/modules/website/views/modal/show.code.installation.modal.html',
                controller: 'ShowInstallationCodeModalController',
                windowClass: 'add-website-modal',
                resolve: {
                    WebsiteDetail: function () {
                        return $scope.domainManagement.websitesList[index];
                    }
                }
            });

            showInstallationCodeInstance.result.then(function (response) {
                console.log(response);
            }, function (error) {
                console.log(error);
            });
        }
        /*
         * @author: sandeep
         * @created: 18 nov 2016
         * @params: websiteId(number)
         * @return: no
         * @purpose: verify code installation modal popup
         * @modified: 29 dec 2016
         * @modified by: sandeep(added param and api check)
         */
        function verifyCodeInstallationModal(websiteId) {
            var verifyCodeInstallationModalInstance = $uibModal.open({
                templateUrl: 'app/modules/website/views/modal/verify.code.installation.modal.html',
                controller: 'VerifyCodeInstallationModalController',
                windowClass: 'verify-code-installation-modal'
            });

            verifyCodeInstallationModalInstance.result.then(function (response) {
                console.log(response);
            }, function (error) {
                console.log(error);
            });
        }
        /*
         * @author : sandeep
         * @created : 29 dec 2016
         * @params: no
         * @return: no
         * @purpose: closing success alert
         */
        function hideSuccessAlert() {
            $scope.domainManagement.deletedWebsiteName = '';
        }
        //focus event on fields
        function extractHostname(url) {
            var hostname;
            //find & remove protocol (http, ftp, etc.) and get the hostname
            if (url.indexOf("://") > -1) {
                hostname = url.split('/')[2];
            }
            else {
                hostname = url.split('/')[0];
            }
            //find & remove port number
            hostname = hostname.split(':')[0];

            return hostname;
        }
        // to address those who want the "root domain"
        function extractRootDomain(url) {
            var domain = extractHostname(url),
                    splitArr = domain.split('www.'),
                    arrLen = splitArr.length;
            //extracting the root domain here
            if (arrLen > 1) {
                domain = splitArr[arrLen - 1];
            }
            return domain;
        }
    }
})(window.angular);