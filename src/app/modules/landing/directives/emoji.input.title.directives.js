(function (angular) {
    'use strict';
    angular
            .module('landing')
            .directive('emojiInputTitle', emojiInputTitleDirective);
    emojiInputTitleDirective.$inject = []

    function emojiInputTitleDirective() {
        return {
           restrict: 'A',
           template: '',
           link: emojiInputTitleLink
        };
        function emojiInputTitleLink(scope, iElement, iAttrs){
//            console.log(iAttrs, iAttrs.id);
//            $('#notificationTitle').emojioneArea();
        }
    }
})(window.angular);