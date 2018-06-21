/**
 * Created by sandeep on 29 Aug 2016.
 * Contains all global function overloads, that were considered to be absolutely necessary
 */
/**
 * String extension that allows C#-style
 * string formatting by calling String.format
 * @returns {String}
 */
String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
};

String.prototype.capitalizeFirstLetter = function () {
    var s = this;
    return s.charAt(0).toUpperCase() + s.slice(1);
};

/**
 * Date extension that allows getting months short and long names localized
 */
Date.prototype.getMonthName = function (lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].month_names[this.getMonth()];
};

Date.prototype.getMonthNameShort = function (lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].month_names_short[this.getMonth()];
};

Date.locale = {
    en: {
        month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
};

function escapeRegExp(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
/*
 * @author: sandeep
 * @created: 06 feb 2017
 * @params: event(object)
 * @returns: boolean
 * @purpose: check validation for emailchimp form
 */
function onSubmitValidation(e) {
    var emailRegex = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
            emailText = $('#mce-EMAIL').val();
    if (emailText != '') {
        $('#email-required').css('display', 'none');
        var validate = emailRegex.test(emailText);
        if (validate) {
            $('#email-valid').css('display', 'none');
            e.submit();
            e.reset();
            return false;
        } else {
            $('#email-valid').css('display', 'inline');
            return false;
        }
    } else {
        $('#email-required').css('display', 'inline');
        return false;
    }
}
$('#mce-EMAIL').focus(function () {
    $('#email-required').css('display', 'none');
    $('#email-valid').css('display', 'none');
});