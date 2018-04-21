import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase';
import * as routes from '../constants/routes';

import {SignupKeyCard} from './SignUpKeyCard'

class PanelPage extends Component {
    constructor(props) {
        super(props);
        let self = this;
        this.state = {
          actionItems: null,
          signupKeys: {
            adminKey: "na",
            userKey: "na"
          }};
        if (!firebase.auth().currentUser) {
            props.history.push(routes.SIGN_IN);
        }
    }

    componentDidMount() {
      let self = this;
      var signupKeyRef = firebase.database().ref("/signUpKeys");
      signupKeyRef.on('value', (snapshot) => {
        console.log(snapshot.val());
        self.setState(
          {signupKeys: snapshot.val()}
        )
      })
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
            <div style = {{
              height: "100%",
              width: "100%",
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              margin: "auto",
              }}>
                <SignupKeyCard
                  signupKey = {this.state.signupKeys.adminKey}
                  label = "Admin Signup Key"/>
                <SignupKeyCard
                  signupKey = {this.state.signupKeys.userKey}
                  label = "User Signup Key"/>
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
