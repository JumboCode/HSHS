import React, {Component} from 'react';
import * as firebase from 'firebase';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const fileDownload = require('js-file-download');

//Converts an array of objects to a csv file s.t. all objects have the same attributes.
const objCSV = (data) => {
  const keys = (data[0] ? Object.keys(data[0]) : []);
  const replacer = (key, value) => {
    if (value === null || value === undefined) return '';
    else if (Array.isArray(value)) return '[]';
    else return value;
  }
  const rows = data.map(row => keys.map((fieldName, i) => {
    const s = JSON.stringify(row[fieldName], replacer);
    return s.replace(',', ';');
  }).join(','));
  rows.unshift(keys.join(','));
  return rows.join('\r\n');
};

class DataExportCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: "guests"
    }
  }

  exportData = () => {
    firebase.database().ref('/' + this.state.dataset).once('value').then((snapshot) => {
      fileDownload(objCSV(Object.values(snapshot.val())), this.state.dataset + '.csv');
    })
  }

  render() {
    return(
      <Card style = {this.props.style}>
        <CardContent>
          <FormControl>
            <InputLabel htmlFor="age-native-simple">Data Source</InputLabel>
            <Select
              native
              value={this.state.dataset}
              onChange={(event) => {this.setState({dataset: event.target.value})}}
              inputProps={{
                name: 'datasource',
                id: 'datasource-native-simple',
              }}
            >
              <option value={"guests"}>Guests</option>
              <option value={"actionItems"}>Action Items</option>
              <option value={"completedActionItems"}>Completed Action Items</option>
              <option value={"interactions"}>Interactions</option>
            </Select>
          </FormControl>
        </CardContent>
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
