(function (angular, ApplicationConfiguration) {

    'use strict';
// Initializing functions and variables for first time on app load
    angular
            .module(ApplicationConfiguration.applicationModuleName)
            .run(applicationRun);
    applicationRun.$inject = [
        '$rootScope',
        '$state',
        'SigninModalService',
        '$localStorage',
        '$location',
        '$document',
        'toastr',
        'OnboardingService',
        'WebsiteService',
        'AuthService',
        '$stateParams',
        'EngagetoAppService',
        'TeamManagementService',
        '$timeout',
        'Engageto_Default_Image'
    ];
    function applicationRun(
            $rootScope,
            $state,
            SigninModalService,
            $localStorage,
            $location,
            $document,
            toastr,
            OnboardingService,
            WebsiteService,
            AuthService,
            $stateParams,
            EngagetoAppService,
            TeamManagementService,
            $timeout,
            Engageto_Default_Image) {
//        window.emojioneVersion = "2.1.1";
        $rootScope.$storage = $localStorage;
        $rootScope.engagetoApp = {
            isHeaderRequired: false,
            isFooterRequired: false,
            isHeaderClassAdded: false,
            $state: '',
            toState: '',
            baseUrl: $location.host() === 'localhost' ? $location.protocol() + '://' + $location.host() + ':' + $location.port() :
                    $location.protocol() + '://' + $location.host(),
            isActivated: false,
            isAuthenticatedUser: true,
            isGoToLandingClicked: false,
            domainList: $localStorage['domainList'] ? $localStorage.domainList : [],
            allDomainList: $localStorage['allDomainList'] ? $localStorage.allDomainList : [],
            selectedDomainName: $localStorage['domain_referer'] ? $localStorage.domain_referer : 'Domain List',
            setting: {
                active: 'account'
            },
            selectPickerDiv: '',
            userPlan: $localStorage['userPlan'] ? $localStorage.userPlan : 'Free',
            planList: [],
            profile: {
                id: $localStorage['user_id'] ? $localStorage.user_id : '',
                initial: $localStorage['initial'] ? $localStorage.initial : '',
                firstName: $localStorage['firstName'] ? $localStorage.firstName : '',
                lastName: $localStorage['lastName'] ? $localStorage.lastName : '',
                email: $localStorage['user_email'] ? $localStorage.user_email : '',
                role: $localStorage['user_role'] ? $localStorage.user_role : '',
                image: $localStorage['profile_image'] ? $localStorage.profile_image : '',
                domainName: $localStorage['domain_address'] ? $localStorage.domain_address : '',
                subDomainName: $localStorage['subDomainName'] ? $localStorage.subDomainName : ''
            },
            notification: {
                image: Engageto_Default_Image
            },
            goToState: goToState,
            goToTab: goToTab,
            ifMobileDevice: ifMobileDevice,
            toggleNavBar: toggleNavBar,
            isLoading: false,
            isPageLoading: true,
            toggleSign: toggleSign,
            toggleSidebar: toggleSidebar,
            selectDomain: selectDomain,
            changePasswordModal: changePasswordModal,
            openSupportModal: openSupportModal,
            addTeamMember: addTeamMember
        };
        function toggleSidebar() {
            $rootScope.sidebarToggle = !$rootScope.sidebarToggle;
        }
        function toggleSign() {
            $rootScope.showToggle = !$rootScope.showToggle;
        }
        $rootScope.$on("$stateChangeError", console.log.bind(console));
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            console.log('Local Storage: ', $localStorage);
            $rootScope.engagetoApp.$state = $state;
            $rootScope.engagetoApp.toState = toState.name;
            $rootScope.engagetoApp.isPageLoading = true;
            var someElement = angular.element(document.getElementById('fb-root'));
            $document.scrollToElementAnimated(someElement);
            //removing class on state basis
//            if ($rootScope.engagetoApp.toState !== 'pricing') {
//                angular.element('.engageto-nav').removeClass('engageto-blue-nav');
//                angular.element('.engageto-nav').addClass('engageto-nav-scroll');
//            }
            //for both hide header and footer
            if ($rootScope.engagetoApp.toState === 'signin' ||
                    $rootScope.engagetoApp.toState === 'set-password' ||
                    $rootScope.engagetoApp.toState === 'register' ||
                    $rootScope.engagetoApp.toState === 'reset-password' ||
                    $rootScope.engagetoApp.toState === 'page-not-found' ||
                    $rootScope.engagetoApp.toState === 'forgotPasswordRequest' ||
                    $rootScope.engagetoApp.toState === 'newActivationRequest') {
                delete $localStorage.token;
                delete $localStorage.domain_referer;
                delete $localStorage.domain_address;
                delete $localStorage.user;
                delete $localStorage.firstName;
                delete $localStorage.lastName;
                delete $localStorage.initial;
                delete $localStorage.profile_image;
                delete $localStorage.fcm;
                delete $localStorage.steps;
                delete $localStorage.user_email;
                delete $localStorage.user_role;
                delete $localStorage.user_id;
                delete $localStorage.userPlan;
                delete $localStorage.progressPercentage;
                delete $localStorage.domainList;
                delete $localStorage.allDomainList;
                delete $localStorage.subDomainName;
                angular.element('body').removeClass('body-margin');
                $rootScope.engagetoApp.isHeaderRequired = false;
                $rootScope.engagetoApp.isFooterRequired = false;
                delete $localStorage.token;
                $rootScope.$storage = {
                    token: false
                };
            } else
            //for both header and footer
            if ($rootScope.engagetoApp.toState === 'landing' ||
                    $rootScope.engagetoApp.toState === 'faq' ||
                    $rootScope.engagetoApp.toState === 'features' ||
                    $rootScope.engagetoApp.toState === 'affiliates' ||
                    $rootScope.engagetoApp.toState === 'how-it-works' ||
                    $rootScope.engagetoApp.toState === 'privacyPolicy' ||
                    $rootScope.engagetoApp.toState === 'engagetoCoupon' ||
                    $rootScope.engagetoApp.toState === 'notification-generator' ||
                    $rootScope.engagetoApp.toState === 'chromePushNotification' ||
                    $rootScope.engagetoApp.toState === 'joomlaPushNotification' ||
                    $rootScope.engagetoApp.toState === 'androidPushNotification' ||
                    $rootScope.engagetoApp.toState === 'firefoxPushNotification' ||
                    $rootScope.engagetoApp.toState === 'wordpressPushNotification' ||
                    $rootScope.engagetoApp.toState === 'blog' ||
                    $rootScope.engagetoApp.toState === 'partners' ||
                    $rootScope.engagetoApp.toState === 'termAndCondition') {
                $rootScope.engagetoApp.isHeaderRequired = true;
                $rootScope.engagetoApp.isFooterRequired = true;
                angular.element('.engageto-nav').removeClass('engageto-nav-scroll');
                angular.element('.logo-blue').addClass('hidden');
                angular.element('.logo-white').removeClass('hidden');
                angular.element('body').addClass('body-margin');
            } else
            //for only header
            if ($rootScope.engagetoApp.toState === 'pricing') {
//                angular.element('.engageto-nav').removeClass('engageto-nav-scroll');
//                angular.element('.engageto-nav').addClass('engageto-blue-nav');
                $rootScope.engagetoApp.isHeaderRequired = true;
                $rootScope.engagetoApp.isFooterRequired = false;
                angular.element('.engageto-nav').removeClass('engageto-nav-scroll');
                angular.element('.logo-blue').addClass('hidden');
                angular.element('.logo-white').removeClass('hidden');
                angular.element('body').removeClass('body-margin');
            } else {
                //checking pages are private
                console.log('Authentication Required: ', toState.authenticate);
                if (toState.authenticate) {
                    //checking is user is autheticated
                    if ($localStorage.token) {
                        $rootScope.$storage = {
                            token: $localStorage.token
                        };
                        angular.element('body').removeClass('body-margin');
                        if ($rootScope.engagetoApp.toState === 'getting-started') {
                            $rootScope.engagetoApp.isHeaderRequired = true;
                            $rootScope.engagetoApp.isFooterRequired = false;
                            angular.element('.engageto-nav').addClass('engageto-nav-scroll');
                            angular.element('.logo-white').addClass('hidden');
                            angular.element('.logo-blue').removeClass('hidden');
                        } else {
                            //showing both header and footer
                            $rootScope.engagetoApp.isHeaderRequired = false;
                            $rootScope.engagetoApp.isFooterRequired = false;
                            angular.element('.engageto-nav').removeClass('engageto-nav-scroll');
                            angular.element('.logo-blue').addClass('hidden');
                            angular.element('.logo-white').removeClass('hidden');
                        }
                    } else {
                        delete $localStorage.user_geo_details;
                        delete $localStorage.user_id;
                        delete $localStorage.firstName;
                        delete $localStorage.lastName;
                        delete $localStorage.initial;
                        delete $localStorage.profile_image;
                        delete $localStorage.userPlan;
                        delete $localStorage.user_email;
                        delete $localStorage.user_role;
                        //navigating to home page
                        $rootScope.engagetoApp.isAuthenticatedUser = false;
                        $location.url('/');
                    }
                } else {
                    //page is public to all
                }
            }
        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            //for hiding ngNotify messages on state change
            toastr.clear();
            //showing response message after payment for onboarding, domain and team
            if ($stateParams['state'] && $stateParams['id']) {
                if ($stateParams.state === 'succeeded') {
                    AuthService.setPaymentSuccess($stateParams.id).then(function (response) {
                        console.log(response);
                        EngagetoAppService.showSuccessMessage('Payment is done successfully');
                    }, function (error) {
                        console.log(error);
                    });
                } else if ($stateParams.state === 'failed') {
                    EngagetoAppService.showErrorMessage('Payment is failed');
                } else if ($stateParams.state === 'cancelled') {
                    EngagetoAppService.showErrorMessage('Payment is Cancelled');
                }
            }
            if ($rootScope.engagetoApp.toState === 'page-not-found') {
                $rootScope.engagetoApp.isPageLoading = false;
            }
        });
        /*
         * @purpose: signout
         * @author: sandeep
         * @created: 24 oct 2016
         */
        $rootScope.signOut = function () {
            delete $localStorage.token;
            delete $localStorage.domain_referer;
            delete $localStorage.domain_address;
            delete $localStorage.user;
            delete $localStorage.firstName;
            delete $localStorage.lastName;
            delete $localStorage.initial;
            delete $localStorage.profile_image;
            delete $localStorage.fcm;
            delete $localStorage.steps;
            delete $localStorage.user_email;
            delete $localStorage.user_role;
            delete $localStorage.user_id;
            delete $localStorage.userPlan;
            delete $localStorage.progressPercentage;
            delete $localStorage.domainList;
            delete $localStorage.allDomainList;
            delete $localStorage.subDomainName;
            $rootScope.$storage.token = undefined;
            $rootScope.engagetoApp.isActivated = false;
            $state.go('landing');
        };
        /*
         * @author: sandeep
         * @params: no
         * @return: no
         * @created: 03 may 2017
         * @purpose: open changePasswordModal
         */
        function changePasswordModal() {
            SigninModalService.changePasswordModal();
        }
        /*
         * @author: sandeep
         * @params: no
         * @return: no
         * @created: 10 jul 2017
         * @purpose: openSupportModal
         */
        function openSupportModal() {
            SigninModalService.openSupportModal();
        }
        /*
         * @author: sandeep
         * @created: 27 oct 2016
         * @params: selectionType(string)
         * @returns: no
         * @modified: 02 jan 2017
         * @modified by: sandeep(changed domainSelect variable name)
         * @purpose: select drodown option
         */
        function selectDomain(selectionType) {
            if (selectionType == 'add_domain') {
                $rootScope.showToggle = false;
                if ($rootScope.engagetoApp.userPlan === 'Free') {
                    SigninModalService.openPricingModal('Domain');
                } else {
                    var isPlanSuits = false;
                    angular.forEach($rootScope.engagetoApp.planList, function (plan, key) {
                        console.log(plan.plan_name, $rootScope.engagetoApp.userPlan, plan.max_domains, $rootScope.engagetoApp.domainList.length);
                        if (plan.plan_name === $rootScope.engagetoApp.userPlan && plan.max_domains > $rootScope.engagetoApp.domainList.length)
                            isPlanSuits = true;
                    });
                    if (isPlanSuits)
                        SigninModalService.addDomainModal();
                    else
                        SigninModalService.openPricingModal('Domain');
                }
                $rootScope.engagetoApp.selectedDomainName = $localStorage.domain_referer;
            } else {
                $localStorage.domain_referer = $rootScope.engagetoApp.selectedDomainName;
                angular.forEach($rootScope.engagetoApp.domainList, function (domain, key) {
                    if (domain.domain_referer === $rootScope.engagetoApp.selectedDomainName) {
                        $localStorage.domain_address = domain.domain_address;
                        $rootScope.engagetoApp.profile.domainName = domain.domain_address;
                        $localStorage.subDomainName = domain.app_domain;
                        $rootScope.engagetoApp.profile.subDomainName = domain.app_domain;
                        $rootScope.engagetoApp.profile.role = domain.role;
                        $localStorage.user_role = domain.role;
                    }
                });
                if ($rootScope.engagetoApp.profile.role === 'Analyst' && ($rootScope.engagetoApp.toState !== 'side-nav-template.new-push-notification' &&
                        $rootScope.engagetoApp.toState !== 'side-nav-template.all-notifications')) {
                    $state.go('side-nav-template.new-push-notification');
                } else if ($rootScope.engagetoApp.profile.role === 'Manager' && ($rootScope.engagetoApp.toState === 'side-nav-template.domain-management' ||
                        $rootScope.engagetoApp.toState === 'side-nav-template.team-management' || $rootScope.engagetoApp.toState === 'side-nav-template.code-installation' ||
                        $rootScope.engagetoApp.toState === 'side-nav-template.optins' || $rootScope.engagetoApp.toState === 'side-nav-template.sub-optins' || $rootScope.engagetoApp.toState === 'side-nav-template.child-window' ||
                        $rootScope.engagetoApp.toState === 'side-nav-template.new-welcome-notification' || $rootScope.engagetoApp.toState === 'side-nav-template.fcm-credentials')) {
                    $state.go('side-nav-template.new-push-notification');
                } else
                    $state.reload();
                $timeout(function () {
                    EngagetoAppService.showSuccessMessage('Your domain now has been changed to ' + $rootScope.engagetoApp.profile.domainName);
                }, 1000);
            }
        }
        /*
         * @author: sandeep
         * @created: 06 may 2017
         * @params: no
         * @returns: no
         * @purpose: addTeamMember function
         */
        function addTeamMember() {
            var teamMemberCount = 0;
            TeamManagementService.getTeamMember($localStorage.user_id).then(function (response) {
                angular.forEach(response.data.data, function (domain, key) {
                    angular.forEach(domain, function (team, key) {
                        if (team.user_id !== $rootScope.engagetoApp.profile.id) {
                            teamMemberCount++;
                        }
                    });
                });
                var isPlanSuits = false;
                if ($rootScope.engagetoApp.userPlan === 'Free') {
                    teamMemberCount < 1 ? isPlanSuits = true : '';
                } else {
                    angular.forEach($rootScope.engagetoApp.planList, function (plan, key) {
                        if (plan.plan_name === $rootScope.engagetoApp.userPlan && plan.max_users > teamMemberCount)
                            isPlanSuits = true;
                    });
                }
                $rootScope.showToggle = false;
                if (isPlanSuits) {
                    SigninModalService.addTeamModal();
                }
                else
                    SigninModalService.openPricingModal('Team');
            }, function (error) {
                console.log(error);
                if (error.code === 10301 || error.code === 10200 || error.code === 10201 || error.code === 10202 || error.code === 10203 || error.code === 10204 || error.code === 10205 || error.code === 10206 || error.code === 10207 || error.code === 10208) {
                    AuthService.revokeAuth();
                    $rootScope.engagetoApp.isAuthenticatedUser = false;
                    $state.go('landing');
                }
            });
        }
        /*
         * @author: sandeep
         * @created: 30 jan 2017
         * @params: stateName(string)
         * @return: no
         * @purpose: go to state function
         */
        function goToState(stateName) {
            if (stateName === 'side-nav-template.account-settings') {
                $rootScope.showToggle = false;
            } else if (stateName = 'start-free-trial') {
                $localStorage.token ? stateName = 'notification-generator' : stateName = 'register';
            }
            $state.go(stateName);
        }

        /*
         * @author: sandeep
         * @created: 30 jan 2017
         * @params: tabRef(string)
         * @return: no
         * @purpose: go to tab function
         */
        function goToTab(idRef) {
            if ($state.current.name !== 'landing') {
                $rootScope.engagetoApp.isGoToLandingClicked = true;
                $state.go('landing');
            } else {
                var someElement = angular.element(document.getElementById(idRef));
                $document.scrollToElementAnimated(someElement);
            }
        }

        function toggleNavBar() {
            if (angular.element('.navbar-collapse').hasClass('collapse')) {
                angular.element('.navbar-collapse').removeClass('collapse');
            } else {
                angular.element('.navbar-collapse').addClass('collapse');
            }
        }
        //on window scroll making header transparent
        $(window).scroll(function () {
            if ($rootScope.engagetoApp.toState === 'landing') {
                if (window.pageYOffset >= 605) {
                    angular.element('.engageto-nav').addClass('engageto-nav-scroll');
                    angular.element('.logo-white').addClass('hidden');
                    angular.element('.logo-blue').removeClass('hidden');
                    $rootScope.engagetoApp.isHeaderClassAdded = !$rootScope.engagetoApp.isHeaderClassAdded;
                }
                if (window.pageYOffset < 605) {
                    $rootScope.engagetoApp.isHeaderClassAdded = !$rootScope.engagetoApp.isHeaderClassAdded;
                    angular.element('.engageto-nav').removeClass('engageto-nav-scroll');
                    angular.element('.logo-white').removeClass('hidden');
                    angular.element('.logo-blue').addClass('hidden');
                }
            } else if ($rootScope.engagetoApp.toState === 'faq' ||
                    $rootScope.engagetoApp.toState === 'features' ||
                    $rootScope.engagetoApp.toState === 'affiliates' ||
                    $rootScope.engagetoApp.toState === 'privacyPolicy' ||
                    $rootScope.engagetoApp.toState === 'engagetoCoupon' ||
                    $rootScope.engagetoApp.toState === 'notification-generator' ||
                    $rootScope.engagetoApp.toState === 'chromePushNotification' ||
                    $rootScope.engagetoApp.toState === 'safariPushNotification' ||
                    $rootScope.engagetoApp.toState === 'androidPushNotification' ||
                    $rootScope.engagetoApp.toState === 'operaPushNotification' ||
                    $rootScope.engagetoApp.toState === 'wordpressPushNotification' ||
                    $rootScope.engagetoApp.toState === 'blog' ||
                    $rootScope.engagetoApp.toState === 'pricing' ||
                    $rootScope.engagetoApp.toState === 'partners' ||
                    $rootScope.engagetoApp.toState === 'termAndCondition') {
                if (window.pageYOffset >= 145) {
                    angular.element('.engageto-nav').addClass('engageto-nav-scroll');
                    $rootScope.engagetoApp.isHeaderClassAdded = !$rootScope.engagetoApp.isHeaderClassAdded;
                    angular.element('.logo-white').addClass('hidden');
                    angular.element('.logo-blue').removeClass('hidden');
                }
                if (window.pageYOffset < 145) {
                    $rootScope.engagetoApp.isHeaderClassAdded = !$rootScope.engagetoApp.isHeaderClassAdded;
                    angular.element('.engageto-nav').removeClass('engageto-nav-scroll');
                    angular.element('.logo-white').removeClass('hidden');
                    angular.element('.logo-blue').addClass('hidden');
                }
            }
        });
        /*
         * @author: sandeep
         * @created: 30 jan 2017
         * @params: stateName(string)
         * @return: no
         * @purpose: checking ifMobileDevice
         */
        function ifMobileDevice() {
            var check = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                    check = true;
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        }

        /*
         * @author: sandeep
         * @created: 17 apr 2017   
         * @params: no
         * @returns: no
         * @purpose: get list of plans
         */
        OnboardingService.getAllPlans().then(function (response) {
            console.log('Plans:', response);
            $rootScope.engagetoApp.planList = response.data.data.active_plans;
        }, function (error) {
            console.log(error);
        });
        /*
         * facebook setup
         */
//        window.fbAsyncInit = function () {
//            FB.init({
//                appId: '447204905628967',
//                xfbml: true,
//                version: 'v2.8'
//            });
//            FB.AppEvents.logPageView();
//        };
//        (function (d, s, id) {
//            var js, fjs = d.getElementsByTagName(s)[0];
//            if (d.getElementById(id)) {
//                return;
//            }
//            js = d.createElement(s);
//            js.id = id;
//            js.src = "//connect.facebook.net/en_US/sdk.js";
//            fjs.parentNode.insertBefore(js, fjs);
//        }(document, 'script', 'facebook-jssdk'));
        /*
         * aaplying fb login button style
         */
//        (function (d, s, id) {
//            var js, fjs = d.getElementsByTagName(s)[0];
//            if (d.getElementById(id))
//                return;
//            js = d.createElement(s);
//            js.id = id;
//            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=447204905628967";
//            fjs.parentNode.insertBefore(js, fjs);
//        }(document, 'script', 'facebook-jssdk'));
    }
})(window.angular, window.ApplicationConfiguration);
