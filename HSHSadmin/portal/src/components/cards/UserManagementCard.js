import React, {Component} from 'react';
import Card, {CardContent, CardActions} from 'material-ui/Card';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';

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
