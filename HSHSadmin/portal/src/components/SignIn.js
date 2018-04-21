import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../constants/routes';

import TextField from 'material-ui/TextField';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';

const SignInPage = ({ history }) =>
    <div style={
            {
                height: "100%",
                width: "100%",
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                //margin: '10% auto',
            }}>
        <div style = {{flex: "2"}}></div>
        <SignInCard
            history = {history}
            style = {{
                maxWidth: "50%",
                flex: "none",
            }}
        />
        <div></div>
    </div>


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInCard extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
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
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
        <Card>
            <CardContent>
                <TextField
                    label="Email"
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    placeholder="user@mail.com"
                />
                <br/>
                <TextField
                    label="Password"
                    value={password}
                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                    placeholder="password"
                />
            </CardContent>
            <CardActions>
                <Button
                    label="SignIn"
                    onClick = {this.onSubmit}
                    variant="raised"
                    color="secondary">
                Sign In
                </Button>
            </CardActions>
        </Card>
    );

/*
    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
*/
  }
}

export default withRouter(SignInPage);

export {
  SignInCard,
};
