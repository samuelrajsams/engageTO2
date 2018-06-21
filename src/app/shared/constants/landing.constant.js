(function(angular, ApplicationConfiguration){
    'use strict';
            
    angular
            .module(ApplicationConfiguration.applicationModuleName)
            .constant('Engageto_Default_Image', 'https://www.engageto.com/app/assets/images/logo-blue.svg')
            .constant('Frequently_Asked_Questiones', [
            {
                title: 'The Basics',
                group: [
                    {
                        isOpen: false,
                        question: 'What is web push technology?',
                        answer: 'Web push technology sends little pop-up notifications from your website to your subscribers’ computer or mobile device. Website or e-Commerce site owners use push notifications to interact with their users and to instantly deliver relevant content or offerings to their target audience. Messages can be customized and targeted to specific audiences. Each notification displays your website logo and customized text.'
                    },
                    {
                        isOpen: false,
                        question: 'What if my users aren’t on my website? How will they get my messages?',
                        answer: 'That’s the beauty of push message notifications – users will receive messages as long as they are online. The messages appear on their mobile devices or any supported browser, so it doesn’t matter if they have left your site.'
                    },
                    {
                        isOpen: false,
                        question: 'Do web push notifications appear on mobile screens?',
                        answer: 'Yes, as long as the user is using a compatible browser. EngageTo is supported by the most common mobile browsers, such as Android browser and Chrome.'
                    },
                    {
                        isOpen: false,
                        question: 'Don’t I already get messages on my phone? What’s the difference between web push notifications and the push notifications I already receive?',
                        answer: 'They’re quite similar and work in exactly the same way. Whereas mobile push notifications come from applications installed on your mobile device, web push notifications come from your website. The message will contain your website icon alongside the notification text, and users can click on it to be taken right to your website.'
                    },
                    {
                        isOpen: false,
                        question: 'Which browsers are compatible with EngageTo?',
                        answer: 'Currently EngageTo can be used with Apple Safari, Google Chrome, and Mozilla Firefox support push notifications. Microsoft Edge will soon be supported as well.'
                    },
                    {
                        isOpen: false,
                        question: 'This sounds pretty complex. Is it hard to set up?',
                        answer: 'Not at all! We’ve done all of the coding for you, so all you have to do is copy and paste one line into your website, and you’ll be ready to begin sending messages.'
                    },
                    {
                        isOpen: false,
                        question: 'Why would my users subscribe to receive web push notifications? ',
                        answer: 'You can use push notifications to offer all kinds of benefits and services that your users would be interested in. Have an e-Commerce site? You can offer a discount on their next purchase. Hosting an upcoming webinar? Send a registration reminder. Run a local spots blog? Keep users updated on playoff scores. There are infinite possibilities'
                    },
                    {
                        isOpen: false,
                        question: 'But not all users want the same information. Can I target messages to specific subscribers?',
                        answer: 'Yes! Our advance audience segmentation capabilities allow you to target subscribers based on their website behavior, their geographic location, internet service provider/speed, and even the type of device they’re using.'
                    },
                    {
                        isOpen: false,
                        question: 'I already have an email list. Why should I use web push notifications?',
                        answer: 'Push messages have a higher click-through rate than most conventional marketing tools, making them a valuable and efficient way to drive traffic to your website and build loyalty. Plus, they are more efficient — they require less content, are delivered instantly, and don’t require any designing or coding.'
                    },
                    {
                        isOpen: false,
                        question: 'Aren’t there other companies that offer this service? Why should I choose EngageTo? ',
                        answer: 'The difference is in the details. Only EngageTo offers the most advanced audience segmentation capabilities and cutting-edge technology at the best price. You can see a detailed list of features here: <a href="https://www.engageto.com/index.html#engageto" target="_blank">https://www.engageto.com/index.html#engageto_features</a>'
                    }
                ]
            },
            {
                title: 'The Details',
                group: [
                    {
                        isOpen: false,
                        question: 'Can I customize my messages?',
                        answer: 'Yes! You can write any text you want up to 80 characters (plus an additional 32 for the subject). EngageTo even enables the use of emojis to enhance your message.'
                    },
                    {
                        isOpen: false,
                        question: 'How long will it take for my messages to be sent?',
                        answer: 'Messages are received instantly, so you can reach your subscriber in real-time. You can also schedule messages in advance (see the next question).'
                    },
                    {
                        isOpen: false,
                        question: 'Can I schedule messages to be sent at a later time? ',
                        answer: 'You can schedule messages in advance, or set up messages to be automatically sent following certain website behavior, such as a user’s first visit or a purchase.'
                    },
                    {
                        isOpen: false,
                        question: 'Don’t I already get messages on my phone? What’s the difference between web push notifications and the push notifications I already receive?',
                        answer: 'They’re quite similar and work in exactly the same way. Whereas mobile push notifications come from applications installed on your mobile device, web push notifications come from your website. The message will contain your website icon alongside the notification text, and users can click on it to be taken right to your website.'
                    },
                    {
                        isOpen: false,
                        question: 'What if I send lots of notifications? Will that slow down delivery times?',
                        answer: 'We have more than 1,000 servers running at all times to serve you, so you can send over 1 million notifications at a time and rest assured they will be received by all of your subscribers within a few seconds.'
                    },
                    {
                        isOpen: false,
                        question: 'Can you explain how web push notifications work from the subscriber side?',
                        answer: 'When users visit your site, the browser will display a small window prompting them to register. They must do so in order to received web push notifications. Once they’ve subscribed, notifications you send will be displayed on the subscriber’s screen, even when they’re not on your website.'
                    },
                    {
                        isOpen: false,
                        question: 'Can you explain how web push notifications work from the website owner’s side?',
                        answer: 'It’s quick and simple to send a push notification directly from the EngageTo dashboard. There are prompts to guide you and you will be able to see a preview of your message before you send it.'
                    },
                    {
                        isOpen: false,
                        question: 'Can I track who is subscribing and opening my messages?',
                        answer: 'Definitely. You will be notified immediately when a user subscribes for push notifications. We will also send you reports on the click-through rates of each messaging campaign, as well as weekly and monthly activity summaries.'
                    }
                ]
            },
            {
                title: 'The Costs',
                group: [
                    {
                        isOpen: false,
                        question: 'Is EngageTo a free service?',
                        answer: 'EngageTo is pleased to offers its basic service at no charge. Premium and business accounts, which have the more advanced targeting and sending features, do entail a cost.'
                    },
                    {
                        isOpen: false,
                        question: 'What is your pricing model?',
                        answer: 'Our model has three account options, which range from $0-200+ monthly. You can find all of the pricing details at: <a href="https://www.engageto.com/#engageto_plans" target="_blank">https://www.engageto.com/#engageto_plans</a>.'
                    },
                    {
                        isOpen: false,
                        question: 'Is there a limit to the number of pushes I can send?',
                        answer: 'The premium and business plans come with unlimited push notifications. The basic plan includes 1,500,000 free push notifications per month.'
                    },
                    {
                        isOpen: false,
                        question: 'I have a basic account, which I see is capped at 50,000 subscribers. What happens when I reach my limit?',
                        answer: 'You will be notified once you hit 50,000 subscribers. You will then have the choice to keep the basic account or upgrade to a premium or business account. If you choose to retain the basic account, only your first 50,000 subscribers will receive your push notifications, but you will still be able to add subscribers.'
                    },
                    {
                        isOpen: false,
                        question: 'Which browsers are compatible with EngageTo?',
                        answer: 'Currently EngageTo can be used with Apple Safari, Google Chrome, and Mozilla Firefox support push notifications. Microsoft Edge will soon be supported as well.'
                    },
                    {
                        isOpen: false,
                        question: 'What if I no longer need a premium or business account? Can I switch back to a basic account?',
                        answer: 'We only want you to pay for the service you need and nothing more. You can change your plan any time directly from the EngageTo admin settings, and the change will take effect with the next payment cycle.'
                    }
                ]
            },
            {
                title: 'The Technical Stuff',
                group: [
                    {
                        isOpen: false,
                        question: 'Will EngageTo affect my website’s performance?',
                        answer: 'EngageTo runs on a simple script that won’t slow down the loading speed of your webpages.'
                    },
                    {
                        isOpen: false,
                        question: 'Do I need an https website for to run EngageTo?',
                        answer: 'No. EngageTo works on both http and https sites.'
                    },
                    {
                        isOpen: false,
                        question: 'My site uses multiple subdomains like foobar.domain.com. Can I still use EngageTo?',
                        answer: 'Yes, as long as the user is using a compatible browser. EngageTo is supported by the most common mobile browsers, such as Android browser and Chrome.'
                    },
                    {
                        isOpen: false,
                        question: 'Are there any sites that cannot be used with EngageTo.',
                        answer: 'Certain websites are prohibited from using EngageTo technology. Please refer to our terms and conditions for details: <a href="https://www.engageto.com/terms-and-conditions" target="_blank">https://www.engageto.com/terms-and-conditions</a>'
                    }
                ]
            }
            ]);
})(window.angular, window.ApplicationConfiguration);


