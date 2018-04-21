const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initalizeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.signUp = functions.https.onRequest((request, response) => {
    admin.auth().createUser({
        email: String(data.email),
        emailVerified: false,
        password: String(data.password),
    })
    .then(function(userRecord) {
        response.send({
          status: "success",
          email: String(data.email)
        });
        return;
    })
    .catch(function(error) {
        response.send({
          status: "failure"
        });
        return;
    });
});
