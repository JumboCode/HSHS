import firebase from "../firebase";
import {store} from './store.js';

export const getGuestsStart = () => ({
	type: 'GET_GUESTS_START'
});

export const getGuestsSuccess = (data) => ({
	type: 'GET_GUESTS_SUCCESS',
	payload: data
});

export const getGuests = () => {
		store.dispatch(getGuestsStart());
		firebase.database()
				.ref('guests')
				.on('value', (snapshot) => {
					setTimeout(() => {
						store.dispatch(getGuestsSuccess(snapshot.val()));
					}, 0);
				});
}

export const getInteractionsStart = () => ({
	type: 'GET_INTERACTIONS_START'
});

export const getInteractionsSuccess = (data) => ({
	type: 'GET_INTERACTIONS_SUCCESS',
	payload: data
});

export const getInteractions = () => {
	store.dispatch(getInteractionsStart());
	firebase.database()
			.ref('interactions')
			.on('value', snapshot => {
				setTimeout(() => {
					store.dispatch(getInteractionsSuccess(snapshot.val()));
				}, 0);
			})
};

export const getActionItemsStart = () => ({
        type: 'GET_ACTION_ITEMS_START'
})

export const getActionItemsSuccess = (data) => ({
        type: 'GET_ACTION_ITEMS_SUCCESS',
        payload: data
})

export const getActionItems = () => {
        store.dispatch(getActionItemsStart());
        firebase.database()
                        .ref('actionItems')
                        .on('value', snapshot => {
                                setTimeout(() => {
                                	console.log(snapshot.val());
                                        store.dispatch(getActionItemsSuccess(snapshot.val()));
                                }, 0);
                        })
}

export const addNewGuestStart = () => ({
	type: 'ADD_NEW_GUEST_START'
});

export const addNewGuestSuccess = () => ({
	type: 'ADD_NEW_GUEST_SUCCESS'
})

export const addNewGuest = (name, age, gender, hairColor, tattoo, description, interactions, actionItems) => {
	store.dispatch(addNewGuestStart);
	firebase.database().ref('guests').push().set({
    		name: name,
    		age: age,
    		gender : gender, 
    		hairColor: hairColor,
            tattoo: tattoo,
            description: description,
            interactions: interactions,
            actionItems: actionItems
  });
}

export const addNewActionItemStart = () => ({
        type: 'ADD_NEW_ACTION_ITEMS_START'
})

export const addNewActionItemSuccess = () => ({
        type: 'ADD_NEW_ACTION_ITEMS_SUCCESS'
})

export const addNewActionItem = (isDone, title, creationTimestamp, location, description, guestIds, volunteerId) => {
                store.dispatch(addNewActionItemStart);
                firebase.database().ref('action-items').push().set({
                        isDone: isDone,
                        title: title,
                        creationTimestamp: creationTimestamp,
                        location: location,
                        description: description,
                        guestIds: guestIds,
                        volunteerId: volunteerId
                })
}


export const addNewInteractionStart = () => ({
        type: 'ADD_NEW_INTERACTIONS_START'
})

export const addNewInteractionSuccess = () => ({
        type: 'ADD_NEW_INTERACTIONS_SUCCESS'
})

export const addInteractionItem = (description, details, location, receptiveness, resources, timestamp, volunteers) => {
                store.dispatch(addNewActionItemStart);
                firebase.database().ref('interactions').push().set({
                        description: description,
                        details: details,
                        location: location,
                        receptiveness: receptiveness,
                        resources: resources,
                        timestamp: timestamp,
                        volunteers: volunteers
                })
}