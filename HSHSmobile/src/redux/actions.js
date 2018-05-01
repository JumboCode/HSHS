import firebase from "../firebase";
import {store} from './store.js';
import {Alert} from 'react-native';
import Toast from 'react-native-root-toast';

const lotteryExpiration = 9000000;	// Lottery numbers lifetime in ms

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

export const getCompletedActionItemsStart = () => ({
	type: 'GET_COMPLETED_ACTION_ITEMS_START'
})

export const getCompletedActionItemsSuccess = (data) => ({
	type: 'GET_COMPLETED_ACTION_ITEMS_SUCCESS',
	payload: data
})

export const getCompletedActionItems = () => {
	store.dispatch(getCompletedActionItemsStart());
	firebase.database().ref('completedActionItems')
					   .on('value', snapshot => {
					   		store.dispatch(getCompletedActionItemsSuccess(snapshot.val()));
					   })
}

export const addNewGuestStart = () => ({
	type: 'ADD_NEW_GUEST_START'
});

export const addNewGuestSuccess = () => ({
	type: 'ADD_NEW_GUEST_SUCCESS'
})

export const addNewGuest = (name, age, gender, description, color) => {
	store.dispatch(addNewGuestStart);
	firebase.database().ref('guests').push().set({
		name: name,
		age: age,
		gender : gender,
    description: description,
		color: color
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
    store.dispatch(addNewActionItemStart());
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

export const addNewInteractionSuccess = () => {
	Toast.show("Interaction generated successfully")
    return {type: 'ADD_NEW_INTERACTIONS_SUCCESS'};
}

export const addNewInteractionFailure = () => ({
			type: 'ADD_NEW_INTERACTIONS_FAILURE'
})

// NOTE: title is not deprecated, but kept for schema.
// key is an optional param, in case you want to edit instead of create
export const addInteractionItem = (creationTimestamp, interactionTimeStamp, locationCoord, locationStr, description, guestIds, volunteerId, resources, key) => {
		store.dispatch(addNewInteractionStart());
		let newInteractionKey = key || firebase.database().ref('actionItems').push().key;
		let ref = firebase.database().ref('/interactions/' + newInteractionKey);

		ref.update(
				{
						creationTimestamp: creationTimestamp,
						interactionTimeStamp: interactionTimeStamp,
						locationCoord: {
								lat: locationCoord.latitude,
								lng: locationCoord.longitude,
						},
						locationStr: locationStr,
						description: description,
						volunteerId: volunteerId,
						resources: resources,
		  	}, error =>
				{
					if (error) {
							Alert.alert("Failed to save interaction. Please try again.");
					} else if (guestIds && guestIds.length != 0) {
							ref.update({guestIds: guestIds}, err => {
									if (err) {
										store.dispatch(addNewInteractionFailure());
										Alert.alert("Failed to tag guests in the interaction you just created. Please try again.");
									} else {

										// callback
										store.dispatch(addNewInteractionSuccess())
									}
							})
 					}
					// callback
					else {
						store.dispatch(addNewInteractionSuccess());
					}
				});
};

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

export const markActionItemAsTodo = (id) => {
	firebase.database().ref('completedActionItems').child(id).once('value', snapshot => {
		firebase.database().ref('actionItems').child(id).set(snapshot.val(), error => {
			if (error) {
				Alert.alert("Error marking item as done. Please try again.")
			}

			firebase.database().ref('completedActionItems').child(id).remove(error => {
				if (error) {
					Alert.alert("Error deleting action item.")
				}
			})
		});
	})
}

export const getLotteryWinnersStart = () => ({
		type: 'GET_WINNERS_START'
})

export const getLotteryWinnersSuccess = (data)=> ({
		type: 'GET_WINNERS_SUCCESS',
		payload: data
})

export const resetWinners = () => {
	let ref = firebase.database().ref('/');
	ref.update({lottery: null});
}

export const enterWinners = (winners, timestamp) => {
	let ref = firebase.database().ref('/lottery');
	ref.update({lotteryWinners: winners, lastUpdated: timestamp});
}

export const getLotteryWinners = () => {
	store.dispatch(getLotteryWinnersStart());
	firebase.database()
			.ref('lottery')
			.on('value', (snapshot) => {

				let now = new Date();
				let then = new Date(snapshot.child('lastUpdated').val());
				if (now - then > lotteryExpiration) {
					store.dispatch(getLotteryWinnersSuccess(null));
				} else {
					store.dispatch(getLotteryWinnersSuccess(snapshot.child('lotteryWinners').val()));
				}

			});
}
