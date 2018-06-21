(function (angular) {
    'use strict';

// Setting up route
    angular
            .module('teamManagement')
            .config(teamManagementConfig);

    teamManagementConfig.$inject = [
        '$stateProvider'
    ];

    function teamManagementConfig(
            $stateProvider) {
        // Home state routing
        $stateProvider.
                state('side-nav-template.team-management', {
                    url: '/app/team-management?id&state',
                    templateUrl: 'app/modules/team_management/views/team.management.html',
                    controller: 'TeamManagementController',
                    authenticate: true
                });
    }
})(window.angular);
