import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

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
            variant="contained"
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
