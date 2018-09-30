import React, {Component} from 'react';
import Card, {CardContent, CardActions} from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

class SignupKeyCard extends Component {
  constructor(props) {
    super(props);
    this.state = { signupKey: "" }
  }

  componentDidMount() {
    let self = this;
    let keyRef = this.props.keyRef;
    keyRef.on('value', (snapshot) => {
      self.setState({
        signupKey: snapshot.val()
      });
    });
  }

  submit = () => {
    let keyRef = this.props.keyRef;
    keyRef.set(this.state.signupKey);
  }

  render() {
    const {signupKey} = this.state;
    return(
      <Card style = {this.props.style}>
        <CardContent>
          <TextField
            label= {this.props.label}
            value={signupKey}
            onChange={event => this.setState({signupKey : event.target.value})}
          />
        </CardContent>
        <CardActions>
          <Button
            label="chgKey"
            variant="raised"
            color="secondary"
            onClick={this.submit}>
            Change Key
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

export default SignupKeyCard;
export {SignupKeyCard};
