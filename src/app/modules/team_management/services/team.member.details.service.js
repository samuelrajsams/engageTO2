(function (angular) {

    'use strict';

    angular
            .module('teamManagement')
            .factory('TeamMemberDetailsService', teamMemberDetailsService);

    teamMemberDetailsService.$inject = [
    ];

    function teamMemberDetailsService() {
        return {
            getAddTeamMemberValues: getAddTeamMemberValues
        };
        /*
         * @author: sandeep
         * @created: 03 dec 2016
         * @params: no
         * @return: no
         * @purpose: getting list of team memebers
         */
        function getAddTeamMemberValues() {
            return {
                firstName: '',
                isFirstNameRequired: false,
                lastName: '',
                isLastNameRequired: false,
                emailAddress: '',
                isEmailAddressRequired: false,
                isUrlValid: false,
                selectRole: '',
                isSelectRoleRequired: false,
                websites: '',
                isWebsitesRequired: false
            };
        }   
    }
})(window.angular);
