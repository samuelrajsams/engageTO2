(function (angular) {

    'use strict';

    angular
            .module('smartSegmentation')
            .controller('NewSmartSegmentationModalController', newSmartSegmentationModalController);

    newSmartSegmentationModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'SmartSegmentationService',
        'SmartSegmentConstant',
        '$timeout',
        'AuthService',
        '$state',
        'EngagetoAppService'
    ];
    function newSmartSegmentationModalController(
            $scope,
            $rootScope,
            $uibModalInstance,
            SmartSegmentationService,
            SmartSegmentConstant,
            $timeout,
            AuthService,
            $state,
            EngagetoAppService) {
        $scope.newSmartSegment = {
            segmentType: 'Audience',
            segmentName: '',
            SubscriberListCount: 0,
            isSegmentNameValid: true,
            isSegmentNameBlurded: false,
            operator: 'AND',
            criterias: [SmartSegmentationService.getSmartSegmentConditionValues()],
            validationErrorMessage: '',
            close: close,
            onChangeCateory: onChangeCateory,
            hideDangerAlert: hideDangerAlert,
            addMoreCriteria: addMoreCriteria,
            removeSegmentCriteria: removeSegmentCriteria,
            save: save,
            getSubscriberListCount: getSubscriberListCount
        };
        /*
         * @author: sandeep
         * @created: 18 nov 2016
         * @params: no
         * @return: no
         * @purpose: close add website modal popup
         */
        function close() {
            $uibModalInstance.dismiss('cancel');
        }
        /*
         * @author: sandeep
         * @created: 07 dec 2016
         * @params: index(number)
         * @return: no
         * @purpose: onChangeCateory apply values
         */
        function onChangeCateory(index) {
            $scope.newSmartSegment.criterias[index].selectedConditionOne = 'Select Condition';
            if ($scope.newSmartSegment.criterias[index].selectedCategory === 'Browser') {
                $scope.newSmartSegment.criterias[index].autocompleteList = SmartSegmentConstant.browser_types;
            }
            if ($scope.newSmartSegment.criterias[index].selectedCategory === 'Operating System') {
                $scope.newSmartSegment.criterias[index].autocompleteList = SmartSegmentConstant.operating_system_types;
            }
            if ($scope.newSmartSegment.criterias[index].selectedCategory === 'Device') {
                $scope.newSmartSegment.criterias[index].autocompleteList = SmartSegmentConstant.device_types;
            }
            if ($scope.newSmartSegment.criterias[index].selectedCategory === 'City') {
                if (index === 0 && $scope.newSmartSegment.segmentType === 'Audience') {
                    $scope.newSmartSegment.validationErrorMessage = 'For Audience type segment, you should first select at least one Country';
                }
                if (index > 0 && $scope.newSmartSegment.segmentType === 'Audience') {
                    var found = false, countryName = '';
                    angular.forEach($scope.newSmartSegment.criterias, function (v, k) {
                        if (k < index && v.selectedCategory === 'Country') {
                            found = true;
                            countryName = v.selectedCountry;
                        }
                    });
                    if (!found)
                        $scope.newSmartSegment.validationErrorMessage = 'For Audience type segment, you should first select at least one Country';
                    else {
                        SmartSegmentationService.getCitiesByCountry(countryName).then(function (response) {
                            $scope.newSmartSegment.criterias[index].autocompleteList = response;
                        }, function (error) {
                            console.log(error);
                        });
                    }
                }
            }
//            if ($scope.newSmartSegment.criterias[index].selectedCategory === 'Browser' || $scope.newSmartSegment.criterias[index].selectedCategory === 'Device' ||
//                    $scope.newSmartSegment.criterias[index].selectedCategory === 'Operating System') {
//                console.log($scope.newSmartSegment.criterias[index]);
//                $timeout(function () {
////                    $('#selectGeneric' + index).selectpicker('destroy');
//                    $('#selectGeneric' + index).selectpicker({
//                        style: 'btn-default',
//                        liveSearch: true
//                    });
////                    $('#selectGeneric' + index).selectpicker('val', '');
//                    $('#selectGeneric' + index).on('changed.bs.select', function (event, index, newValue, oldValue) {
//                        console.log($('#selectGeneric' + index));
////                        $scope.newSmartSegment.criterias[index].selectedAutocomplete = $('#selectGeneric' + index).selectpicker('val');
//                    });
//                }, 2000);
//            }
            console.log($scope.newSmartSegment.criterias[index].autocompleteList);
        }

        /*
         * @author : sandeep
         * @created : 08 dec 2016
         * @params: no
         * @return: no
         * @purpose: closing danger alert
         */
        function hideDangerAlert() {
            $scope.newSmartSegment.validationErrorMessage = '';
        }

        /*
         * @author : sandeep
         * @created : 08 dec 2016
         * @params: no
         * @return: no
         * @purpose: addMoreCriteria function
         */
        function addMoreCriteria() {
            $scope.newSmartSegment.criterias.push(SmartSegmentationService.getSmartSegmentConditionValues());
        }
        /*
         * @author : sandeep
         * @created : 08 dec 2016
         * @params: index(number)
         * @return: no
         * @purpose: removeSegmentCriteria function
         */
        function removeSegmentCriteria(index) {
            $scope.newSmartSegment.criterias.splice(index, 1);
        }
        /*
         * @author : sandeep
         * @created : 09 jan 2017
         * @params: no
         * @return: no
         * @purpose: save smart segment function
         */
        function save() {
            $rootScope.engagetoApp.isLoading = true;
            var addSegment = {
                name: $scope.newSmartSegment.segmentName,
                type: $scope.newSmartSegment.segmentType,
                operation: $scope.newSmartSegment.operator
            }, countries = [], cities = [], browsers = [], os = [], devices = [], sources = [], subscribed_date = [],
                    subscribed_url = [];

            angular.forEach($scope.newSmartSegment.criterias, function (v, k) {
                if (v.selectedCategory === 'Country') {
                    countries.push({
                        operator: v.selectedConditionOne,
                        position: k,
                        list: []
                    });
                    v.selectedConditionOne !== 'wildcard' ? countries[countries.length - 1].list.push(v.selectedCountry) : countries[countries.length - 1].list.push(v.selectedWildcard);
                }
                if (v.selectedCategory === 'City') {
                    cities.push({
                        operator: v.selectedConditionOne,
                        position: k,
                        list: []
                    });
                    v.selectedConditionOne !== 'wildcard' && $scope.newSmartSegment.segmentType === 'Audience'
                            ? cities[cities.length - 1].list.push(v.selectedAutocomplete) :
                            v.selectedConditionOne !== 'wildcard' && $scope.newSmartSegment.segmentType === 'Welcome'
                            ? cities[cities.length - 1].list.push(v.selectedCities) :
                            cities[cities.length - 1].list.push(v.selectedWildcard);

                }
                if (v.selectedCategory === 'Browser') {
                    browsers.push({
                        operator: v.selectedConditionOne,
                        position: k,
                        list: {
                            value: [],
                            version_operator: v.selectedConditionTwo,
                            version_list: v.versionNumber
                        }
                    });
                    browsers[browsers.length - 1].list['value'].push(v.selectedAutocomplete);
                }
                if (v.selectedCategory === 'Device') {
                    devices.push({
                        operator: v.selectedConditionOne,
                        position: k,
                        list: []
                    });
                    devices[devices.length - 1].list.push(v.selectedAutocomplete);
                }
                if (v.selectedCategory === 'Operating System') {
                    os.push({
                        operator: v.selectedConditionOne,
                        position: k,
                        list: []
                    });
                    os[os.length - 1].list.push(v.selectedAutocomplete);
                }
                if (v.selectedCategory === 'Subscribed from a URL') {
                    subscribed_url.push({
                        operator: v.selectedConditionOne,
                        position: k,
                        list: []
                    });
                    v.selectedConditionOne === 'equals' || v.selectedConditionOne === 'does not equals' ? subscribed_url[subscribed_url.length - 1].list.push(v.searchUrl) :
                            v.selectedConditionOne === 'contains' || v.selectedConditionOne === 'does not contains' ? subscribed_url[subscribed_url.length - 1].list.push(v.urlKeywords) :
                            subscribed_url[subscribed_url.length - 1].list.push(v.selectedWildcard);
                }
                if (v.selectedCategory === 'Subscribed on Date') {
                    subscribed_date.push({
                        operator: v.selectedConditionOne,
                        position: k,
                        list: []
                    });
                    subscribed_date[subscribed_date.length - 1].list.push(v.subscriberDate);
                }
                if (v.selectedCategory === 'Traffic Source') {
                    sources.push({
                        operator: v.selectedConditionOne,
                        position: k,
                        list: []
                    });
                    v.selectedConditionOne === 'contains' || v.selectedConditionOne === 'does not contains' ? sources[sources.length - 1].list.push(v.trafficKeywords) :
                            sources[sources.length - 1].list.push(v.selectedWildcard);
                }
            });
            if (countries.length > 0)
                addSegment.countries = countries;
            if (cities.length > 0)
                addSegment.cities = cities;
            if (devices.length > 0)
                addSegment.devices = devices;
            if (browsers.length > 0)
                addSegment.browsers = browsers;
            if (os.length > 0)
                addSegment.os = os;
            if (sources.length > 0)
                addSegment.sources = sources;
            if (subscribed_date.length > 0)
                addSegment.subscribed_date = subscribed_date;
            if (subscribed_url.length > 0)
                addSegment.subscribed_url = subscribed_url;
            SmartSegmentationService.addSegment(addSegment).then(function (response) {
                $rootScope.engagetoApp.isLoading = false;
                EngagetoAppService.showSuccessMessage(response.data.data.message);
                $timeout(function () {
                    $uibModalInstance.close('close');
                }, 2000);
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
         * @author : sandeep
         * @created : 15 feb 2017
         * @params: conditionType(string)
         * @return: no
         * @purpose: getSubscriberListCount function
         */
        function getSubscriberListCount(conditionType, index) {
            if ($scope.newSmartSegment.segmentType === 'Audience' &&
                    ((conditionType === 'Country' && $scope.newSmartSegment.criterias[index].selectedCountry !== '') ||
                            (conditionType === 'autoComplete' && $scope.newSmartSegment.criterias[index].selectedAutocomplete !== '') ||
                            (conditionType === 'city' && $scope.newSmartSegment.criterias[index].selectedCities !== '') ||
                            (conditionType === 'wildcard' && $scope.newSmartSegment.criterias[index].selectedWildcard !== '') ||
                            (conditionType === 'version' && $scope.newSmartSegment.criterias[index].versionNumber !== '') ||
                            (conditionType === 'traffic' && $scope.newSmartSegment.criterias[index].trafficKeywords !== '') ||
                            (conditionType === 'date' && $scope.newSmartSegment.criterias[index].subscriberDate !== '') ||
                            (conditionType === 'url' && $scope.newSmartSegment.criterias[index].urlKeywords !== ''))) {
                var segmentConditions = {
                    operation: $scope.newSmartSegment.operator
                }, countries = [], cities = [], browsers = [], os = [], devices = [], sources = [], subscribed_date = [],
                        subscribed_url = [];

                angular.forEach($scope.newSmartSegment.criterias, function (v, k) {
                    if (v.selectedCategory === 'Country') {
                        countries.push({
                            operator: v.selectedConditionOne,
                            position: k,
                            list: []
                        });
                        v.selectedConditionOne !== 'wildcard' ? countries[countries.length - 1].list.push(v.selectedCountry) : countries[countries.length - 1].list.push(v.selectedWildcard);
                    }
                    if (v.selectedCategory === 'City') {
                        cities.push({
                            operator: v.selectedConditionOne,
                            position: k,
                            list: []
                        });
                        v.selectedConditionOne !== 'wildcard' && $scope.newSmartSegment.segmentType === 'Audience'
                                ? cities[cities.length - 1].list.push(v.selectedAutocomplete) :
                                v.selectedConditionOne !== 'wildcard' && $scope.newSmartSegment.segmentType === 'Welcome'
                                ? cities[cities.length - 1].list.push(v.selectedCities) :
                                cities[cities.length - 1].list.push(v.selectedWildcard);

                    }
                    if (v.selectedCategory === 'Browser') {
                        browsers.push({
                            operator: v.selectedConditionOne,
                            position: k,
                            list: {
                                value: [],
                                version_operator: v.selectedConditionTwo,
                                version_list: v.versionNumber
                            }
                        });
                        browsers[browsers.length - 1].list['value'].push(v.selectedAutocomplete);
                    }
                    if (v.selectedCategory === 'Device') {
                        devices.push({
                            operator: v.selectedConditionOne,
                            position: k,
                            list: []
                        });
                        devices[devices.length - 1].list.push(v.selectedAutocomplete);
                    }
                    if (v.selectedCategory === 'Operating System') {
                        os.push({
                            operator: v.selectedConditionOne,
                            position: k,
                            list: []
                        });
                        os[os.length - 1].list.push(v.selectedAutocomplete);
                    }
                    if (v.selectedCategory === 'Subscribed from a URL') {
                        subscribed_url.push({
                            operator: v.selectedConditionOne,
                            position: k,
                            list: []
                        });
                        v.selectedConditionOne === 'equals' || v.selectedConditionOne === 'does not equals' ? subscribed_url[subscribed_url.length - 1].list.push(v.searchUrl) :
                                v.selectedConditionOne === 'contains' || v.selectedConditionOne === 'does not contains' ? subscribed_url[subscribed_url.length - 1].list.push(v.urlKeywords) :
                                subscribed_url[subscribed_url.length - 1].list.push(v.selectedWildcard);
                    }
                    if (v.selectedCategory === 'Subscribed on Date') {
                        subscribed_date.push({
                            operator: v.selectedConditionOne,
                            position: k,
                            list: []
                        });
                        subscribed_date[subscribed_date.length - 1].list.push(v.subscriberDate);
                    }
                    if (v.selectedCategory === 'Traffic Source') {
                        sources.push({
                            operator: v.selectedConditionOne,
                            position: k,
                            list: []
                        });
                        v.selectedConditionOne === 'contains' || v.selectedConditionOne === 'does not contains' ? sources[sources.length - 1].list.push(v.trafficKeywords) :
                                sources[sources.length - 1].list.push(v.selectedWildcard);
                    }
                });
                if (countries.length > 0)
                    segmentConditions.countries = countries;
                if (cities.length > 0)
                    segmentConditions.cities = cities;
                if (devices.length > 0)
                    segmentConditions.devices = devices;
                if (browsers.length > 0)
                    segmentConditions.browsers = browsers;
                if (os.length > 0)
                    segmentConditions.os = os;
                if (sources.length > 0)
                    segmentConditions.sources = sources;
                if (subscribed_date.length > 0)
                    segmentConditions.subscribed_date = subscribed_date;
                if (subscribed_url.length > 0)
                    segmentConditions.subscribed_url = subscribed_url;
                SmartSegmentationService.getSubscribers(segmentConditions).then(function (response) {
                    $scope.newSmartSegment.SubscriberListCount = response.data.data.total_subs;
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
                console.log('Not Able to get counts');
            }
        }
    }
})(window.angular);