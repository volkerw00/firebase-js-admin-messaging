Firebase Cloud Messaging Quickstart
===================================

The Firebase Cloud Messaging quickstart demonstrates how to:
- Request permission to send app notifications to the user.
- Receive FCM messages using the Firebase Cloud Messaging JavaScript SDK.
- Send a notification using the FCM Admin SDK

Introduction
------------

* [Read more about Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/)
* [Client code is mostly taken from firebase/quickstart-js](https://github.com/firebase/quickstart-js)


Getting Started
---------------

1. Create your project on the [Firebase Console](https://console.firebase.google.com).
1. Open your [project](https://console.firebase.google.com/u/0/project/_/overview) in the firebase console and click on "add firebase to your web app". This should show the requiered configuration like so:

    ```
    var config = {
        apiKey: "<API-KEY>",
        authDomain: "<AUTH-DOMAIN>",
        databaseURL: "<DATABASE-URL>",
        projectId: "<PROJECT-ID>",
        storageBucket: "<STORAGE-BUCKET>",
        messagingSenderId: "<MESSAGING-SENDER-ID>"
      };
    ```

    Put that into `firebase.config.js`.
1. Navigate to [Cloud Messaging](https://console.firebase.google.com/u/0/project/_/settings/cloudmessaging/) and there navigate to the Cloud Messaging tab. Create a web push certificate and copy the key into the field `publicVapidKey` in `firebase.config.js`.
1. Navigate to [Service Accounts](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk) and click the Generate New Private Key button at the bottom of the Firebase Admin SDK section of the Service Accounts tab. Put the created JSON file into `server/firebase.admin.config.json`.
1. Run `./cert.sh`
1. Start the server via `npm start`.
1. Open [https://localhost:9090](https://localhost:9090) in your browser.
4. Click **REQUEST PERMISSION** button to request permission for the app to send notifications to the browser.
5. Upon granted permission the browser sends its Instance UD token to the sever triggering a message which is then sent via Firebase Admin SDK.
5. You may further use the generated Instance ID token (IID Token) to send an HTTP request to FCM that delivers the message to the web application, inserting appropriate values for [`YOUR-SERVER-KEY`](https://console.firebase.google.com/project/_/settings/cloudmessaging) and `YOUR-IID-TOKEN`.

### HTTP
```
POST /fcm/send HTTP/1.1
Host: fcm.googleapis.com
Authorization: key=YOUR-SERVER-KEY
Content-Type: application/json

{
  "notification": {
    "title": "Portugal vs. Denmark",
    "body": "5 to 1",
    "icon": "firebase-logo.png",
    "click_action": "http://localhost:8081"
  },
  "to": "YOUR-IID-TOKEN"
}
```

### Fetch
```js
var key = 'YOUR-SERVER-KEY';
var to = 'YOUR-IID-TOKEN';
var notification = {
  'title': 'Portugal vs. Denmark',
  'body': '5 to 1',
  'icon': 'firebase-logo.png',
  'click_action': 'http://localhost:8081'
};

fetch('https://fcm.googleapis.com/fcm/send', {
  'method': 'POST',
  'headers': {
    'Authorization': 'key=' + key,
    'Content-Type': 'application/json'
  },
  'body': JSON.stringify({
    'notification': notification,
    'to': to
  })
}).then(function(response) {
  console.log(response);
}).catch(function(error) {
  console.error(error);
})
```

### cURL
```
curl -X POST -H "Authorization: key=YOUR-SERVER-KEY" -H "Content-Type: application/json" -d '{
  "notification": {
    "title": "Portugal vs. Denmark",
    "body": "5 to 1",
    "icon": "firebase-logo.png",
    "click_action": "http://localhost:8081"
  },
  "to": "YOUR-IID-TOKEN"
}' "https://fcm.googleapis.com/fcm/send"
```

### App focus
When the app has the browser focus, the received message is handled through
the `onMessage` callback in `index.html`. When the app does not have browser
focus then the `setBackgroundMessageHandler` callback in `firebase-messaging-sw.js`
is where the received message is handled.

The browser gives your app focus when both:

1. Your app is running in the currently selected browser tab.
2. The browser tab's window currently has focus, as defined by the operating system.


License
-------

 Licensed under an [Apache-2](../LICENSE) license.
