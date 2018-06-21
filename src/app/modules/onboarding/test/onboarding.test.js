(function () {

    'use strict';

    describe('Push Notification Controller Suites', function () {
        beforeEach(module('engageto'));
        beforeEach(module('onboarding'));

        var $controller;

        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));

        describe('landing suite', function () {
            var scope, controller;

            beforeEach(function () {
                scope = {};
                controller = $controller('OnboardingController', {$scope: scope});
            });

            it('checking controller is defined', function () {
                expect(controller).toBeDefined();
            });
        });
    });
})();


