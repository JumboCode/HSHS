import firebase from "../firebase";
// import thunk from 'redux-thunk';

export const getInfoStart = () => ({
	type: 'GET_INFO_START'

});

export const getInfoSuccess = (data) => ({
	type: 'GET_INFO_SUCCESS',
	payload: data
});

export const getInfo = () => {
	return (dispatch) => {
		dispatch(getInfoStart());

		firebase.database()
				.ref('')
				.on('value', (snapshot) => {
					setTimeout(() => {
						dispatch(getInfoSuccess(snapshot.val()));
					}, 0);
				});
	}
}

export const getGuestsStart = () => ({
	type: 'GET_GUESTS_START'

});

export const getGuestsSuccess = (data) => ({
	type: 'GET_GUESTS_SUCCESS',
	payload: data
});

<<<<<<< 78682541aa032cdf660f951b9e71249d4cebf8c8
=======
export const getGuests = () => {
	return (dispatch) => {
		dispatch(getGuestsStart());
>>>>>>> Added getGuests action +reducer

		firebase.database()
				.ref('Demo/Guests')
				.on('value', (snapshot) => {
					setTimeout(() => {
						dispatch(getGuestsSuccess(snapshot.val()));
					}, 0);
				});
	}
}
