const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp(functions.config().firebase);

function deleteUser(uid) {
  return admin.auth().deleteUser(uid).then(() => {
    console.log("Deleted user account", uid);
    return null;
  }).catch(error => {
    console.error("Deletion of user account", uid, "failed:", error);
    return null;
  });
}

function mkAdmin(uid) {
 return admin.auth().setCustomUserClaims(uid, {user: true, admin: true}).then(() => {
   console.log("Promoted account", uid, "to Admin.");
   return null;
 }).catch(error => {
   console.error("Promotion of account", uid, "to Admin failed:", error);
   return null;
 })
}

function mkUser(uid) {
 return admin.auth().setCustomUserClaims(uid, {user: true, admin: false}).then(() => {
   console.log("Demoted account", uid, "to User.");
   return null;
 }).catch(error => {
   console.error("Demotion of account", uid, "to User failed:", error);
   return null;
 })
}

exports.getUserTags = functions.https.onCall((data, context) => {
  return admin.auth().getUserByEmail(data.email).then((userRecord) => {
    return userRecord.customClaims;
  }).catch((err) => {
    console.error(err);
    return null;
  })
})

exports.deleteAccount = functions.https.onCall((data, context) => {
  return admin.auth().verifyIdToken(context.auth.uid).then((claims) => {
    if (claims.admin === true) {return deleteUser(data.uid);}
    return null;
  })
})

exports.removeAdmin = functions.https.onCall((data, context) => {
   return admin.auth().verifyIdToken(context.auth.uid).then((claims) => {
     if (claims.admin === true) {return mkUser(data.uid)}
     return null;
   })
 })

exports.makeAdmin = functions.https.onCall((data, context) => {
  return admin.auth().verifyIdToken(context.auth.uid).then((claims) => {
    if (claims.admin === true) {return mkAdmin(data.uid);}
    return null;
  })
})

exports.authAccountKey = functions.https.onCall((data, context) => {
  let suKeys = admin.database().ref('/signUpKeys');
  return suKeys.once('value', (snapshot) => {
    let keys = snapshot.val();
    if (data.signupKey === keys.userKey) {
      return mkUser(data.uid);
    } else if (data.signupKey === keys.adminKey) {
      return mkAdmin(data.uid);
    } else {
      console.error("INCORRECT SIGNUP KEY");
      return "ERROR: INCORRECT SIGNUP KEY";
    }
  })
})

exports.signUp = functions.https.onCall((data, context) => {
  return admin.auth().createUser({
    email: data.email,
    password: data.password
  }).then((userRecord) => {
    return userRecord.uid;
  }).catch(err => {
    console.error("Failed to create account.", err);
    return err;
  })
})
