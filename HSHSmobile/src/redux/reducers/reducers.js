import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
<<<<<<< c0d22032d398db94e40c500d080619c90335e525
const rootReducer = combineReducers({
  firebase
})
export default rootReducer

export function reducer(state, action) {
    switch (action.type) {
        case 'GET_INFO_START':
            return Object.assign({}, state, {
                loading: true
            });

        case 'GET_INFO_SUCCESS':
        	return Object.assign({}, state, {
        		loading: false,
        		loaded: true,
        		info: action.payload
        	});

        case 'GET_GUESTS_START':
            return Object.assign({}, state, {
                loading: true
            });

        case 'GET_GUESTS_SUCCESS':
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                guests: action.payload
            });

        default:
            return state;
    }
}
