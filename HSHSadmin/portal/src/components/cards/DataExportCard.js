import React, {Component} from 'react';
import Card, {CardContent, CardActions} from 'material-ui/Card';
import Button from 'material-ui/Button';

class DataExportCard extends Component {
  constructor(props) {
    super(props);
  }

  exportData = () => {
    
  }

  render() {
    return(
      <Card style = {this.props.style}>
        <CardActions>
          <Button
            label="export_data"
            variant="raised"
            color="secondary"
            onClick={this.exportData}>
            Export Data
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default DataExportCard;
export {DataExportCard};
