(function (angular) {

    'use strict';

    angular
            .module('teamManagement')
            .factory('TeamManagementService', teamManagementService);

    teamManagementService.$inject = [
        '$http',
        '$q',
        'WEB_ENGAGETO_API_URL',
        '$localStorage',
        '$rootScope'
    ];

    function teamManagementService(
            $http,
            $q,
            WEB_ENGAGETO_API_URL,
            $localStorage,
            $rootScope) {
        return {
            getTeamMember: getTeamMember,
            getTeamMemberById: getTeamMemberById,
            addTeamMember: addTeamMember,
            updateTeamMember: updateTeamMember,
            deleteTeamMember: deleteTeamMember,
            getRolesList: getRolesList,
            getDomainsList: getDomainsList
        };

        /*
         * @author: sandeep
         * @created: 02 dec 2016
         * @params: no
         * @return: success, error functions
         * @purpose: get team member
         */
        function getTeamMember(userId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + userId + '/teams';
            var request = $http({
                method: "GET",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                }
            });
            return(request
                    .then(getTeamMemberSuccess)
                    .catch(getTeamMemberError));

            //getTeamMember error function
            function getTeamMemberError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getTeamMember success function
            function getTeamMemberSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 02 dec 2016
         * @params: teamId(number), domainId(number)
         * @return: success, error functions
         * @purpose: get team member by id
         * @modified: 08 may 2017
         * @modified by: sandeep(kept team by using domainKey and team index)
         */
        function getTeamMemberById(teamId, domainId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+$localStorage.user_id+'/domains/'+domainId+'/teams/'+teamId;
            var request = $http({
                method: "GET",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                }
            });
            return(request
                    .then(getTeamMemberSuccess)
                    .catch(getTeamMemberError));

            //getTeamMember error function
            function getTeamMemberError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getTeamMember success function
            function getTeamMemberSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 01 dec 2016
         * @params: data(object), userId(number)
         * @return: success, error functions
         * @purpose: Add Team member
         */
        function addTeamMember(data) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/teams';
            var request = $http({
                method: "POST",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: data
            });
            return(request
                    .then(addTeamMemberSuccess)
                    .catch(addTeamMemberError));

            //addTeamMember error function
            function addTeamMemberError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //addTeamMember success function
            function addTeamMemberSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 01-12-2016
         * @params: 
         * @return: success, error functions
         * @purpose: Update Team member
         */
        function updateTeamMember(data, teamMemberId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/'+$localStorage.user_id+'/teams/'+teamMemberId;
            var request = $http({
                method: "PUT",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                },
                data: data
            });
            return(request
                    .then(updateTeamMemberSuccess)
                    .catch(updateTeamMemberError));

            //updateTeamMember error function
            function updateTeamMemberError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }
            //deleteTeamMember success function
            function updateTeamMemberSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 23 dec 2016
         * @params: teamMember(object)
         * @return: success, error functions
         * @purpose: delete team member
         */
        function deleteTeamMember(teamMember) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + $localStorage.user_id + '/teams/' + teamMember.user_id;
            var request = $http({
                method: "DELETE",
                url: apiUrl,
                data: {relation_id: teamMember.relation_id},
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    'Authorization': 'Bearer ' + $localStorage.token
                }
            });
            return(request
                    .then(deleteTeamMemberSuccess)
                    .catch(deleteTeamMemberError));

            //deleteTeamMember error function
            function deleteTeamMemberError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //deleteTeamMember success function
            function deleteTeamMemberSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 02 dec 2016
         * @params: no
         * @return: success, error functions
         * @purpose: getRolesList
         */
        function getRolesList() {
            var apiUrl = WEB_ENGAGETO_API_URL + 'roles';
            var request = $http({
                method: "GET",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                }
            });
            return(request
                    .then(getRolesListSuccess)
                    .catch(getRolesListError));

            //getRolesList error function
            function getRolesListError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getRolesList success function
            function getRolesListSuccess(response) {
                return(response);
            }
        }
        /*
         * @author: sandeep
         * @created: 02 dec 2016
         * @params: userId(number)
         * @return: success, error functions
         * @purpose: getDomainsList
         */
        function getDomainsList(userId) {
            var apiUrl = WEB_ENGAGETO_API_URL + 'users/' + userId + '/domains';
            var request = $http({
                method: "GET",
                url: apiUrl,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.token
                }
            });
            return(request
                    .then(getDomainsListSuccess)
                    .catch(getDomainsListError));

            //getDomainsList error function
            function getDomainsListError(response) {
                if (!angular.isObject(response.data) || !response.data.message) {
                    return($q.reject(response.data));
                }
                // Otherwise, use expected error message.
                return($q.reject(response.data.message));
            }

            //getDomainsList success function
            function getDomainsListSuccess(response) {
                if (response.data.data.length > 0) {
                    angular.forEach(response.data.data, function (domain, key) {
                        if (domain.domain_name === '') {
                            var subDomainName = extractRootDomain(domain.domain_address);
                            if (subDomainName.indexOf('.') !== -1)
                                domain.domain_name = subDomainName.split('.')[0];
                        }
                    });
                }
                return(response);
            }
        }
        //focus event on fields
        function extractHostname(url) {
            var hostname;
            //find & remove protocol (http, ftp, etc.) and get the hostname
            if (url.indexOf("://") > -1) {
                hostname = url.split('/')[2];
            }
            else {
                hostname = url.split('/')[0];
            }
            //find & remove port number
            hostname = hostname.split(':')[0];

            return hostname;
        }
        // to address those who want the "root domain"
        function extractRootDomain(url) {
            var domain = extractHostname(url),
                    splitArr = domain.split('www.'),
                    arrLen = splitArr.length;
            //extracting the root domain here
            if (arrLen > 1) {
                domain = splitArr[arrLen - 1];
            }
            return domain;
        }
    }
})(window.angular);
