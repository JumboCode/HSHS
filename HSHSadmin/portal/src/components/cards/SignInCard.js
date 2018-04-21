import React, {Component} from 'react';
import * as firebase from 'firebase';
import {auth} from '../../firebase';
import * as routes from '../../constants/routes';
import TextField from 'material-ui/TextField';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';

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
        this.setState(() => ({...INITIAL_STATE}));
        history.push(routes.PANEL);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
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
                    variant="raised"
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
