import firebase from "../firebase";
import {store} from './store.js';

export const getGuestsStart = () => ({
	type: 'GET_GUESTS_START'

});

export const getGuestsSuccess = (data) => ({
	type: 'GET_GUESTS_SUCCESS',
	payload: data
});

export const getGuests = () => {
		store.dispatch(getGuestsStart());
		firebase.database()
				.ref('guests')
				.on('value', (snapshot) => {
					setTimeout(() => {
						store.dispatch(getGuestsSuccess(snapshot.val()));
					}, 0);
				});
}
