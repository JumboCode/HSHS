import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Button,
  TouchableHighlight,
  Animated,
} from 'react-native';

// Props: filterOptions: {age: {options: ['Old', 'Young', 'Middle'], color: 'rgba(119, 11, 22, 1)'}, gender: {options: ['F', 'M', "O"], color: '#4E84C4'}}
//        selectedFilters: {age: '', gender: ''}
//        onChange: newSelected => this.setState(newSelected)
//        showFilterPrompt: true
export default class GuestFilter extends Component {
  constructor(props) {
    super(props);
  }

  renderFilterButtons = (filterGroup, filterName) => {
    let selectedFilterName = this.props.selectedFilters[filterGroup];
    let color = this.props.filterOptions[filterGroup].color
    return (
      <View key={filterName} style={styles.buttonContainer}>
        <TouchableHighlight
          style = {[
            styles.button,
            {backgroundColor: (selectedFilterName == filterName ? color : 'transparent'),
              borderColor: color}]}
          underlayColor = {selectedFilterName == filterName ? 'white' : color}
          onPress = {() =>
            this.props.selectedFilters[filterGroup] == filterName ?
              this.props.onChange(Object.assign(this.props.selectedFilters, {[filterGroup]: ""})) :
              this.props.onChange(Object.assign(this.props.selectedFilters, {[filterGroup]: filterName}))
          }
          >
            <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style = {
                { textAlign: "center",
                color: selectedFilterName == filterName ? 'white' : color,
                fontSize: 12 }}>
                {filterName}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    };

    render() {
      let filterButtons = Object.keys(this.props.filterOptions).map(
        group => this.props.filterOptions[group].options.map(
          name => this.renderFilterButtons(group, name)
        )
      );

      return (
        <View
          style={{flexDirection: 'row', marginLeft: '1%', height: 70, justifyContent: 'space-between'}}
        >
          {this.props.showFilterPrompt && <View style={{justifyContent: 'center', alignItems: 'flex-start'}} >
            <Text style={{color: 'rgba(119, 11, 22, 1)', fontSize: 12}}> Filters: </Text>
          </View>}
          <View style={{flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-around'}}>
            {filterButtons}
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      height: 30,
      width: 45,
      marginLeft: '1%',
      marginRight: '1%',
      alignSelf: 'center',
    },
    button: {
      flex: 1,
      borderStyle: "solid",
      borderWidth: 1,
      borderRadius: 40,
    }
  });
