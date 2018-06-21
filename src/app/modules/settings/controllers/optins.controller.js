(function (angular) {
    'use strict';

    angular
            .module('settings')
            .controller('OptinsController', optinsController);

    optinsController.$inject = [
        '$scope',
        '$rootScope',
        'OptinsConstant',
        'SettingService',
        'AuthService',
        '$state',
        'EngagetoAppService',
        '$timeout'
    ];

    function optinsController(
            $scope,
            $rootScope,
            OptinsConstant,
            SettingService,
            AuthService,
            $state,
            EngagetoAppService,
            $timeout) {
        $scope.optin = {
            list: [],
            side: {
                title: '',
                subTitle: '',
                delay: '',
                allowButtonText: 'Allow',
                blockButtonText: 'Block',
                isBrandingRemoved: false,
                disableOnMobile: false,
                position: 'top-right',
                optinBackground: '#ffffff',
                titleTextColor: '#151414',
                subTitleTextColor: '#151414',
                allowButtonTextColor: '#ffffff',
                blockButtonTextColor: '#ffffff',
                allowButtonBackground: '#196ae5',
                blockButtonBackground: '#151414'
            },
            top: {
                title: '',
                subTitle: '',
                delay: '',
                allowButtonText: 'Allow',
                blockButtonText: 'Block',
                isBrandingRemoved: false,
                disableOnMobile: false,
                optinBackground: '#ffffff',
                titleTextColor: '#151414',
                subTitleTextColor: '#151414',
                allowButtonTextColor: '#ffffff',
                blockButtonTextColor: '#ffffff',
                allowButtonBackground: '#196ae5',
                blockButtonBackground: '#151414'
            },
            bottom: {
                title: '',
                subTitle: '',
                delay: '',
                allowButtonText: 'Allow',
                blockButtonText: 'Block',
                isBrandingRemoved: false,
                disableOnMobile: false,
                optinBackground: '#ffffff',
                titleTextColor: '#151414',
                subTitleTextColor: '#151414',
                allowButtonTextColor: '#ffffff',
                blockButtonTextColor: '#ffffff',
                allowButtonBackground: '#196ae5',
                blockButtonBackground: '#151414'
            },
            dialogue: {
                title: '',
                subTitle: '',
                delay: '',
                allowButtonText: 'Allow',
                blockButtonText: 'Block',
                isBrandingRemoved: false,
                disableOnMobile: false,
                position: 'bottom-right',
                optinBackground: '#ffffff',
                titleTextColor: '#151414',
                subTitleTextColor: '#151414',
                allowButtonTextColor: '#ffffff',
                blockButtonTextColor: '#ffffff',
                allowButtonBackground: '#196ae5',
                blockButtonBackground: '#151414'
            },
            bar: {
                title: '',
                subTitle: '',
                delay: '',
                allowButtonText: 'Allow',
                blockButtonText: 'Block',
                isBrandingRemoved: false,
                disableOnMobile: false,
                position: 'top',
                optinBackground: '#ffffff',
                titleTextColor: '#151414',
                subTitleTextColor: '#151414',
                allowButtonTextColor: '#ffffff',
                blockButtonTextColor: '#ffffff',
                allowButtonBackground: '#196ae5',
                blockButtonBackground: '#151414'
            },
            converting: {
                isBrandingRemoved: false,
                disableOnMobile: false
            },
//            native: {
//                isBrandingRemoved: false,
//                disableOnMobile: false
//            },
            themeType: '',
            deviceType: 'desktop',
            optins: OptinsConstant,
            onClickSave: onClickSave,
            themeSelector: themeSelector,
            onChangeDeviceType: onChangeDeviceType,
            onDownloadFile:onDownloadFile
        };
        var optinListByDomain = [], isThemeEditable = false, themeManageId = '';
        /*
         * @author: sandeep
         * @created: 15 jul 2017
         * @params: name(string), id(number)
         * @return: no
         * @purpose: onClickOptin function opens optin overlay
         * @modefied: 19 aug 2017
         * @modified by: sandeep(changes done as per api requirement, getting saved optin if selected otherwise default values selected)
         */
        function themeSelector(optinName, optinId) {
            console.log(optinName, optinId)
            $scope.optin.themeType = optinName;
            // isThemeEditable = false;
            if (optinListByDomain.length > 0) {
                angular.forEach(optinListByDomain, function (theme, key) {
                    if (theme.optin_name === optinName) {
                        isThemeEditable = true;
                        themeManageId = theme.manage_optin_referer;
                        var type = theme.optin_name === 'native-optins' ? 'converting' : theme.optin_name;
                        if (type !== 'converting') {
                            theme.title ? $scope.optin[type].title = theme.title : '';
                            theme.title_color ? $scope.optin[type].titleTextColor = theme.title_color : '';
                            theme.sub_title ? $scope.optin[type].subTitle = theme.sub_title : '';
                            theme.sub_title_color ? $scope.optin[type].subTitleTextColor = theme.sub_title_color : '';
                            theme.background_color ? $scope.optin[type].optinBackground = theme.background_color : '';
                            theme.allow_btn_text ? $scope.optin[type].allowButtonText = theme.allow_btn_text : '';
                            theme.allow_btn_color ? $scope.optin[type].allowButtonTextColor = theme.allow_btn_color : '';
                            theme.allow_btn_background ? $scope.optin[type].allowButtonBackground = theme.allow_btn_background : '';
                            theme.block_btn_text ? $scope.optin[type].blockButtonText = theme.block_btn_text : '';
                            theme.block_btn_color ? $scope.optin[type].blockButtonTextColor = theme.block_btn_color : '';
                            theme.block_btn_background ? $scope.optin[type].blockButtonBackground = theme.block_btn_background : '';
                            theme.delay ? $scope.optin[type].delay = theme.delay : '';
                        }
                        $scope.optin[type].disableOnMobile = theme.disable_on_mobile ? true : false;
                        $scope.optin[type].isBrandingRemoved = theme.remove_branding ? true : false;
                        if (type !== 'top' && type !== 'bottom')
                            theme.position ? $scope.optin[type].position = theme.position : '';
                    }
                });
            }
        }
        /*
         * @author: sandeep
         * @created: 05 may 2017
         * @params: optinType(string))
         * @return: no
         * @purpose: onClickOptin function opens optin overlay
         */
        function onClickSave(optinType) {
            $rootScope.engagetoApp.isLoading = true;
            var type = optinType === 'converting' ? 'native-optins' : optinType;
            var optinId = '';
            angular.forEach($scope.optin.list, function (theme, key) {
                if (theme.name == type)
                    optinId = theme.optin_referer;
            });
            if ($scope.optin.themeType == 'native-optins') {
                var optinData = {
                    optin_id: optinId,
                    disable_on_mobile: $scope.optin['converting'].disableOnMobile ? 1 : 0,
                    remove_branding: $scope.optin['converting'].isBrandingRemoved ? 1 : 0
                }
            }
            else {
                var optinData = {
                    optin_id: optinId,
                    title: $scope.optin[type].title == ''?'title':$scope.optin[type].title,
                    title_color: $scope.optin[type].titleTextColor,
                    sub_title: $scope.optin[type].subTitle == ''?'description':$scope.optin[type].subTitle,
                    sub_title_color: $scope.optin[type].subTitleTextColor,
                    background_color: $scope.optin[type].optinBackground,
                    allow_btn_text: $scope.optin[type].allowButtonText,
                    allow_btn_color: $scope.optin[type].allowButtonTextColor,
                    allow_btn_background: $scope.optin[type].allowButtonBackground,
                    block_btn_text: $scope.optin[type].blockButtonText,
                    block_btn_color: $scope.optin[type].blockButtonTextColor,
                    block_btn_background: $scope.optin[type].blockButtonBackground,
                    delay: $scope.optin[type].delay,
                    disable_on_mobile: $scope.optin[type].disableOnMobile ? 1 : 0,
                    remove_branding: $scope.optin[type].isBrandingRemoved ? 1 : 0
                };
                if (type !== 'top' && type !== 'bottom')
                    optinData.position = $scope.optin[type].position;
            }
            if (!isThemeEditable) {
                SettingService.addOptin(optinData).then(function (response) {
                    $rootScope.engagetoApp.isLoading = false;
                    EngagetoAppService.showSuccessMessage('Saved Successfully! It may take up to few minutes for changes to reflect on your website.');
                    $timeout(function () {
                        $state.go('side-nav-template.sub-optins');
                    }, 2000);
                    getOptinList();
                }, function (error) {
                    console.log(error);
                });
            } else {
                SettingService.updateOptin(optinData, themeManageId).then(function (response) {
                    $rootScope.engagetoApp.isLoading = false;
                    EngagetoAppService.showSuccessMessage('Optin Updated Successfully.');
//                    $timeout(function () {
//                        $state.go('side-nav-template.sub-optins');
//                    }, 2000);
                    getOptinList();
                }, function (error) {
                    console.log(error);
                });
            }
        }
        /*
         * @author: sandeep
         * @created: 18 jul 2017
         * @params: no
         * @return: no
         * @purpose: get optin list
         * @modefied: 19 aug 2017
         * @modified by: sandeep(changes done as per api requirement, saving at once only one optin)
         */
        function getOptinList() {
            SettingService.getOptinList().then(function (response) {
                $scope.optin.list = response.data.data;
                SettingService.getOptinListByDomain().then(function (byDomainResponse) {
                    optinListByDomain = byDomainResponse.data.data;
                    if (optinListByDomain.length > 0) {
                        angular.forEach(optinListByDomain, function (theme, key) {
                            isThemeEditable = true;
                            themeManageId = theme.manage_optin_referer;
                            var type = theme.optin_name === 'native-optins' ? 'converting' : theme.optin_name;
                            $scope.optin.themeType = theme.optin_name;
                            if (type !== 'converting') {
                                theme.title ? $scope.optin[type].title = theme.title : '';
                                theme.title_color ? $scope.optin[type].titleTextColor = theme.title_color : '';
                                theme.sub_title ? $scope.optin[type].subTitle = theme.sub_title : '';
                                theme.sub_title_color ? $scope.optin[type].subTitleTextColor = theme.sub_title_color : '';
                                theme.background_color ? $scope.optin[type].optinBackground = theme.background_color : '';
                                theme.allow_btn_text ? $scope.optin[type].allowButtonText = theme.allow_btn_text : '';
                                theme.allow_btn_color ? $scope.optin[type].allowButtonTextColor = theme.allow_btn_color : '';
                                theme.allow_btn_background ? $scope.optin[type].allowButtonBackground = theme.allow_btn_background : '';
                                theme.block_btn_text ? $scope.optin[type].blockButtonText = theme.block_btn_text : '';
                                theme.block_btn_color ? $scope.optin[type].blockButtonTextColor = theme.block_btn_color : '';
                                theme.block_btn_background ? $scope.optin[type].blockButtonBackground = theme.block_btn_background : '';
                                theme.delay ? $scope.optin[type].delay = theme.delay : '';
                            }
                            $scope.optin[type].disableOnMobile = theme.disable_on_mobile ? true : false;
                            $scope.optin[type].isBrandingRemoved = theme.remove_branding ? true : false;
                            if (type !== 'top' && type !== 'bottom')
                                theme.position ? $scope.optin[type].position = theme.position : '';
                        });
                    }
                }, function (error) {
                    console.log(error);
                    if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                        AuthService.revokeAuth();
                        $rootScope.engagetoApp.isAuthenticatedUser = false;
                        $state.go('landing');
                    }
                });
                $rootScope.engagetoApp.isPageLoading = false;
            }, function (error) {
                console.log(error);
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
                    $state.go('landing');
                }
            });
        }
        getOptinList();
        /*
         * @author: sandeep
         * @created: 24 jul 2017
         * @params: deviceType(string)
         * @returns: no
         * @purpose: on change device type function
         */
        function onChangeDeviceType(deviceType) {
            $scope.optin.deviceType = deviceType;
        }
        /*
         * @author: anurag
         * @created: 11 sept 2017
         * @params: none
         * @returns: no
         * @purpose: on click download file
         */
        function onDownloadFile() {
             $rootScope.engagetoApp.isLoading = true;
              SettingService.getDownloadFile().then(function (response) {
                    $rootScope.engagetoApp.isLoading = false;
                    var link = document.createElement('a');
                    link.href = response.data.data.file_path;
                    link.target = "_blank";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }, function (error) {
                    console.log(error);
                });
        }
    }
})(window.angular);