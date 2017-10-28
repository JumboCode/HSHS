import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
const rootReducer = combineReducers({
  firebase
})
export default rootReducer

export function reducer(state, action) {
    switch (action.type) {

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
