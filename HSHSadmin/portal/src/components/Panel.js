import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase';
import * as routes from '../constants/routes';

class PanelPage extends Component {
    constructor(props) {
        super(props);
        let self = this;
        this.state = {actionItems: null};
        if (!firebase.auth().currentUser) {
            props.history.push(routes.SIGN_IN);
        }
        var actionItemsRef = firebase.database().ref("/actionItems");
        actionItemsRef.on('value', (snapshot) => {
            console.log(snapshot.val());
            self.setState(
                {actionItems: snapshot.val()}
            );
        });
    }

    render() {
        let self = this;
        return (
            <div>
                {JSON.stringify(self.state.actionItems)}
            </div>
        );
    }

    componentWillUnmount() {
        if (this.statePromises)
            this.statePromises.forEach(p => p.cancel());
    }
}

/*
{(() => {
    if (firebase.auth().currentUser) {
        //return firebase.auth().currentUser.uid;
        return JSON.stringify(self.state.actionItems);
    } else {
        //return "NOTUSER";
        return JSON.stringify(self.state.actionItems);
    }
})()}
*/

export default withRouter(PanelPage);
