(function(angular){
    'use strict';
    angular
            .module('engageto')
            .directive('engagetoLoaderImage', engagetoLoaderImageDirective);
    
    engagetoLoaderImageDirective.$inject = [];
    function engagetoLoaderImageDirective(){
        return {
            restirct: 'E',
            template: '<i class="fa fa-refresh fa-spin fa-fw"></i>'
        };
    }
})(window.angular);

