var config = {
    apiKey: "AIzaSyDEDllAqn57DwHHvI1UpmUUCQZzolgSNX0",
    messagingSenderId: "1009041982851"
};

firebase.initializeApp(config);
var messaging = firebase.messaging();
var subdomainid = 'intent_push_node_domain';
var sw = 'http://localhost:3000/app/convert_visitor_push_notification/service-worker.js';

var subscriberDetails = {
    domainid: subdomainid,
    token: '',
    browser: '',
    OS: '',
    subscribedURL: '',
    subscribedDate: ''
};

var notificationdatadetails = {
    "title": "",
    "message": "",
    "url": "",
    "subscribed_url": "",
    "image": "",
    "cta": "",
    "token": ""
};

function intentNotificationGenerator(notificationdata) {
    notificationdatadetails.title = notificationdata.title;
    notificationdatadetails.message = notificationdata.message;
    notificationdatadetails.url = notificationdata.url;
    notificationdatadetails.subscribed_url = window.location.href;
    notificationdatadetails.image = notificationdata.image;
    notificationdatadetails.cta = notificationdata.cta;
    if (Notification.permission === 'granted') {
        messaging.getToken()
            .then(function (currentToken) {
                console.log("tokoen is", currentToken);
                notificationdatadetails.token = currentToken;
                fetch("https://www.engageto.com:8081/v1/notifications/generator", {
                    method: 'post',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(notificationdatadetails)
                }).then(function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    } else {
                        console.log('User subscribed successfully', response);
                    }
                }).catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });
            });
    } else if (Notification.permission === 'denied') {
        //console.log("u denied the permission");
        alert("you have denied the permission");
    } else if (Notification.permission === 'default') {
        //console.log("you are in stable present");
        Notification.requestPermission(function (permission) {
            if (permission === 'granted') {
                //console.log("permission granted");
                messaging.getToken()
                    .then(function (currentToken) {
                        //console.log("token", currentToken);
                        notificationdatadetails.token = currentToken;
                        fetch("https://www.engageto.com:8081/v1/notifications/generator", {
                            method: 'post',
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify(notificationdatadetails)
                        }).then(function (response) {
                            if (response.status !== 200) {
                                console.log('Looks like there was a problem. Status Code: ' + response.status);
                                return;
                            } else {
                                console.log('User subscribed successfully', response);
                            }
                        }).catch(function (err) {
                            console.log('Fetch Error :-S', err);
                        });
                    });
            } else if (permission === 'denied') {
                //console.log("still u have blocked the permission");
                alert("you have denied the permission");
            }
        });
    } else {
    }
    return;
}

var subscriberPromise = '';
function getBrowser() {
    var majorVersion = parseInt(navigator.appVersion, 10);
    console.log(navigator.appVersion, 'hii', majorVersion);
    if (!!window.chrome && !!window.chrome.webstore) {
        return 'Chrome';
    } else if (typeof InstallTrigger !== 'undefined') {
        return 'Firefox';
    } else if (!isIE && !!window.StyleMedia) {
        return 'Edge';
    } else if (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
        return 'Opera';
    } else if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) {
        return 'Safari';
    } else {
        return 'Others';
    }
}

function getSubscriberDetails() {
    subscriberPromise = new Promise(function (resolve, reject) {
        subscriberDetails.browser = getBrowser();
        subscriberDetails.subscribedURL = window.location.href;
        subscriberDetails.subscribedDate = new Date();
        subscriberDetails.OS = navigator.platform;
        resolve(subscriberDetails);
    });

}
if ('serviceWorker' in navigator) {
    // Register service worker
    navigator.serviceWorker.register(sw).then(function (reg) {
        console.log('serviceworker registration is sucessfull', reg);
        messaging.useServiceWorker(reg);
        var notificationPermission = false;
        if (Notification.permission === 'granted') {
            notificationPermission = true;
        }
        messaging.requestPermission()
            .then(function () {
                console.log('Notification permission granted.');
                return messaging.getToken()
                    .then(function (currentToken) {
                        if (currentToken && !notificationPermission) {
                            console.log('in if', currentToken);
                            subscriberDetails.token = currentToken;
                            getSubscriberDetails();
                            subscriberPromise.then(function (res) {
                                console.log('heree in location ', res);
                                fetch("https://www.engageto.com:8081/v1/node/domains/subscribers", {
                                    method: 'post',
                                    headers: {
                                        "Content-type": "application/json"
                                    },
                                    body: JSON.stringify(res)
                                }).then(function (response) {
                                    if (response.status !== 200) {
                                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                                        return;
                                    } else {
                                        console.log('User subscribed successfully', response);
                                    }
                                }).catch(function (err) {
                                    console.log('Fetch Error :-S', err);
                                });
                            }).catch(function (err) {
                                console.log('Handle rejected promise (' + err + ') here.');
                            });

                        } else {

                        }

                    }).catch(function (err) {
                        console.log('An error occurred while retrieving token. ', err);
                    });
            })
            .catch(function (err) {
                console.log('Unable to get permission to notify. ', err);
            });

        messaging.onMessage(function (payload) {
            console.log('Notification Object Payload', payload);
            var options = {
                body: payload.data.body,
                icon: payload.data.icon,
                actions: []
            };
            function showPushNotification() {
                var notificationObj = new Notification(payload.data.title, options);
                notificationObj.onclick = function (event) {
                    event.preventDefault();
                    if (event.action === 'cta0') {
                        clients.openWindow(ctadata[0].url);
                    } else if (event.action === 'cta1') {
                        clients.openWindow(ctadata[1].url);
                    } else {
                        if (payload.data.notification_url) {
                           // clients.openWindow(payload.data.notification_url);
                            window.open(payload.data.notification_url);
                        } else {
                            event.notification.close();
                            return;
                        }
                    }
                }
            }
            if (payload.data.hasOwnProperty('cta')) {
                var ctadata = JSON.parse(payload.data.cta);
                if (ctadata) {
                    var p1 = new Promise(function (resolve, reject) {
                        for (var i = 0; i < ctadata.length; i++) {
                            options.actions.push({action: 'cta' + i, title: ctadata[i].cta});
                            if (i == ctadata.length - 1) {
                                resolve(options);
                            }
                        }
                    });
                    p1.then(function () {
                        showPushNotification();
                    }).catch(function (err) {
                        console.log('Handle rejected promise (' + err + ') here.');
                    });

                }
            } else {
                showPushNotification();
            }

        });
    }).catch(function (err) {
        console.error("SW registration failed with error " + err);
    });
} else {
    console.log('Sorry, Your browser doesn’t support web push notifications');
}


