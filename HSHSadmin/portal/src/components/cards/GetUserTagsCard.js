import React, {Component} from 'react';
import * as firebase from 'firebase';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
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
    } = this.state;

    let getTags = firebase.functions().httpsCallable("getUserTags");
    getTags({email: email})
    .then((val) => {console.log(val);})
    .catch(err => {console.error(err);});
    event.preventDefault();
  }

  render() {
    const {
      email,
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
                  variant="contained"
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
