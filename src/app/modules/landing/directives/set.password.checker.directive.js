(function (angular) {

    angular
            .module('landing')
            .directive('setPasswordCheckerDirective', setPasswordCheckerDirective);

    function setPasswordCheckerDirective() {
        var setPasswordCheckerDirective = {
            restrict: 'EA',
            replace: false,
            template: '<div class="password-strength-wrapper clearfix"><span class="password-strength-color"></span><span class="password-strength-text"></span></div>',
            link: passwordCheckerLink
        };

        return setPasswordCheckerDirective;

    }
    function passwordCheckerLink(scope, iElement, iAttrs) {
        var strength = {
            colors: ['#F00', '#ffa93c', '#ffa93c', '#9F0', '#05a705'],
            mesureStrength: function (p) {

                var _force = 0;
                var _regex = /[$-/:-?@#{-~!"^_`\[\]]/g;

                var _lowerLetters = /[a-z]+/.test(p);
                var _upperLetters = /[A-Z]+/.test(p);
                var _numbers = /[0-9]+/.test(p);
                var _symbols = _regex.test(p);
                var _flags = [ _lowerLetters, _upperLetters, _numbers, _symbols];
                var _passedMatches = $.grep(_flags, function (el) {
                    return el === true;
                }).length;
                _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
                _force += _passedMatches * 10;

                // penality (short password)
                _force = (p.length < 9) ? Math.min(_force, 10) : _force;
                // penality (poor variety of characters)
//                _force = (_passedMatches == 1) ? Math.min(_force, 10) : _force;
//                _force = (_passedMatches == 2) ? Math.min(_force, 20) : _force;
//                _force = (_passedMatches == 3 && _force === 10) ? Math.min(_force, 40) : _force;
//                _force = (_passedMatches == 3 && _force > 10) ? Math.min(_force, 50) : _force;
                _force = (_passedMatches == 0) ? Math.min(_force, 10) : (_passedMatches == 1) ? Math.min(_force, 20) : (_passedMatches == 2) ? Math.min(_force, 20) : (_passedMatches == 3) ? Math.min(_force, 30) : (_passedMatches == 4 && p.length < 9) ? Math.min(_force, 40) : _force;
                return _force;

            },
            getColor: function (s) {

                var idx = 0;
                if (s <= 10) {
                    idx = 0;
                }
                else if (s <= 20) {
                    idx = 1;
                }
                else if (s <= 30) {
                    idx = 2;
                }
                else if (s <= 40) {
                    idx = 3;
                }
                else {
                    idx = 4;
                }

                return {idx: idx + 1, col: this.colors[idx]};

            }
        };
        scope.$watch(iAttrs.setPasswordCheckerDirective, function () {
            if (scope.setPassword.password === '' || !scope.setPassword.password) {
                iElement.css({"display": "none"});
            } else {
                iElement.css({"display": "inline"});
                var c = strength.getColor(strength.mesureStrength(scope.setPassword.password));
                scope.setPassword.validPassword = c.idx >= 5 ? true : false;
                if (c.idx <= 1) {
                    iElement.children('div').children('span')[0].style.background = c.col;
                    iElement.children('div').children('span')[1].innerHTML = 'Weak';
                } else if(c.idx > 1 && c.idx < 5){
                    iElement.children('div').children('span')[0].style.background = c.col;
                    iElement.children('div').children('span')[1].innerHTML = 'Medium';
                } else if(c.idx >= 5){
                    iElement.children('div').children('span')[0].style.background = c.col;
                    iElement.children('div').children('span')[1].innerHTML = 'Strong';
                }
            }
        });

    }
})(window.angular);


