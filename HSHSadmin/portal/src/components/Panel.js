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
                  keyRef = {firebase.database().ref("/signUpKeys/adminKey")}/>
                <SignupKeyCard
                  label = "User Signup Key"
                  keyRef = {firebase.database().ref("/signUpKeys/userKey")}/>
                <CreateAccountCard />
                <GetUserTagsCard />
                <DataExportCard />
                <UserManagementCard />
            </div>
        );
    }

    componentWillUnmount() {
        if (this.statePromises)
            this.statePromises.forEach(p => p.cancel());
    }
}

export default withRouter(PanelPage);
