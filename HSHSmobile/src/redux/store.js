import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducers/reducers.js';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

const logger = createLogger({collapsed: true});
let middleware = [thunk, logger];

const initialState = { 
	test: "blah", 
	guests: [
	// dummy default
	{
	    "id": 0,
	    "receptive": 4,
	    "last_interacted": 1509142676,
	    "notes": [{"note": "Needs blanket"}, {"note": "Needs medication for cold"}],
	    "description": "Blonde, 6', Blue eyes, 30"
	}
	]
};

export const store = createStore(reducer, initialState, applyMiddleware(...middleware));
