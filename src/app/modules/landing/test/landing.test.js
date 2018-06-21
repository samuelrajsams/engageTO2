(function () {

    'use strict';

    describe('Push Notification Controller Suites', function () {
        beforeEach(module('engageto'));
        beforeEach(module('landing'));

        var $controller;

        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));

        describe('landing suite', function () {
            var scope, controller;

            beforeEach(function () {
                scope = {};
                controller = $controller('LandingController', {$scope: scope});
            });

            it('checking controller is defined', function () {
                expect(controller).toBeDefined();
            });
        });
    });
})();


