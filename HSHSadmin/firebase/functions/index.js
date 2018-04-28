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
 admin.auth().setCustomUserClaims(uid, {user: true, admin: true}).then(() => {
   console.log("Promoted account", uid, "to Admin.");
   return null;
 }).catch(error => {
   console.error("Promotion of account", uid, "to Admin failed:", error);
   return "ERROR : ACCOUNT TO ADMIN FAILED";
 })
}

function mkUser(uid) {
 admin.auth().setCustomUserClaims(uid, {user: true, admin: false}).then(() => {
   console.log("Promoted account", uid, "to User.");
   return null;
 }).catch(error => {
   console.error("Promotion of account", uid, "to User failed:", error);
   return "ERROR : ACCOUNT TO USER FAILED";
 })
}

function authSignupKey(uid, signupKey) {
  console.log(uid, signupKey);
  let suKeys = admin.database().ref('/signUpKeys');
  let keys = null;
  suKeys.once('value',
    snapshot => {keys = snapshot.val();},
    err => {console.error(err)})
  .then(() => {
    if (signupKey === keys.userKey) {return mkUser(uid);}
    else if (signupKey === keys.adminKey) {return mkAdmin(uid);}
    else {console.error("INCORRECT SIGNUP KEY"); return "ERROR : INCORRECT SIGNUP KEY";}
  })
  .catch(err => {console.error(err); return "ERROR?";})
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

exports.signUpPOST = functions.https.onRequest((req, res) => {
  console.log(req.body.email, req.body.password, req.body.signupKey);
  admin.auth().createUser({email: req.body.email, password: req.body.password})
  .then((userRecord) => {res.status(200).send(authSignupKey(userRecord.uid, req.body.signupKey)); return null;})
  .catch(err => {
    console.error("Failed to create account.", err);
    res.status(500).send("ERROR : FAILED TO CREATE ACCOUNT");
  })
})

exports.authAccountKey = functions.https.onCall((data, context) => {
  return authSignupKey(data.uid, data.signupKey);
  /*
  let suKeys = admin.database().ref('/signUpKeys');
  let keys = null;
  suKeys.once('value',
    (snapshot) => {keys = snapshot.val();},
    (err) => {console.error("Failed to access signUpKeys.", err)})
  .then(() => {
    if (data.signupKey === keys.userKey) {return mkUser(data.uid);}
    else if (data.signupKey === keys.adminKey) {return mkAdmin(data.uid);}
    else {console.error("INCORRECT SIGNUP KEY"); return {res : "ERROR: INCORRECT SIGNUP KEY"};}
  })
  .catch((err) => {return err;})
  */
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
