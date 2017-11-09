import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    Alert,
    Picker,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import {addNewGuest} from './redux/actions.js';

import { FormLabel, FormInput } from 'react-native-elements'
import ModalDropdown from 'react-native-modal-dropdown';

const age_list = [
  'OLD', 'MIDDLE', 'YOUNG'
];
const tattoos = [
  'true', 'false'
];
const genders = [
    'MALE', 'FEMALE', 'OTHER'
];
const hair_colors = [
  'BLONDE','BROWN','BLACK','GRAY','WHITE','BALD',
];


function mapStateToProps(state, ownProps) {
    return {
        data: state.guest_info,
        loading: state.loading
    };
}

function mapDispatchToProps(dispath, ownProps) {
    return {
        addNewGuest: addNewGuest
    };
}


class NewGuest extends Component<{}> {
    constructor(props) {
        super(props);

        this.state = {}
        this.formInput = {name: '', description: '', gender: '', hairColor: '',
                        isTattooed: '', age: '', actionItems: [], interactions: []}
    }

    render () {
        return (
            <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
                <FormLabel>Name</FormLabel>
                <FormInput
                    ref= {input => this.input = input}
                    onChangeText= {(text) => this.formInput.name = text}
                />
                <FormLabel>Description</FormLabel>
                <FormInput
                    ref= {input => this.input = input}
                    multiline = {true}
                    numberOfLines = {4}
                    onChangeText= {(text) => this.formInput.description = text}
                />
                <FormLabel>Gender</FormLabel>
                <ModalDropdown options={genders}
                    onSelect={(index, value) => this.formInput.gender = value}>
                </ModalDropdown>
                <ModalDropdown options={hair_colors}
                    onSelect={(index, value) => this.formInput.hairColor = value}>
                </ModalDropdown>
                <ModalDropdown options={age_list}
                    onSelect={(index, value) => this.formInput.age = value}>
                </ModalDropdown>
                <ModalDropdown options={tattoos}
                    onSelect={(index, value) => this.formInput.isTattooed =
                                      (value == 'true' ? true : false)}>
                </ModalDropdown>
                <PickerField />
                <Button
                    style={{height: 50}}
                    onPress={() => { //Alert.alert(this._jsonOutput());
                        let form = this.formInput;
                        //this.props.addNewGuest(this.state.name, this.state.birthdate, this.state.gender, this.state.other);
                        this.props.addNewGuest(form.name, form.age, form.gender,
                                                form.hairColor, form.isTattooed,
                                                form.description, [], []);
                        this.props.navigator.pop({
                            animated: true, // does the pop have transition animation or does it happen immediately (optional)
                            animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
                        }); }}
                    title="Submit"
                />
            </View>
        );
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGuest)

export class PickerField extends Component<{}> {
    constructor(props){
        super(props)
        this.state = {modalVisible: false}
    }

    render() {
        return(
          <View>
          <TouchableOpacity
            onPress={test => {
              console.log("help");
            }}
          >
            <FormLabel>Test</FormLabel>
            <FormInput
              placeholder="Select Test"
              editable={false}
              onChangeText={test => {
                this.setState({ test });
              }}
              value={this.props.value}
            />
          </TouchableOpacity>

          </View>
        );
    }
}

//https://streetsmartdev.com/creating-form-select-component-in-react-native/

// potential updates for the modals
//  <TouchableOpacity
            //   onPress={() => this.setState({ modalVisible: true })}
            // >
  //             <TextInput
  //               style={styles.input}
  //               editable={false}
  //               placeholder="Select language"
  //               onChangeText={searchString => {
  //                 this.setState({ searchString });
  //               }}
  //               value={selectedLabel}
  //             />
  //           </TouchableOpacity>
// class DropdownFormField extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {modalVisible: false, selectedValue: ''}
//     }
//     render() {
//         return (
//         <ModalDropdown
//             options ={this.props.options}
//
//         </ModalDropdown>
//         );
//     }
// }
//
// onSelect={(idx, val) => this.setState({selectedValue: val})}>
// <TouchableOpacity
//     onPress={() => this.setState({ modalVisible: true }) } >
//
// </TouchableOpacity>
