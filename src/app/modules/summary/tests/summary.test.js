(function () {

    'use strict';

    describe('Summary Controller Suites', function () {
        beforeEach(module('engageto'));
        beforeEach(module('summary'));

        var $controller;

        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));

        describe('summary suite', function () {
            var scope, controller;

            beforeEach(function () {
                scope = {};
                controller = $controller('SummaryController', {$scope: scope});
            });

            it('checking controller is defined', function () {
                expect(controller).toBeDefined();
            });
        });
    });
})();


