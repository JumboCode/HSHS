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

class GetUserTagsCard extends Component {
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

    let getTags = firebase.functions().httpsCallable("getUserTags");
    getTags({email: email}).then((val) => {console.log(val);})
    .catch(err => {console.error(err)});
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
            </CardContent>
            <CardActions>
              <Button
                  label="Log Keys"
                  variant="raised"
                  color="secondary"
                  onClick={this.submit}>
                  Log Keys
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

export default GetUserTagsCard;
export {GetUserTagsCard};
