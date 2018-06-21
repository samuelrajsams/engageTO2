(function (angular) {

    'use strict';

    angular
            .module('teamManagement')
            .controller('MemberActivityManagementController', memberActivityTeamManagementController);

    memberActivityTeamManagementController.$inject = [
        '$scope',
        '$rootScope',
        '$uibModalInstance',
        'team_management'
    ];

    function memberActivityTeamManagementController(
            $scope,
            $rootScope,
            $uibModalInstance,
            team_management) {
        console.log('memberActivityTeamManagementController');
        $scope.memberActivityTeamManagement = {
            memberActivity: team_management.member_activity_management,
            teamMembersList: team_management.team_members_list,
            cancel: cancel,
            openFromDate: openFromDate,
            openToDate: openToDate
        };
        /*
         * @author: sandeep
         * @created: 29 nov 2016
         * @params: no
         * @return: no
         * @purpose: cancelled to exit manager activity management
         */
        function cancel() {
            $uibModalInstance.close('cancel');
        }
        /*
         * @author: sandeep
         * @created: 02 dec 2016
         * @params: no
         * @return: no
         * @purpose: select from date 
         */
        function openFromDate() {
            var logic = function (dateText, $input) {
                $scope.memberActivityTeamManagement.memberActivity.fromDate = dateText;
                console.log("fromdate", dateText, $input.val(), $scope.memberActivityTeamManagement.memberActivity.fromDate);
            };
            $('#fromdatetimepicker').datetimepicker({
                onChangeDateTime: logic,
                format: 'Y/m/d',
                onShow: function (ct) {
                    this.setOptions({
                        maxDate: $('#todatetimepicker').val() ? $('#todatetimepicker').val() : false
                    });
                },
                timepicker: false
            });
            $('#fromdatetimepicker').datetimepicker('show');
        }
        /*
         * @author: sandeep
         * @created: 02 dec 2016
         * @params: no
         * @return: no
         * @purpose: select to date 
         */
        function openToDate() {
            var logic = function (dateText, $input) {
                $scope.memberActivityTeamManagement.memberActivity.toDate = dateText;
                console.log("todate", dateText, $input.val(), $scope.memberActivityTeamManagement.memberActivity.toDate);
            };
            $('#todatetimepicker').datetimepicker({
                onChangeDateTime: logic,
                format: 'Y/m/d',
                onShow: function (ct) {
                    this.setOptions({
                        minDate: $('#fromdatetimepicker').val() ? $('#fromdatetimepicker').val() : false
                    })
                },
                timepicker: false
            });
            $('#todatetimepicker').datetimepicker('show');
        }
    }
})(window.angular);