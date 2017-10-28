<<<<<<< 6a58d935c2a01e1557be760e1a668bd5e359c167
=======
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
		dispatch(getMuralsStart());

		firebase.database()
				.ref('')
				.on('value', (snapshot) => {
					setTimeout(() => {
						dispatch(getInfoSuccess(snapshot.val()));
					}, 0);
				});
	}
}

// let actions = {
//     getInfo: () => {
//         return {
//             type: GET_INFO
//             info: firebase.database()
//        					  .ref('tentative_schema/test')
//        					  .on('value', (snapshot) => {

//                 snapshot.val()
//             })
//         }
//     }

//     // TODO: more actions go here
// }

// export default actions

>>>>>>> Firebase info in action

