import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBv7bMYBUsPHR1MRvnSuhkeZ3HHqmvcp60",
    authDomain: "hshs-street-team.firebaseapp.com",
    databaseURL: "https://hshs-street-team.firebaseio.com",
    projectId: "hshs-street-team",
    storageBucket: "hshs-street-team.appspot.com",
    messagingSenderId: "136277719686"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
};
