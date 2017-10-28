import { combineReducers } from 'redux'
<<<<<<< 6a58d935c2a01e1557be760e1a668bd5e359c167
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
<<<<<<< c0d22032d398db94e40c500d080619c90335e525
const rootReducer = combineReducers({
  firebase
})
export default rootReducer
=======
=======
>>>>>>> Firebase info in action

export function reducer(state, action) {
    switch (action.type) {
        case 'GET_INFO_START':
            return Object.assign({}, state, {
                loading: true
            });

        case 'GET_MURALS_SUCCESS':
        	return Object.assign({}, state, {
        		loading: false,
        		loaded: true,
        		info: action.payload
        	});

        // TODO: more reducers go here

        default:
            return state;
    }
}

//export default rootReducer
>>>>>>> store is undefined
