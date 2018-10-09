import React, {Component} from 'react';
import * as firebase from 'firebase';
import {auth} from '../../firebase';
import * as routes from '../../constants/routes';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class SignInCard extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  submit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .then(() => {
      firebase.auth().currentUser.getIdTokenResult()
      .then((idTokenResult) => {
          // Confirm the user is an Admin.
          if (!!idTokenResult.claims.admin) {
            // Show admin UI.
            console.log("isadmin");
            this.setState(() => ({...INITIAL_STATE}));
            history.push(routes.PANEL);
            //showAdminUI();
          } else {
            // Show regular user UI.
            console.log("isuser");
            //showRegularUI();
          }
      })
      .catch((error) => {
        console.error(error);
      });
    })
    .catch(error => {
      console.error(error);
    });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
    } = this.state;

    return (
        <Card style = {this.props.style}>
            <CardContent>
              <form onSubmit={this.submit}>
                <TextField
                    style = {{
                      width: "100%"
                    }}
                    autoFocus
                    label="Email"
                    type="email"
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    placeholder="user@mail.com"/>
                <br/>
                <TextField
                    style = {{
                      width: "100%"
                    }}
                    label="Password"
                    type="password"
                    value={password}
                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                    placeholder="password"/>
                <br/>
                <br/>
                <Button
                    label="SignIn"
                    type="submit"
                    variant="contained"
                    color="secondary">
                Sign In
                </Button>
              </form>
            </CardContent>
        </Card>
    );
  }

  componentWillUnmount() {
      if (this.statePromises)
          this.statePromises.forEach(p => p.cancel());
  }
}

export default SignInCard;
export {SignInCard};
