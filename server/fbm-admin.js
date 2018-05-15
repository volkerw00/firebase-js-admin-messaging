var admin = require("firebase-admin");
var express = require('express');

var serviceAccount = require("./firebase.admin.config.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-js-admin-messaging.firebaseio.com"
});

var router = express.Router();

router.put('/token', function (req, res) {
    res.sendStatus(204);

    // This registration token comes from the client FCM SDKs.
    var registrationToken = req.body.token;

    // See documentation on defining a message payload.
    var message = {
        data: {
            score: '850',
            time: '2:45'
        },
        token: registrationToken
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
});

module.exports = router;
