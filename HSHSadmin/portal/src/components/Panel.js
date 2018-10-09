import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase';
import * as routes from '../constants/routes';

import {SignupKeyCard} from './cards/SignupKeyCard'
import {UserManagementCard} from './cards/UserManagementCard'
import {DataExportCard} from './cards/DataExportCard'
import {GetUserTagsCard} from './cards/GetUserTagsCard'
import {CreateAccountCard} from './cards/CreateAccountCard'

const rowStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap"
};

const Row = (props) => <div style = {rowStyle}> {props.children} </div>;

class PanelPage extends Component {
    constructor(props) {
        super(props);
        if (!firebase.auth().currentUser) {
            props.history.push(routes.SIGN_IN);
        }
    }

    render() {
        return (
            <div style ={{
              height: "100%", width: "100%", display: "flex",
              flexDirection: "column", alignItems: "center", justifyContent: "center",
              margin: "auto"
            }}>
              <Row>
                <SignupKeyCard
                  label = "Admin Signup Key"
                  keyRef = {firebase.database().ref("/signUpKeys/adminKey")}
                  style = {{width: "15em", height: "10em", margin: 10}}/>
                <SignupKeyCard
                  label = "User Signup Key"
                  keyRef = {firebase.database().ref("/signUpKeys/userKey")}
                  style = {{width: "15em", height: "10em", margin: 10}}/>
                <GetUserTagsCard style = {{width: "15em", height: "10em", margin: 10}}/>
              </Row>
              <Row>
                <CreateAccountCard style = {{margin: 10, width: "20em"}}/>
              </Row>
              <Row>
                <DataExportCard style = {{width: "15em", height: "10em", margin: 10}}/>
                <UserManagementCard style = {{width: "15em", height: "10em", margin: 10}}/>
              </Row>
            </div>
        );
    }

    componentWillUnmount() {
        if (this.statePromises)
            this.statePromises.forEach(p => p.cancel());
    }
}

export default withRouter(PanelPage);
