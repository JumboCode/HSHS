import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

class UserManagementCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Card style = {this.props.style}>
        <CardContent></CardContent>
      </Card>
    );
  }
}

export default UserManagementCard;
export {UserManagementCard};
