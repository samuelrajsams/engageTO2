(function (angular) {
    'use strict';

    angular
            .module('settings')
            .controller('SubOptinsController', subOptinsController);

    subOptinsController.$inject = [
        '$scope',
        '$rootScope',
        'SettingService',
        'AuthService',
        '$state',
        'EngagetoAppService'
    ];

    function subOptinsController(
            $scope,
            $rootScope,
            SettingService,
            AuthService,
            $state,
            EngagetoAppService) {
        $rootScope.engagetoApp.isPageLoading = false;
        $scope.subOptin = {
            text: '',
            backgroundColor: '#196ae5',
            textColor: '#ffffff',
            position: 'right',
            theme: 'side',
            leftPositionValue: '',
            rightPositionValue: '0',
            bottomPositionValue: '0',
            roundedNotificationStyle: {
                'left': 'auto',
                'right': '0',
                'bottom': '0'
            },
            onClickSave: onClickSave,
            onChangePosition: onChangePosition,
            onChangetheme: onChangetheme,
            onKeyDown: onKeyDown
        };
        var isLeftValueSet = false;
        /*
         * @author: sandeep
         * @created: 05 may 2017
         * @params: no
         * @return: no
         * @purpose: onClickSave function close optin overlay
         */
        function onClickSave() {
            $rootScope.engagetoApp.isLoading = true;
            var subOptinData = {
                text: $scope.subOptin.text,
                text_color: $scope.subOptin.textColor,
                background_color: $scope.subOptin.backgroundColor,
                position: $scope.subOptin.position,
                theme: {
                    type: $scope.subOptin.theme,
                    bottom: $scope.subOptin.bottomPositionValue
                }
            };
            if ($scope.subOptin.position === 'right')
                subOptinData.theme.right = $scope.subOptin.rightPositionValue;
//                subOptinData.theme.right = $scope.subOptin.rightPositionValue;
            else
                subOptinData.theme.left = $scope.subOptin.leftPositionValue === '' ? '0' : $scope.subOptin.leftPositionValue;

            if (!$scope.subOptin.subOptinId) {
                SettingService.addSubOptin(subOptinData).then(function (response) {
                    $rootScope.engagetoApp.isLoading = false;
                    EngagetoAppService.showSuccessMessage('Sub Option created Successfully.');
                    getSubOptinsList(); 
                }, function (error) {
                    console.log(error);
                    if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                        AuthService.revokeAuth();
                        $rootScope.engagetoApp.isAuthenticatedUser = false;
                        $state.go('landing');
                    }
                });
            } else {
                SettingService.updateSubOptin(subOptinData, $scope.subOptin.subOptinId).then(function (response) {
                    $rootScope.engagetoApp.isLoading = false;
                    EngagetoAppService.showSuccessMessage('Sub Option updated Successfully.');
                    getSubOptinsList();
                }, function (error) {
                    console.log(error);
                    if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                        AuthService.revokeAuth();
                        $rootScope.engagetoApp.isAuthenticatedUser = false;
                        $state.go('landing');
                    }
                });
            }
        }

        /*
         * @author: sandeep
         * @created: 14 jul 2017
         * @params: no
         * @return: no
         * @purpose: onChangePosition function fires when postion changed
         */
        function onChangePosition() {
            if ($scope.subOptin.theme === 'round') {
                if ($scope.subOptin.position === 'left') {
                    $scope.subOptin.roundedNotificationStyle.right = 'auto';
                    $scope.subOptin.roundedNotificationStyle.left = $scope.subOptin.leftPositionValue !== '' ? $scope.subOptin.leftPositionValue + 'px' : '0px';
                    $scope.subOptin.roundedNotificationStyle.bottom = $scope.subOptin.bottomPositionValue !== '' ? $scope.subOptin.bottomPositionValue + 'px' : '0px';
                    if ($scope.subOptin.leftPositionValue !== '' && !isLeftValueSet) {
                        $scope.subOptin.leftPositionValue = 0;
                        isLeftValueSet = true;
                    }
                } else {
                    $scope.subOptin.roundedNotificationStyle.left = 'auto';
                    $scope.subOptin.roundedNotificationStyle.right = $scope.subOptin.rightPositionValue !== '' ? $scope.subOptin.rightPositionValue + 'px' : '0px';
                    $scope.subOptin.roundedNotificationStyle.bottom = $scope.subOptin.bottomPositionValue !== '' ? $scope.subOptin.bottomPositionValue + 'px' : '0px';
                }
            }
        }

        /*
         * @author: sandeep
         * @created: 25 jul 2017
         * @params: no
         * @return: no
         * @purpose: onChangeTheme function fires when theme changed
         */
        function onChangetheme() {
            if ($scope.subOptin.theme === 'round') {
                if ($scope.subOptin.position === 'left') {
                    $scope.subOptin.roundedNotificationStyle.right = 'auto';
                    $scope.subOptin.roundedNotificationStyle.left = $scope.subOptin.leftPositionValue !== '' ? $scope.subOptin.leftPositionValue + 'px' : '0px';
                    $scope.subOptin.roundedNotificationStyle.bottom = $scope.subOptin.bottomPositionValue !== '' ? $scope.subOptin.bottomPositionValue + 'px' : '0px';
                    $scope.subOptin.leftPositionValue !== '' ? $scope.subOptin.leftPositionValue : $scope.subOptin.leftPositionValue = 0;
                }
            }
        }

        $scope.$watchGroup(['subOptin.leftPositionValue', 'subOptin.rightPositionValue', 'subOptin.bottomPositionValue'], function (newArray, oldArray) {
            onChangePosition();
        });

        /*
         * @author: sandeep
         * @created: 25 jul 2017
         * @returns: no
         * @params: no
         * @purpose: get list of sub optins
         * @updated: created function to get list and for calling after save and update
         * @updated at: 11 sept 2017
         */
        function getSubOptinsList() {
            SettingService.getSubOptinListByDomain().then(function (response) {
                if (response.data.data.length > 0) {
                    angular.forEach(response.data.data, function (subOptin, subOptinKey) {
                        if (subOptinKey === response.data.data.length - 1) {
                            $scope.subOptin.text = subOptin.text,
                                    subOptin.text_color !== '' && subOptin.text_color ? $scope.subOptin.textColor = subOptin.text_color : '',
                                    subOptin.background_color !== '' && subOptin.background_color ? $scope.subOptin.backgroundColor = subOptin.background_color : '',
                                    subOptin.position !== '' && subOptin.position ? $scope.subOptin.position = subOptin.position : '',
                                    $scope.subOptin.subOptinId = subOptin.sub_optin_referer,
                                    subOptin.theme.type !== '' && subOptin.theme.type ? $scope.subOptin.theme = subOptin.theme.type : '';
                            if (subOptin.theme.type === 'round') {
                                $scope.subOptin.bottomPositionValue = subOptin.theme.bottom;
                                if (subOptin.theme.hasOwnProperty('right')) {
                                    //$scope.subOptin.rightPositionValue = subOptin.theme.left;
                                    $scope.subOptin.rightPositionValue = subOptin.theme.right;
                                    $scope.subOptin.roundedNotificationStyle.left = 'auto';
                                    $scope.subOptin.roundedNotificationStyle.right = $scope.subOptin.rightPositionValue !== '' ? $scope.subOptin.rightPositionValue + 'px' : '0px';
                                    $scope.subOptin.roundedNotificationStyle.bottom = $scope.subOptin.bottomPositionValue !== '' ? $scope.subOptin.bottomPositionValue + 'px' : '0px';
                                    $scope.subOptin.leftPositionValue = '';
                                } else {
                                    $scope.subOptin.leftPositionValue = subOptin.theme.left;
                                    $scope.subOptin.roundedNotificationStyle.right = 'auto';
                                    $scope.subOptin.roundedNotificationStyle.left = $scope.subOptin.leftPositionValue !== '' ? $scope.subOptin.leftPositionValue + 'px' : '0px';
                                    $scope.subOptin.roundedNotificationStyle.bottom = $scope.subOptin.bottomPositionValue !== '' ? $scope.subOptin.bottomPositionValue + 'px' : '0px';
                                    $scope.subOptin.rightPositionValue = '0';
                                }
                            } else {
                                $scope.subOptin.roundedNotificationStyle.left = 'auto';
                                $scope.subOptin.roundedNotificationStyle.right = '0';
                                $scope.subOptin.roundedNotificationStyle.bottom = '0';
                            }
                        }
                    });
                }
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
        
         getSubOptinsList();
        /*
         * @author: sandeep
         * @created: 25 jul 2017
         * @returns: no
         * @params: $event(object), field(string)
         * @purpose: onKeyDown function to change values of right/left/bottom
         */
        function onKeyDown($event, field) {
            if ($event.keyCode == 38) {
                $scope.subOptin[field]++;
            } else if ($event.keyCode == 40) {
                $scope.subOptin[field]--;
            }
        }
    }
})(window.angular);