(function (angular) {

    'use strict';

    angular
            .module('website')
            .controller('EditWebsiteModalController', editWebsiteModalController);

    editWebsiteModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'WebsiteService',
        'AuthService',
        '$state',
        '$uibModal',
        'WebsiteDetail',
        'EngagetoAppService',
        '$timeout'
    ];

    function editWebsiteModalController(
            $scope,
            $rootScope,
            $uibModalInstance,
            WebsiteService,
            AuthService,
            $state,
            $uibModal,
            WebsiteDetail,
            EngagetoAppService,
            $timeout) {
        $scope.website = {
            add_website: WebsiteService.getWebsiteDetails(),
            isPrimary: WebsiteDetail.primary,
            close: close,
            addNewWebsite: addNewWebsite,
            uploadImageModal: uploadImageModal
        };
        $scope.website.add_website.isEdit = true;
        $scope.website.add_website.websiteName = WebsiteDetail.domain_name;
        $scope.website.add_website.websiteAddress = WebsiteDetail.domain_address;
        $scope.website.add_website.isPrimary = WebsiteDetail.primary;
        /*
         * @author: sandeep
         * @created: 18 nov 2016
         * @params: no
         * @return: no
         * @purpose: close edit website modal popup
         */
        function close() {
            $uibModalInstance.dismiss('cancle');
        }
        /*
         * @author: sandeep
         * @created: 29 dec 2016
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
         * @created: 29 dec 2016
         * @params: no
         * @return: no
         * @purpose: Add new website
         */
        function addNewWebsite() {
            $rootScope.engagetoApp.isLoading = true;
            var websiteDetails = {
                domain_name: $scope.website.add_website.websiteName
            };
            if($scope.website.add_website.isPrimary)
                websiteDetails.primary = $scope.website.add_website.isPrimary;
            
            WebsiteService.updateWebsite(websiteDetails, WebsiteDetail.domain_referer).then(function (addWebsiteResponse) {
                $rootScope.engagetoApp.isLoading = false;
                EngagetoAppService.showSuccessMessage(addWebsiteResponse.data.data.message);
                $timeout(function () {
                    $uibModalInstance.close();
                }, 500);
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
                $rootScope.engagetoApp.isLoading = false;
                EngagetoAppService.showErrorMessage(errorMessage); 
            });
        }
    }
})(window.angular);