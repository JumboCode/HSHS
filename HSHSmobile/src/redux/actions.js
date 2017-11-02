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
				.ref('demo/guests')
				.on('value', (snapshot) => {
					setTimeout(() => {
						store.dispatch(getGuestsSuccess(snapshot.val()));
					}, 0);
				});
}

export const addNewGuestStart = () => ({
	type: 'ADD_NEW_GUEST_START'
});

export const addNewGuestSuccess = () => ({
	type: 'ADD_NEW_GUEST_SUCCESS'
})

export const addNewGuest = (name, birthdate, gender, other) => {
	store.dispatch(addNewGuestStart);
	firebase.database().ref('demo/guests').push().set({
    		name: name,
    		birthdate: birthdate,
    		gender : gender, 
    		other: other
  });
}