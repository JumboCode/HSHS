import React, {Component} from 'react';
import * as firebase from 'firebase';
import {auth} from '../../firebase';
import * as routes from '../../constants/routes';
import TextField from 'material-ui/TextField';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  key: '',
  error: null
}

class CreateAccountCard extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  submit = (event) => {
    const {
      email,
      password,
      key,
    } = this.state;

    const {
      history,
    } = this.props;

    let signUp = firebase.functions().httpsCallable("signUp");
    let authKey = firebase.functions().httpsCallable("authAccountKey");

    signUp({email: email, password: password})
    .then((res) => {return authKey({signupKey : key, uid : res.data})})
    .catch(err => {console.error(err);})
    .then((res) => console.log(res))
    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      key,
    } = this.state;

    return (
        <Card style = {this.props.style}>
            <CardContent>
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
                <TextField
                    style = {{
                      width: "100%"
                    }}
                    label="Key"
                    value={key}
                    onChange={event => this.setState(byPropKey('key', event.target.value))}
                    placeholder="key"/>
                <br/>
            </CardContent>
            <CardActions>
              <Button
                  label="SignIn"
                  variant="raised"
                  color="secondary"
                  onClick={this.submit}>
              Sign Up
              </Button>
            </CardActions>
        </Card>
    );
  }

  componentWillUnmount() {
      if (this.statePromises)
          this.statePromises.forEach(p => p.cancel());
  }
}

export default CreateAccountCard;
export {CreateAccountCard};
