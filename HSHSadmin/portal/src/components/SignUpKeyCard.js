import React, {Component} from 'react';
import Card, {CardContent, CardActions} from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

class SignupKeyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupKey: this.props.signupKey,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signupKey !== this.state.signupKey) {
      this.setState({ signupKey: nextProps.signupKey });
    }
  }

  render() {
    const {signupKey} = this.state;
    return(
      <Card style = {this.props.style}>
        <CardContent>
          <form onSubmit = {this.submit}>
            <TextField
              label= {this.props.label}
              value={signupKey}
              onChange={event => this.setState({signUpKey : event.target.value})}
              placeholder={this.state.signupKey}
            />
            <br/>
            <br/>
            <Button
              label="chgKey"
              type="submit"
              variant="raised"
              color="secondary">
              Change Key
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

export default SignupKeyCard;
export {SignupKeyCard};
