import firebase from "../firebase";
import {store} from './store.js';
import {Alert} from 'react-native';

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
					store.dispatch(getGuestsSuccess(snapshot.val()));
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
				store.dispatch(getInteractionsSuccess(snapshot.val()));
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
                        	store.dispatch(getActionItemsSuccess(snapshot.val()));
                        })
}

export const addNewGuestStart = () => ({
	type: 'ADD_NEW_GUEST_START'
});

export const addNewGuestSuccess = () => ({
	type: 'ADD_NEW_GUEST_SUCCESS'
})

export const addNewGuest = (name, age, gender, description, interactions, actionItems) => {
	store.dispatch(addNewGuestStart);
	firebase.database().ref('guests').push().set({
		name: name,
		age: age,
		gender : gender,
        description: description
  });
}

export const addNewActionItemStart = () => ({
        type: 'ADD_NEW_ACTION_ITEMS_START'
})

export const addNewActionItemSuccess = () => ({
        type: 'ADD_NEW_ACTION_ITEMS_SUCCESS'
})

export const addNewActionItem = (isDone, title, creationTimestamp, locationCoord, locationStr, shiftDate, description, guestIds, volunteerId, color) => {
	store.dispatch(addNewActionItemStart);
	//var ref = firebase.database().ref('/');
	let newActionItemKey = firebase.database().ref('actionItems').push().key;
	let ref = firebase.database().ref('/actionItems/' + newActionItemKey);


    /* Attempt to use transactions, don't delete */
    // let updates = {};
	// let guestRef = firebase.database().ref('guests/');
	// guestRef.transaction((cur) =>
	// {
	// 	this.guestIds = guestIds.filter(id => cur[id] !== null);
	// 	return;
	// 	// this.guestIds.map((id) => {
	// 	// 	(!cur[id]["actionItems"]) && (cur[id]["actionItems"] = {})
	// 	// 	cur[id]["actionItems"][newActionItemKey] = newActionItemKey;
	// 	// });
	// 	// return cur;
	// }, (error) => {
	// 	if (error) {
	// 		Alert.alert(error);
	// 	} else {
	// 		// Create action item
	// 		updates['actionItems/' + newActionItemKey] = {
	// 				isDone: isDone,
	// 				title: title,
	// 				creationTimestamp: creationTimestamp,
	// 				locationCoord: {
	// 						lat: locationCoord.latitude,
	// 						lng: locationCoord.longitude,
	// 				},
	// 				locationStr: locationStr,
	// 				shiftDate: shiftDate,
	// 				description: description,
	// 				guestIds: this.guestIds,
	// 				volunteerId: volunteerId,
	// 				color: color,
	// 		}
	// 		ref.update(updates);
	// 	}
	// });

	ref.update({
		isDone: isDone,
		title: title,
		creationTimestamp: creationTimestamp,
		locationCoord: {
		    lat: locationCoord.latitude,
		    lng: locationCoord.longitude,
		},
		locationStr: locationStr,
		shiftDate: shiftDate,
		description: description,
		volunteerId: volunteerId,
		color: color,
  }, error => {
		if (error) {
			Alert.alert("Failed to add new action item. Please try again.");
		} else if (guestIds && guestIds.length != 0) {
			ref.update({guestIds: guestIds}, err => {
				err && Alert.alert("Failed to tag guests in the action item you just created. Please try again.");
			})
		}
	});

	// Add action item to guests' actionItem list
	// for (i in guestIds) {
	//     let key = firebase.database().ref('guests/' + guestIds[i] + '/actionItems').push().key;
	//     updates['guests/' + guestIds[i] + '/actionItems/' + key] = newActionItemKey;
	// }
}

export const editActionItemStart = () => ({
        type: 'ADD_NEW_ACTION_ITEMS_START'
})

export const editActionItemSuccess = () => ({
        type: 'ADD_NEW_ACTION_ITEMS_SUCCESS'
})

export const editActionItem = (id, isDone, title, creationTimestamp, locationCoord, locationStr, shiftDate, description, guestIds, volunteerId, color) => {
    store.dispatch(addNewActionItemStart);
    let ref = firebase.database().ref('actionItems/' + id);
    ref.update({
        isDone: isDone,
        title: title,
        creationTimestamp: creationTimestamp,
        locationCoord: {
            lat: locationCoord.latitude,
            lng: locationCoord.longitude,
        },
        locationStr: locationStr,
        shiftDate: shiftDate,
        description: description,
        volunteerId: volunteerId,
		color: color,
    }, error => {
        if (error) {
            Alert.alert("Failed to edit action item. Please try again.");
        } else if (guestIds && guestIds.length != 0) {
            ref.update({guestIds: guestIds}, err => {
                err && Alert.alert("Failed to tag guests in the action item you just created. Please try again.")
            })
        }
    });
}

export const deleteActionItemStart = () => ({
    type: 'DELETE_NEW_ACTION_ITEMS_START'
})

export const deleteActionItemSuccess = () => ({
    type: 'DELETE_NEW_ACTION_ITEMS_SUCCESS'
})

export const deleteActionItem = (id) => {
    store.dispatch(deleteActionItemStart);
    firebase.database().ref('actionItems').child(id).remove(error => {
        if (error) {
            Alert.alert("Failed to delete action item. Please try again.");
        }
    });

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

export const markActionItemAsDone = (id) => {
	firebase.database().ref('actionItems').child(id).once('value', snapshot => {
		firebase.database().ref('completedActionItems').child(id).set(snapshot.val(), error => {
			if (error) {
				Alert.alert("Error marking item as done. Please try again.")
			}

			firebase.database().ref('actionItems').child(id).remove(error => {
				if (error) {
					Alert.alert("Error deleting action item.")
				}
			})
		});
	})
}
