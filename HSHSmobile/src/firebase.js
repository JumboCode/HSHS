import * as firebase from "firebase";
import config from '../config'

firebase.initializeApp({
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  databaseURL: config.FIREBASE_DATABASE_URL,
  storageBucket: config.FIREBASE_STORAGE_BUCKET
});

export const database = firebase.database().ref('tentative_schema');

export function syncFirebase(store) {
	database.on('value', (snapshot) => {
		// store.dispatch();
	})
}