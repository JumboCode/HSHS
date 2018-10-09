import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
            variant="contained"
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
