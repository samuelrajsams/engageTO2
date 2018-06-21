(function (angular, ApplicationConfiguration) {
    'use strict';

    angular
            .module(ApplicationConfiguration.applicationModuleName)
            .constant('PrivacyPolicyConstant', [
                {
                    isOpen: false,
                    topic: 'What is web push technology?',
                    content: 'Web push technology sends little pop-up notifications from your website to your subscribers’ computer or mobile device. Website or e-Commerce site owners use push notifications to interact with their users and to instantly deliver relevant content or offerings to their target audience. Messages can be customized and targeted to specific audiences. Each notification displays your website logo and customized text.'
                },
                {
                    isOpen: false,
                    topic: 'What if my users aren’t on my website? How will they get my messages?',
                    content: 'That’s the beauty of push message notifications – users will receive messages as long as they are online. The messages appear on their mobile devices or any supported browser, so it doesn’t matter if they have left your site.'
                },
                {
                    isOpen: false,
                    topic: 'Do web push notifications appear on mobile screens?',
                    content: 'Yes, as long as the user is using a compatible browser. EngageTo is supported by the most common mobile browsers, such as Android browser and Chrome.'
                },
                {
                    isOpen: false,
                    topic: 'Don’t I already get messages on my phone? What’s the difference between web push notifications and the push notifications I already receive?',
                    content: 'They’re quite similar and work in exactly the same way. Whereas mobile push notifications come from applications installed on your mobile device, web push notifications come from your website. The message will contain your website icon alongside the notification text, and users can click on it to be taken right to your website.'
                }
            ]);
})(window.angular, window.ApplicationConfiguration);