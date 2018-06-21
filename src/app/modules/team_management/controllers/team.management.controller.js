(function (angular) {

    'use strict';

    angular
            .module('teamManagement')
            .controller('TeamManagementController', teamManagementController);

    teamManagementController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModal',
        'TeamManagementService',
        '$localStorage',
        'DTOptionsBuilder',
        'DTColumnDefBuilder',
        'AuthService',
        '$state',
        'SigninModalService'
    ];

    function teamManagementController(
            $scope,
            $rootScope,
            $uibModal,
            TeamManagementService,
            $localStorage,
            DTOptionsBuilder,
            DTColumnDefBuilder,
            AuthService,
            $state,
            SigninModalService) {
        //active team management
        $rootScope.engagetoApp.setting.active = 'team';
        //initializing team management variables
        $scope.teamManagement = {
            activeTab: 0,
            listOfTeamMembers: [], 
            userRolesByDomain: {},
            dtOptions: DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10)
                    .withOption('bFilter', false)
                    .withOption('lengthChange', false)
                    .withBootstrap(),
            dtColumnDefs: [
                DTColumnDefBuilder.newColumnDef(4).notSortable()
            ],
            addTeamManagementModal: addTeamManagementModal,
            editTeamManagementModal: editTeamManagementModal,
            deleteTeamManagementModal: deleteTeamManagementModal,
            assignTeamManagementModal: assignTeamManagementModal,
            deleteNonassignTeamManagementModal: deleteNonassignTeamManagementModal,
            memberActivityTeamManagementModal: memberActivityTeamManagementModal
        };
        var roleList = [], domainList = [], teamMemberCount = 0;
        /*
         * @author: sandeep
         * @created: 02 dec 2016
         * @params: no
         * @return: no
         * @purpose: getting list of team members
         */
        TeamManagementService.getRolesList().then(function (response) {
            roleList = response.data.data['active_roles'];
            TeamManagementService.getDomainsList($localStorage.user_id).then(function (response) {
                domainList = [];
                angular.forEach(response.data.data, function (domain, key) {
                    if (domain.domain_status === 'active')
                        domainList.push(domain);
                });
                TeamManagementService.getTeamMember($localStorage.user_id).then(function (response) {
                    $scope.teamManagement.listOfTeamMembers = response.data.data;
                    angular.forEach($scope.teamManagement.listOfTeamMembers, function (domain, key) {
                        angular.forEach(domain, function (team, teamKey) {
                            angular.forEach(roleList, function (role, roleKey) {
                                if (team.role === role.name)
                                    team.roleId = role._role_id;
                            });
                            if (team.user_id !== $rootScope.engagetoApp.profile.id) {
                                teamMemberCount++;
                            } else {
                                $scope.teamManagement.userRolesByDomain[key] = team.role;
                            }
                        });
                    });
                    $rootScope.engagetoApp.isPageLoading = false;
                }, function (error) {
                    console.log(error);
                    if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                        AuthService.revokeAuth();
                        $rootScope.engagetoApp.isAuthenticatedUser = false;
                        $state.go('landing');
                    }
                });
            }, function (error) {
                console.log(error);
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
                    $state.go('landing');
                }
            });
        }, function (error) {
            console.log(error);
            if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                AuthService.revokeAuth();
                $rootScope.engagetoApp.isAuthenticatedUser = false;
                $state.go('landing');
            }
        });

        /*
         * @author: sandeep
         * @created: 29 nov 2016
         * @params: no
         * @return: no
         * @purpose: add team management modal popup
         */
        function addTeamManagementModal() {
            var isPlanSuits = false;
            if ($rootScope.engagetoApp.userPlan === 'Free') {
                teamMemberCount < 1 ? isPlanSuits = true : '';
            } else {
                angular.forEach($rootScope.engagetoApp.planList, function (plan, key) {
                    if (plan.plan_name === $rootScope.engagetoApp.userPlan && plan.max_users > teamMemberCount)
                        isPlanSuits = true;
                });
            }
            if (isPlanSuits) {
                var addTeamManagementModalInstance = $uibModal.open({
                    templateUrl: 'app/modules/team_management/views/modal/add.team.management.modal.html',
                    controller: 'AddTeamManagementController',
                    windowClass: 'add-team-management-modal',
                    resolve: {
                        addView: function () {
                            return true;
                        },
                        roleList: function () {
                            return roleList;
                        },
                        websiteList: function () {
                            return domainList;
                        }
                    }
                });
                addTeamManagementModalInstance.result.then(function (response) {
                    $state.reload();
                }, function (error) {
                    console.log(error);
                });
            }
            else
                SigninModalService.openPricingModal('Team');
        }
        /*
         * @author: sandeep
         * @created: 29 nov 2016
         * @params: domainKey(string), index(number)
         * @return: no
         * @purpose: add team management modal popup
         * @modified: 08 may 2017
         * @modified by: sandeep(kept team by using domainKey and team index)
         */
        function editTeamManagementModal(domainKey, index) {
            var editTeamManagementModalInstance = $uibModal.open({
                templateUrl: 'app/modules/team_management/views/modal/add.team.management.modal.html',
                controller: 'EditTeamManagementController',
                windowClass: 'add-team-management-modal',
                resolve: {
                    roleList: function () {
                        return roleList;
                    },
                    websiteList: function () {
                        return domainList;
                    },
                    teamMember: function () {
                        return {id: $scope.teamManagement.listOfTeamMembers[domainKey][index].user_id, domainId: $scope.teamManagement.listOfTeamMembers[domainKey][index].domain_id, email: $scope.teamManagement.listOfTeamMembers[domainKey][index].user_email};
                    }
                }
            });

            editTeamManagementModalInstance.result.then(function (response) {
                console.log(response);
                $state.reload();
            }, function (error) {
                console.log(error);
            });
        }
        /*
         * @author: sandeep
         * @created: 29 nov 2016
         * @params: domainKey(string), index(number)
         * @return: no
         * @purpose: deleteTeamManagementModal modal popup
         * @modified: 08 may 2017
         * @modified by: sandeep(kept team by using domainKey and team index)
         */
        function deleteTeamManagementModal(domainKey, index) {
            var deleteTeamManagementModalInstance = $uibModal.open({
                templateUrl: 'app/modules/team_management/views/modal/delete.team.management.modal.html',
                controller: 'DeleteTeamManagementController',
                windowClass: 'delete-team-management-modal',
                resolve: {
                    fullName: function () {
                        return $scope.teamManagement.listOfTeamMembers[domainKey][index].firstName + ' ' +
                                $scope.teamManagement.listOfTeamMembers[domainKey][index].lastName;
                    }
                }
            });

            deleteTeamManagementModalInstance.result.then(function (response) {
                if (response === 'deleteWithoutAssign') {
                    deleteNonassignTeamManagementModal($scope.teamManagement.listOfTeamMembers[domainKey][index]);
                }
                if (response === 'assignData') {
                    assignTeamManagementModal($scope.teamManagement.listOfTeamMembers[domainKey][index]);
                }
            }, function (error) {
                console.log(error);
            });
        }
        /*
         * @author: sandeep
         * @created: 29 nov 2016
         * @params: teamMember(object)
         * @return: no
         * @purpose: assignTeamManagementModal popup
         */
        function assignTeamManagementModal(teamMember) {
            var assignTeamManagementModalInstance = $uibModal.open({
                templateUrl: 'app/modules/team_management/views/modal/assign.team.management.modal.html',
                controller: 'AssignTeamManagementController',
                windowClass: 'assign-team-management-modal',
                resolve: {
                    teamMember: function () {
                        return teamMember;
                    }
                }
            });

            assignTeamManagementModalInstance.result.then(function (response) {
                console.log(response);
            }, function (error) {
                console.log(error);
            });
        }
        /*
         * @author: sandeep
         * @created: 29 nov 2016
         * @params: teamMember(object)
         * @return: no
         * @purpose: deleteNonassignTeamManagementModal modal popup
         */
        function deleteNonassignTeamManagementModal(teamMember) {
            var deleteNonassignTeamManagementModalInstance = $uibModal.open({
                templateUrl: 'app/modules/team_management/views/modal/delete.nonassign.management.modal.html',
                controller: 'DeleteNonassignManagementController',
                windowClass: 'delete-nonassign-management-modal',
                resolve: {
                    teamMember: function () {
                        return teamMember;
                    }
                }
            });

            deleteNonassignTeamManagementModalInstance.result.then(function (response) {
                $state.reload();
            }, function (error) {
                console.log(error);
            });
        }
        /*
         * @author: sandeep
         * @created: 29 nov 2016
         * @params: no
         * @return: no
         * @purpose: memberActivityTeamManagementModal modal popup
         */
        function memberActivityTeamManagementModal() {
            var memberActivityTeamManagementModalInstance = $uibModal.open({
                templateUrl: 'app/modules/team_management/views/modal/member.activity.management.modal.html',
                controller: 'MemberActivityManagementController',
                windowClass: 'member-activity-management-modal'
            });

            memberActivityTeamManagementModalInstance.result.then(function (response) {
                console.log(response);
            }, function (error) {
                console.log(error);
            });
        }
    }
})(window.angular);