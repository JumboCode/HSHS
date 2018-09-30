import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase';
import * as routes from '../constants/routes';

import {SignupKeyCard} from './cards/SignupKeyCard'
import {UserManagementCard} from './cards/UserManagementCard'
import {DataExportCard} from './cards/DataExportCard'
import {GetUserTagsCard} from './cards/GetUserTagsCard'
import {CreateAccountCard} from './cards/CreateAccountCard'

class PanelPage extends Component {
    constructor(props) {
        super(props);
        let self = this;
        if (!firebase.auth().currentUser) {
            props.history.push(routes.SIGN_IN);
        }
    }

    render() {
        return (
            <div style = {{
              height: "100%",
              width: "100%",
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              margin: "auto",
              flexWrap: "wrap",
              }}>
                <SignupKeyCard
                  label = "Admin Signup Key"
                  keyRef = {firebase.database().ref("/signUpKeys/adminKey")}
                  style = {{flex: 1, margin: 10}}/>
                <SignupKeyCard
                  label = "User Signup Key"
                  keyRef = {firebase.database().ref("/signUpKeys/userKey")}
                  style = {{flex: 1, margin: 10}}/>
                <CreateAccountCard style = {{flex: 1, margin: 10}}/>
                <GetUserTagsCard style = {{flex: 1, margin: 10}}/>
                <DataExportCard style = {{flex: 1, margin: 10}}/>
                <UserManagementCard style = {{flex: 1, margin: 10}}/>
            </div>
        );
    }

    componentWillUnmount() {
        if (this.statePromises)
            this.statePromises.forEach(p => p.cancel());
    }
}

export default withRouter(PanelPage);
