/*
 * 
 *
 *
 */
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

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import ModalDropdown from 'react-native-modal-dropdown';

// Dropdown fields
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

// Redux functions
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

/*
 * FormInputField: props- label string
 *                        error string empty when no error
 * Defines a Form Field that allows for validation errors to be set by the
 * parent. In this case, error is a prop set to the parent's state.nameError
 * On form submit, the validation fn changes the state if its not properly set.
 */
class FormInputField extends Component {
  error() {
    if (this.props.error) {
      return <FormValidationMessage>{this.props.error}</FormValidationMessage>
    }
    return null
  }

  render() {
    return (
      <View>
        <FormLabel>{this.props.label}</FormLabel>
        <FormInput />
        {this.error()}
      </View>
    );
  }
}

/*
 * NewGuest: props- none i think
 * Represents the complete view containing a form to input new guests
 * formInput is a dictionary containing information about the guest
 * For new form validation, add a [field]Error entry to the state and update
 * it in register() if the current formInput entry is not up to par.
 */
class NewGuest extends Component<{}> {
    constructor(props) {
        super(props);
        this.formInput = {name: '', description: '', gender: '', hairColor: '',
                        isTattooed: '', age: '', actionItems: [], interactions: []}
        this.state = { nameError: ''}
    }


    register(form) {
      const nameError = (form.name == '' ? 'Required Field' : '')

      this.setState({nameError: nameError})

      if (!nameError) {
        this.props.addNewGuest(form.name, form.age, form.gender,
                                form.hairColor, form.isTattooed,
                                form.description, [], []);
        this.props.navigator.pop({
            animated: true, // does the pop have transition animation or does it happen immediately (optional)
            animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
        });
      }
    }

    render () {
        return (
            <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
                <FormInputField
                    label={'Name'}
                    ref= {input => this.input = input}
                    onChangeText= {(text) => this.formInput.name = text}
                    error={this.state.nameError}
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
                <Button
                    style={{height: 50}}
                    onPress={() => this.register(this.formInput)}
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




/*
 * Code in development to create a form field that uses a Picker. Currently
 * doesn't work on iOS. Working on it. -Chase 11/8/17
 */
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
