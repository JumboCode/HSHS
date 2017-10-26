import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
<<<<<<< c0d22032d398db94e40c500d080619c90335e525
const rootReducer = combineReducers({
  firebase
})
export default rootReducer
=======

//let reducer = function(state, action) {
export function reducer(state, action) {
    switch (action.type) {
        case 'GET_INFO':
            return Object.assign({}, state, {
                test: action.info
            })
        default:
            return state;
    }
}

//export default rootReducer
>>>>>>> store is undefined
