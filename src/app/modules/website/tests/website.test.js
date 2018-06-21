(function () {

    'use strict';

    describe('Website Domain Management Controller Suites', function () {
        beforeEach(module('engageto'));
        beforeEach(module('website'));

        var $controller;

        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));

        describe('domain management suite', function () {
            var scope, controller;

            beforeEach(function () {
                scope = {};
                controller = $controller('DomainManagemetController', {$scope: scope});
            });

            it('checking controller is defined', function () {
                expect(controller).toBeDefined();
            });
        });
    });
})();


