import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
const rootReducer = combineReducers({
  firebase
});

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

        case 'GET_INTERACTIONS_START':
            return Object.assign({}, state, {
                loading: true
            });

        case 'GET_INTERACTIONS_SUCCESS':
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                interactions: action.payload
            });
        case 'ADD_GUEST_START':
            return Object.assign({}, state, {
                adding: true
            });
        case 'ADD_NEW_GUEST_SUCCESS':
            return Object.assign({}, state, {
                adding: false
            });
        case 'ADD_NEW_ACTION_ITEM_START':
            return Object.assign({}, state, {
                addingAction: true
            });
        case 'ADD_NEW_ACTION_ITEM_SUCCESS':
            return Object.assign({}, state, {
                addingAction: false
            });
        case 'ADD_NEW_INTERACTIONS_START':
            return Object.assign({}, state, {
                addingInteraction: true
            });
        case 'ADD_NEW_INTERACTIONS_SUCCESS':
            return Object.assign({}, state, {
                addNewInteractionSuccess: true,
            });
        case 'ADD_NEW_INTERACTIONS_FAILURE':
            return Object.assign({}, state, {
                addNewInteractionSuccess: false,
            });
        case 'DELETE_NEW_ACTION_ITEMS_START':
            return Object.assign({}, state, {
                deletingAction: true
            });
        case 'DELETE_NEW_ACTION_ITEMS_SUCCESS':
            return Object.assign({}, state, {
                deletingAction: false
            });
        case 'GET_ACTION_ITEMS_START':
            return Object.assign({}, state, {
                loading: true
            });

        case 'GET_ACTION_ITEMS_SUCCESS':{
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                actionItems: action.payload,
                guestActionItemIds: Object.keys(action.payload).reduce((guests, actionItemId) => {
                  action.payload[actionItemId].guestIds && action.payload[actionItemId].guestIds.map(guestId => {
                    !guests[guestId] && (guests[guestId] = []);
                    guests[guestId].push(actionItemId);
                  });
                  return guests;
                }, new Object())
            })};

        case 'GET_COMPLETED_ACTION_ITEMS_SUCCESS':
            console.log(action.payload)
            return Object.assign({}, state, {
                completedActionItems: action.payload,
                guestCompletedActionItemIds: Object.keys(action.payload).reduce((guests, actionItemId) => {
                  action.payload[actionItemId].guestIds && action.payload[actionItemId].guestIds.map(guestId => {
                    !guests[guestId] && (guests[guestId] = []);
                    guests[guestId].push(actionItemId);
                  });
                  return guests;
                }, new Object())
            })


        default:
            return state;
    }
}
