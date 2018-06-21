(function (angular) {

    'use strict';

    angular
            .module('smartSegmentation')
            .controller('EditSmartSegmentationModalController', editSmartSegmentationModalController);

    editSmartSegmentationModalController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'SmartSegmentationService',
        'SmartSegmentConstant',
        '$timeout',
        'AuthService',
        '$state',
        'SegmentId',
        'EngagetoAppService'
    ];
    function editSmartSegmentationModalController(
            $scope,
            $rootScope,
            $uibModalInstance,
            SmartSegmentationService,
            SmartSegmentConstant,
            $timeout,
            AuthService,
            $state,
            SegmentId,
            EngagetoAppService) {
        $rootScope.engagetoApp.isPageLoading = true;
        $scope.newSmartSegment = {
            isSegmentNameValid: true,
            isSegmentNameBlurded: false,
            criterias: [],
            validationErrorMessage: '',
            close: close,
            onChangeCateory: onChangeCateory,
            hideDangerAlert: hideDangerAlert,
            addMoreCriteria: addMoreCriteria,
            removeSegmentCriteria: removeSegmentCriteria,
            getSubscriberListCount: getSubscriberListCount,
            save: save,
            segmentId: SegmentId
        };
        var segmentCriterias = [];
        SmartSegmentationService.getSegmentById(SegmentId).then(function (response) {
            $scope.newSmartSegment.segmentName = response.data.data.name,
                    $scope.newSmartSegment.segmentType = response.data.data.type,
                    $scope.newSmartSegment.operator = response.data.data.operation;
            if (response.data.data['countries']) {
                angular.forEach(response.data.data['countries'], function (v, k) {
                    var segmentConditionObject = SmartSegmentationService.getSmartSegmentConditionValues();
                    segmentConditionObject.selectedCategory = 'Country',
                            segmentConditionObject.selectedConditionOne = v.operator,
                            segmentConditionObject.index = v.position,
                            segmentConditionObject.ms_id = v.ms_id;
                    if (v.operator !== 'wildcard')
                        segmentConditionObject.selectedCountry = v.list[0];
                    else
                        segmentConditionObject.selectedWildcard = v.list[0];
                    segmentCriterias.push(segmentConditionObject);
                });
            }
            if (response.data.data['cities']) {
                angular.forEach(response.data.data['cities'], function (v, k) {
                    var segmentConditionObject = SmartSegmentationService.getSmartSegmentConditionValues();
                    segmentConditionObject.selectedCategory = 'City',
                            segmentConditionObject.selectedConditionOne = v.operator,
                            segmentConditionObject.index = v.position,
                            segmentConditionObject.ms_id = v.ms_id;
                    if (v.operator !== 'wildcard' && response.data.data.type === 'Audience')
                        segmentConditionObject.selectedAutocomplete = v.list[0];
                    else if (v.operator !== 'wildcard' && response.data.data.type === 'Welcome')
                        segmentConditionObject.selectedCities = v.list[0];
                    else
                        segmentConditionObject.selectedWildcard = v.list[0];
                    segmentCriterias.push(segmentConditionObject);
                });
            }
            if (response.data.data['os']) {
                angular.forEach(response.data.data['os'], function (v, k) {
                    var segmentConditionObject = SmartSegmentationService.getSmartSegmentConditionValues();
                    segmentConditionObject.selectedCategory = 'Operating System',
                            segmentConditionObject.selectedConditionOne = v.operator,
                            segmentConditionObject.selectedAutocomplete = v.list[0],
                            segmentConditionObject.index = v.position,
                            segmentConditionObject.ms_id = v.ms_id;
                    segmentCriterias.push(segmentConditionObject);
                });
            }
            if (response.data.data['devices']) {
                angular.forEach(response.data.data['devices'], function (v, k) {
                    var segmentConditionObject = SmartSegmentationService.getSmartSegmentConditionValues();
                    segmentConditionObject.selectedCategory = 'Device',
                            segmentConditionObject.selectedConditionOne = v.operator,
                            segmentConditionObject.selectedAutocomplete = v.list[0],
                            segmentConditionObject.index = v.position,
                            segmentConditionObject.ms_id = v.ms_id;
                    segmentCriterias.push(segmentConditionObject);
                });
            }
            if (response.data.data['browsers']) {
                angular.forEach(response.data.data['browsers'], function (v, k) {
                    var segmentConditionObject = SmartSegmentationService.getSmartSegmentConditionValues();
                    segmentConditionObject.selectedCategory = 'Browser',
                            segmentConditionObject.selectedConditionOne = v.operator,
                            segmentConditionObject.selectedAutocomplete = v.list.value[0],
                            segmentConditionObject.selectedConditionTwo = v.list.version_operator,
                            segmentConditionObject.versionNumber = v.list.version_list,
                            segmentConditionObject.index = v.position,
                            segmentConditionObject.ms_id = v.ms_id;
                    segmentCriterias.push(segmentConditionObject);
                });
            }
            if (response.data.data['sources']) {
                angular.forEach(response.data.data['sources'], function (v, k) {
                    var segmentConditionObject = SmartSegmentationService.getSmartSegmentConditionValues();
                    segmentConditionObject.selectedCategory = 'Traffic Source',
                            segmentConditionObject.selectedConditionOne = v.operator,
                            segmentConditionObject.index = v.position,
                            segmentConditionObject.ms_id = v.ms_id;
                    if (v.operator === 'contains' || v.operator === 'does not contains')
                        segmentConditionObject.trafficKeywords = v.list[0];
                    else
                        segmentConditionObject.selectedWildcard = v.list[0];
                    segmentCriterias.push(segmentConditionObject);
                });
            }
            if (response.data.data['subscribed_url']) {
                angular.forEach(response.data.data['subscribed_url'], function (v, k) {
                    var segmentConditionObject = SmartSegmentationService.getSmartSegmentConditionValues();
                    segmentConditionObject.selectedCategory = 'Subscribed from a URL',
                            segmentConditionObject.selectedConditionOne = v.operator,
                            segmentConditionObject.index = v.position,
                            segmentConditionObject.ms_id = v.ms_id;
                    if (v.operator === 'contains' || v.operator === 'does not contains')
                        segmentConditionObject.urlKeywords = v.list[0];
                    else if (v.operator === 'equals' || v.operator === 'does not equals')
                        segmentConditionObject.searchUrl = v.list[0];
                    else
                        segmentConditionObject.selectedWildcard = v.list[0];
                    segmentCriterias.push(segmentConditionObject);
                });
            }
            if (response.data.data['subscribed_date']) {
                angular.forEach(response.data.data['subscribed_date'], function (v, k) {
                    var segmentConditionObject = SmartSegmentationService.getSmartSegmentConditionValues();
                    segmentConditionObject.selectedCategory = 'Subscribed on Date',
                            segmentConditionObject.selectedConditionOne = v.operator,
                            segmentConditionObject.subscriberDate = v.list[0],
                            segmentConditionObject.index = v.position,
                            segmentConditionObject.ms_id = v.ms_id;
                    segmentCriterias.push(segmentConditionObject);
                });
            }
            segmentCriterias.sort(arrageInAsenddingOrder);
            $scope.newSmartSegment.criterias = segmentCriterias;
            $rootScope.engagetoApp.isPageLoading = false;
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
            $scope.newSmartSegment.criterias.push({
                selectedCategory: 'Select Category',
                selectedConditionOne: 'Select Condition',
                countryList: SmartSegmentationService.getCountryList(),
                selectedCountry: '',
                autocompleteList: [],
                selectedAutocomplete: '',
                selectedWildcard: '',
                allCityList: [],
                selectedCities: '',
                selectedConditionTwo: 'Select Condition',
                versionNumber: '',
                isVersionValid: true,
                isVersionBlured: false,
                searchUrl: '',
                isUrlBlured: false,
                isUrlValid: true,
                urlKeywords: '',
                subscriberDate: ''
            });
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
         * @created : 09 jan 2016
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
                    v.ms_id ? countries[countries.length - 1].ms_id = v.ms_id : '';
                    v.selectedConditionOne !== 'wildcard' ? countries[countries.length - 1].list.push(v.selectedCountry) : countries[countries.length - 1].list.push(v.selectedWildcard);
                }
                if (v.selectedCategory === 'City') {
                    cities.push({
                        operator: v.selectedConditionOne,
                        position: k,
                        list: []
                    });
                    v.ms_id ? cities[cities.length - 1].ms_id = v.ms_id : '';
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
                    v.ms_id ? browsers[browsers.length - 1].ms_id = v.ms_id : '';
                    browsers[browsers.length - 1].list['value'].push(v.selectedAutocomplete);
                }
                if (v.selectedCategory === 'Device') {
                    devices.push({
                        operator: v.selectedConditionOne,
                        position: k,
                        list: []
                    });
                    v.ms_id ? devices[devices.length - 1].ms_id = v.ms_id : '';
                    devices[devices.length - 1].list.push(v.selectedAutocomplete);
                }
                if (v.selectedCategory === 'Operating System') {
                    os.push({
                        operator: v.selectedConditionOne,
                        position: k,
                        list: []
                    });
                    v.ms_id ? os[os.length - 1].ms_id = v.ms_id : '';
                    os[os.length - 1].list.push(v.selectedAutocomplete);
                }
                if (v.selectedCategory === 'Subscribed from a URL') {
                    subscribed_url.push({
                        operator: v.selectedConditionOne,
                        position: k,
                        list: []
                    });
                    v.ms_id ? subscribed_url[subscribed_url.length - 1].ms_id = v.ms_id : '';
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
                    v.ms_id ? subscribed_date[subscribed_date.length - 1].ms_id = v.ms_id : '';
                    subscribed_date[subscribed_date.length - 1].list.push(v.subscriberDate);
                }
                if (v.selectedCategory === 'Traffic Source') {
                    sources.push({
                        operator: v.selectedConditionOne,
                        position: k,
                        list: []
                    });
                    v.ms_id ? sources[sources.length - 1].ms_id = v.ms_id : '';
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
            SmartSegmentationService.updateSegment(addSegment, SegmentId).then(function (response) {
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
         * @created : 23 jun 2017
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

        function arrageInAsenddingOrder(objectA, objectB) {
            return (objectA.index - objectB.index);
        }
    }
})(window.angular);