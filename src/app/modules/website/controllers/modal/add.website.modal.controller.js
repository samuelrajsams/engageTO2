(function (angular) {

    'use strict';

    angular
            .module('website')
            .controller('AddWebsiteModalController', addWebsiteModalController);

    addWebsiteModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        '$uibModalInstance',
        'WebsiteService',
        'AuthService',
        '$state',
        'EngagetoAppService',
        '$timeout'
    ];

    function addWebsiteModalController(
            $scope,
            $rootScope,
            $uibModal,
            $uibModalInstance,
            WebsiteService,
            AuthService,
            $state,
            EngagetoAppService,
            $timeout) {
        $scope.website = {
            activeTab: 0,
            add_website: WebsiteService.getWebsiteDetails(),
            emails: '',
            isEmailsValid: true,
            isDomainExists: false,
            isSubDomainValid: true,
            isDomainNameValid: true,
            errorMessage: '',
            successMessage: '',
            code: '',
            copyMsg: false,
            close: close,
            addNewWebsite: addNewWebsite,
            uploadImageModal: uploadImageModal,
            sendCopyToDev: sendCopyToDev,
            onClickReName: onClickReName,
            onClickReActive: onClickReActive,
            onCopyFunction: onCopyFunction
        };
        /*
         * @author: sandeep
         * @created: 18 nov 2016
         * @params: status(string)
         * @return: no
         * @purpose: close add website modal popup
         */
        function close(status) {
            if (status) {
                EngagetoAppService.showSuccessMessage('Domain Added Successfully');
                $timeout(function () {
                    $uibModalInstance.close();
                }, 500);
            }
            else
                $uibModalInstance.dismiss('cancle');
        }
        /*
         * @author: sandeep
         * @created: 04 nov 2016
         * @params: no
         * @return: no
         * @purpose: uploadImageModal modal popup
         */
        function uploadImageModal() {
            var uploadImageModalInstance = $uibModal.open({
                templateUrl: 'app/modules/notification/views/modal/upload.images.manager.modal.html',
                controller: 'UploadImageManagerModalController',
                windowClass: 'upload-image-manager-modal'
            });

            uploadImageModalInstance.result.then(function (response) {
                if (response.hasOwnProperty('file')) {
                    $scope.website.add_website.image = response.file;
                    $scope.website.add_website.logo = '';
                    $scope.website.add_website.imageType = 'upload';
                } else if (response.hasOwnProperty('logo')) {
                    $scope.website.add_website.imageType = 'icon';
                    $scope.website.add_website.logo = response.logo;
                }
            }, function (error) {
                console.log(error);
            });
        }
        /*
         * @author: sandeep
         * @created: 02 may 2017
         * @params: no
         * @return: no
         * @purpose: sendCopyToDev function
         */
        function sendCopyToDev() {
            $rootScope.engagetoApp.isLoading = true;
            var devEmails = $scope.website.emails.split(',');
            var notValidData = false, emailRegex = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
            angular.forEach(devEmails, function (email, key) {
                if (email !== '')
                    emailRegex.test(email.trim()) ? '' : notValidData = true;
                else
                    notValidData = true;
            });
            if (!notValidData) {
                var data = {
                    developer_emails: devEmails
                };
                AuthService.sendEmail(data).then(function (response) {
                    $rootScope.engagetoApp.isLoading = false;
                    EngagetoAppService.showSuccessMessage(response.data.data.message);
                    $timeout(function () {
                        $uibModalInstance.close();
                    }, 500);
                }, function (error) {
                    console.log(error);
                    var errorMessage = '';
                    if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                        AuthService.revokeAuth();
                        $rootScope.engagetoApp.isAuthenticatedUser = false;
                        $uibModalInstance.dismiss('close');
                        $state.go('landing');
                    } else if (error.code == 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                        angular.forEach(error.error.info, function (val, key) {
                            errorMessage = val;
                        });
                    } else {
                        errorMessage = error.data.message;
                    }
                    $rootScope.engagetoApp.isLoading = false;
                    EngagetoAppService.showErrorMessage(errorMessage);
                });
            } else {
                $rootScope.engagetoApp.isLoading = false;
                $scope.website.isEmailsValid = false;
            }
        }
        /*
         * @author: sandeep
         * @created: 05 may 2017
         * @params: no
         * @return: no
         * @purpose: onClickReActive function
         */
        function onClickReActive() {
            var domainId = '', domainName = '';
            $scope.website.add_website.websiteAddress.indexOf('https') !== -1 ? domainName = $scope.website.add_website.websiteAddress.split('https://')[1] :
                    $scope.website.add_website.websiteAddress.indexOf('http') !== -1 ? domainName = $scope.website.add_website.websiteAddress.split('http://')[1] :
                    $scope.website.add_website.websiteAddress.indexOf('www') !== -1 ? domainName = $scope.website.add_website.websiteAddress.split('www.')[1] :
                    domainName = $scope.website.add_website.websiteAddress;
            angular.forEach($rootScope.engagetoApp.allDomainList, function (domain, key) {
                if (domain.domain_address === domainName) {
                    domainId = domain.domain_referer;
                }
            });
            WebsiteService.reActiveDomain(domainId).then(function (response) {
                $rootScope.engagetoApp.isLoading = false;
                $scope.website.successMessage = '';
                $scope.website.isDomainExist = false;
                $scope.website.successMessage = response.data.data.message;
                $scope.website.code = "\n\
                <script>\n\
                    (function (i, n, t, p) {\n\
                    i._intpq = i._intpq || [];\n\
                    t = n.createElement('script');\n\
                    t.type = 'text/javascript';\n\
                    t.async = true;\n\
                    t.src = '" + response.data.data.file + "';\n\
                    p = n.getElementsByTagName('script')[0];\n\
                    p.parentNode.insertBefore(t, p);\n\
                    })(window, document);\n\
                </script>";
                $scope.website.activeTab = 1;
            }, function (error) {
                console.log(error);
                var errorMessage = '';
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
                    $uibModalInstance.dismiss('close');
                    $state.go('landing');
                } else if (error.code == 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                    angular.forEach(error.error.info, function (val, key) {
                        errorMessage = val;
                    });
                } else {
                    errorMessage = error.data.message;
                }
                $rootScope.engagetoApp.isLoading = false;
                EngagetoAppService.showErrorMessage(errorMessage);
            });
        }
        /*
         * @author: sandeep
         * @created: 05 may 2017
         * @params: no
         * @return: no
         * @purpose: onClickReName function
         */
        function onClickReName() {
            var domainId = '', domainName = '';
            $scope.website.add_website.websiteAddress.indexOf('https') !== -1 ? domainName = $scope.website.add_website.websiteAddress.split('https://')[1] :
                    $scope.website.add_website.websiteAddress.indexOf('http') !== -1 ? domainName = $scope.website.add_website.websiteAddress.split('http://')[1] :
                    $scope.website.add_website.websiteAddress.indexOf('www') !== -1 ? domainName = $scope.website.add_website.websiteAddress.split('www.')[1] :
                    domainName = $scope.website.add_website.websiteAddress;
            angular.forEach($rootScope.engagetoApp.allDomainList, function (domain, key) {
                if (domain.domain_address === domainName) {
                    domainId = domain.domain_referer;
                }
            });
            WebsiteService.reNameDomain(domainId).then(function (response) {
                $rootScope.engagetoApp.isLoading = false;
                $scope.website.successMessage = '';
                $scope.website.isDomainExist = false;
                $scope.website.successMessage = response.data.data.message;
            }, function (error) {
                console.log(error);
                var errorMessage = '';
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
                    $uibModalInstance.dismiss('close');
                    $state.go('landing');
                } else if (error.code == 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                    angular.forEach(error.error.info, function (val, key) {
                        errorMessage = val;
                    });
                } else {
                    errorMessage = error.data.message;
                }
                $rootScope.engagetoApp.isLoading = false;
                EngagetoAppService.showErrorMessage(errorMessage);
            });
        }
        /*
         * @author: sandeep
         * @created: 30 nov 2016
         * @params: no
         * @return: no
         * @purpose: Add new website
         */
        function addNewWebsite() {
            $rootScope.engagetoApp.isLoading = true;
            var websiteAddress = $scope.website.add_website.websiteAddress;
            websiteAddress.indexOf('https://') !== -1 ? '' : websiteAddress.indexOf('http://') !== -1 ? '' : websiteAddress = 'http://' + websiteAddress;
            var wesiteDetails = {
                domain_name: $scope.website.add_website.websiteName,
                domain_address: websiteAddress,
                app_domain: $scope.website.add_website.subDomainName
            };
            WebsiteService.addWebsite(wesiteDetails).then(function (addWebsiteResponse) {
                $scope.website.code = "<script>\n\
    (function (i, n, t, p) {\n\
    i._intpq = i._intpq || [];\n\
    t = n.createElement('script');\n\
    t.type = 'text/javascript';\n\
    t.async = true;\n\
    t.src = '" + addWebsiteResponse.data.data.file + "';\n\
    p = n.getElementsByTagName('script')[0];\n\
    p.parentNode.insertBefore(t, p);\n\
    })(window, document);\n\
</script>";
                $scope.website.errorMessage = '';
                $scope.website.successMessage = '';
                $scope.website.isDomainExist = false;
                $rootScope.engagetoApp.isLoading = false;
                $scope.website.activeTab = 1;
            }, function (error) {
                console.log(error);
                var errorMessage = '';
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
                    $uibModalInstance.dismiss('error');
                    $state.go('landing');
                } else if (error.code === 10300 || error.code === 10401 || error.code === 10402 || error.code === 10403 || error.code === 10404) {
                    angular.forEach(error.error.info, function (val, key) {
                        errorMessage = val;
                    });
                } else {
                    errorMessage = error.data.message;
                }
                $scope.website.successMessage = '';
                if (errorMessage.indexOf('domain already exists') !== -1) {
                    $scope.website.errorMessage = '';
                    $scope.website.isDomainExist = true;
                } else {
                    $scope.website.isDomainExist = false;
                    $scope.website.errorMessage = errorMessage;
                }
                $rootScope.engagetoApp.isLoading = false;
//                EngagetoAppService.showErrorMessage(errorMessage);
            });
        }
        /*
         * @author: sandeep
         * @created: 06 may 2017
         * @params: event(object)
         * @returns: no
         * @purpose: onCopyFunction function
         */
        function onCopyFunction(event) {
            $scope.website.copyMsg = true;
            event.clearSelection();
        }
    }
})(window.angular);