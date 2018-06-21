(function (angular) {

    'use strict';

    angular
            .module('notification')
            .controller('UploadImageManagerModalController', uploadImageManagerModalController);

    uploadImageManagerModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'NotificationService',
        'AuthService',
        '$state',
        'EngagetoAppService',
        'uploadedImageList',
        'defaultImageList'
    ];

    function uploadImageManagerModalController(
            $scope,
            $rootScope,
            $uibModalInstance,
            NotificationService,
            AuthService,
            $state,
            EngagetoAppService,
            uploadedImageList,
            defaultImageList) {
        $scope.uploadImageManager = {
            fileIndex: -1,
            files: '',
            isFileSelected: false,
            croppedFile: '',
            logoIndex: -1,
            defaultImageList: defaultImageList,
            uploadedImageList: uploadedImageList,
            isMaxFileSizeLimitReached: false,
            isMaxFilesUploaded: false,
            isFileFormateValid: true,
            except: except,
            cancel: cancel,
            uploadSelectedImage: uploadSelectedImage,
            uploadSelectedLogo: uploadSelectedLogo,
            removeSelectedImage: removeSelectedImage,
            selectedLogo: selectedLogo,
            uploadingFiles: uploadingFiles
        };
        /*
         * @author: sandeep
         * @created: 01 nov 2016
         * @params: no
         * @return: no
         * @purpose: excepted to exit notification
         */
        function except() {
            $uibModalInstance.close('close');
        }
        /*
         * @author: sandeep
         * @created: 01 nov 2016
         * @params: no
         * @return: no
         * @purpose: cancelled to exit notification
         */
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
        /*
         * @author: sandeep
         * @created: 08 nov 2016
         * @params: no
         * @return: no
         * @purpose: upload selected image
         */
        function uploadSelectedImage() {
            $rootScope.engagetoApp.isLoading = true;
            var data = {
                logo: dataURLtoBlob($scope.uploadImageManager.croppedFile)
            };
            NotificationService.uploadCroppedNotificationImage(data).then(function (response) {
                $rootScope.engagetoApp.isLoading = false;
                $uibModalInstance.close({file: response.data.data.image, upload: true});
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
        /*
         * @author: sandeep
         * @created: 08 nov 2016
         * @params: type(string)
         * @return: no
         * @purpose: upload selected logo
         */
        function uploadSelectedLogo(type) {
            if (type === 'logo')
                $uibModalInstance.close({file: $scope.uploadImageManager.defaultImageList[$scope.uploadImageManager.logoIndex]});
            else if (type === 'file')
                $uibModalInstance.close({file: $scope.uploadImageManager.uploadedImageList[$scope.uploadImageManager.fileIndex]});
        }
        /*
         * @author: sandeep
         * @created: 08 nov 2016
         * @params: no
         * @return: no
         * @purpose: remove selected image
         */
        function removeSelectedImage() {
            $scope.uploadImageManager.files = '';
            $scope.uploadImageManager.croppedFile = '';
            $scope.uploadImageManager.isFileSelected = false;
            $scope.uploadImageManager.fileIndex--;
        }
        /*
         * @author: sandeep
         * @created: 08 nov 2016
         * @params: index(number), type(string) 
         * @return: no
         * @purpose: selected logo
         */
        function selectedLogo(index, type) {
            if (type === 'logo') {
                $scope.uploadImageManager.logoIndex = index;
                $rootScope.engagetoApp.notification.image = $scope.uploadImageManager.defaultImageList[index];
            }
            else if (type === 'file') {
                $scope.uploadImageManager.fileIndex = index;
                $rootScope.engagetoApp.notification.image = $scope.uploadImageManager.uploadedImageList[index];
            }
        }
        /*
         * @author: sandeep
         * @created: 10 may 2017
         * @params: file(object), invalidFiles(array)    
         * @return: no
         * @purpose: uploadingFiles function
         */
        function uploadingFiles(file, invalidFiles) {
            var invalidFile = {}, invalidFileLength = 0;
            if (invalidFiles.length > 0 && invalidFiles.length !== invalidFileLength) {
                invalidFileLength = invalidFiles.length;
                invalidFile = invalidFiles.pop();
                if (invalidFile['$error'] === 'pattern') {
                    $scope.uploadImageManager.isFileFormateValid = false;
                    $scope.uploadImageManager.isMaxFileSizeLimitReached = false;
                    $scope.uploadImageManager.isMaxFilesUploaded = false;
                }
                if (invalidFile['$error'] === 'maxSize') {
                    $scope.uploadImageManager.isFileFormateValid = true;
                    $scope.uploadImageManager.isMaxFileSizeLimitReached = true;
                    $scope.uploadImageManager.isMaxFilesUploaded = false;
                }
            } else if ($scope.uploadImageManager.uploadedImageList.length >= 20) {
                $scope.uploadImageManager.isMaxFilesUploaded = true;
                $scope.uploadImageManager.isFileFormateValid = true;
                $scope.uploadImageManager.isMaxFileSizeLimitReached = false;
            } else if (file) {
                $rootScope.engagetoApp.isPageLoading = true;
                $scope.uploadImageManager.fileIndex++;
                $scope.uploadImageManager.isFileFormateValid = true;
                $scope.uploadImageManager.isMaxFileSizeLimitReached = false;
                $scope.uploadImageManager.isMaxFilesUploaded = false;
                var file = file;
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.uploadImageManager.files = evt.target.result;
                        $scope.uploadImageManager.isFileSelected = true;
                        $rootScope.engagetoApp.isPageLoading = false;
                    });
                };
                reader.readAsDataURL(file);
            }
        }
        /*
         * @author: sandeep
         * @created: 15 may 2017
         * @params: dataURL(string)    
         * @return: no
         * @purpose: dataURLtoBlob function
         */
        function dataURLtoBlob(dataURI) {
            var byteString = atob(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            //Old Code
            //write the ArrayBuffer to a blob, and you're done
            //var bb = new BlobBuilder();
            //bb.append(ab);
            //return bb.getBlob(mimeString);
            return new Blob([ab], {type: mimeString});
        }
    }
})(window.angular);