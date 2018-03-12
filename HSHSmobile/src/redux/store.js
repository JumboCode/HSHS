import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducers/reducers.js';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

const logger = createLogger({collapsed: true});
let middleware = [thunk, logger];

const initialState = {
	guests: [],
	actionItems: [],
	completedActionItems: []
};

export const store = createStore(reducer, initialState, applyMiddleware(...middleware));
