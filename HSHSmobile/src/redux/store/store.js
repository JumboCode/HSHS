<<<<<<< c0d22032d398db94e40c500d080619c90335e525
import { createStore, compose } from 'redux'
import rootReducer from './reducers'
import { reduxFirebase } from 'react-redux-firebase'
// Replace with your Firebase config
const fbConfig = {
  apiKey:  'AIzaSyBv7bMYBUsPHR1MRvnSuhkeZ3HHqmvcp60',
  authDomain: 'hshs-street-team.firebaseapp.com',
  databaseURL: 'https://hshs-street-team.firebaseio.com'
}
export default function configureStore (initialState, history) {
  const createStoreWithMiddleware = compose(
    reduxFirebase(fbConfig, { userProfile: 'users' }),
    // Redux Devtools
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore)
  const store = createStoreWithMiddleware(rootReducer)
if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer')
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
=======
import { createStore, compose, applyMiddleware } from 'redux'
import { reducer } from '../reducers/reducers.js'
import { reduxFirebase } from 'react-redux-firebase'

let finalCreateStore = compose(
  applyMiddleware()
)(createStore)

const initialState = { test: "blah" }

const store = createStore(reducer, initialState);

console.log(store);

export default store;

/*export function configureStore() {
  return finalCreateStore(reducer, initialState)
>>>>>>> store is undefined
}

const store = configureStore();*/


