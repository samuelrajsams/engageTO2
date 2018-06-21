/* jshint ignore:start */
// Code here will be ignored by JSHint.
'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
  // Init module configuration options
  var applicationModuleName = 'engageto';
  var applicationModuleVendorDependencies = [
    'ui.router',
    'ui.bootstrap',
    'ngStorage',
    'ngFileUpload',
    'rzModule',
    'datatables',
    'datatables.bootstrap',
    'ngAnimate',
    'duScroll',
    'ngclipboard',
    'rzModule',
    'toastr',
    'daterangepicker',
    'colorpicker.module',
    'ngImgCrop'
  ];
  // Add a new vertical module
  var registerModule = function (moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
  };
})();
/* jshint ignore:end */
