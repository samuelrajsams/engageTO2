importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');
var config = {
    apiKey: "AIzaSyDEDllAqn57DwHHvI1UpmUUCQZzolgSNX0",
    messagingSenderId: "1009041982851"
};
firebase.initializeApp(config);
var messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload, 'payload');
    var notificationTitle = payload.data.title;
    var notificationOptions = {
        body: payload.data.body,
        requireInteraction: payload.data.user_interaction,
        icon: payload.data.icon,
        actions: []
    };
    if (payload.data.hasOwnProperty('cta')) {
        var ctadata = JSON.parse(payload.data.cta);
        if (ctadata) {
            for (var i = 0; i < ctadata.length; i++) {
                notificationOptions.actions.push({action: 'cta' + i, title: ctadata[i].cta});
            }
        }
    }
    self.registration.showNotification(notificationTitle, notificationOptions);
    return self.addEventListener('notificationclick', function (event) {
        event.preventDefault();
        if (event.action === 'cta0') {
            clients.openWindow(ctadata[0].url);
        } else if (event.action === 'cta1') {
            clients.openWindow(ctadata[1].url);
        } else {
            if (payload.data.notification_url) {
                clients.openWindow(payload.data.notification_url);
            } else {
                event.notification.close();
                return;
            }
        }
    });
});
