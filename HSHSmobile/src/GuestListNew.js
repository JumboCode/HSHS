import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    Alert,
    Picker
} from 'react-native';

import { FormLabel, FormInput } from 'react-native-elements'


export default class NewGuest extends Component<{}> {
    constructor(props) {
        super(props);

        this.state = {}
        this.formInput = {name: '', description: '', initialNote: '', receptiveness: ''}
    }

    render () {
        return (
            <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
                <FormLabel>Name</FormLabel>
                <FormInput
                    ref= {input => this.input = input}
                    multiline = {true}
                    numberOfLines = {4}
                    onChangeText= {(text) => this.formInput.name = text}
                />
            </View>
            /*
                <TextInput
                    placeholder="Description"
                    onChangeText=  {(text) => this.formInput.description = text;
                    }
                />
                <TextInput
                    style={{height: 40}}
                    placeholder="Type anything else!"
                    onChangeText=  {(text) => this.setState({other: text})}
                />
                <Picker
                    selectedValue={(this.state && this.state.gender) || 'm'}
                    onValueChange={(value) => {
                        this.setState({gender: value});
                    }}>
                    <Picker.Item label={'Male'} value={'m'} />
                    <Picker.Item label={'Female'} value={'f'} />
                    <Picker.Item label={'Non-Binary'} value={'nb'} />
                    <Picker.Item label={'Other'} value={'o'} />
                </Picker>
                <Button
                    style={{height: 50}}
                    onPress={() => { //Alert.alert(this._jsonOutput());
                        console.log(this._jsonOutput());
                        this.props.navigator.pop({
                            animated: true, // does the pop have transition animation or does it happen immediately (optional)
                            animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
                        }); }}
                    title="Submit"
                />
            </View>
            */
        );
    }


}

/*
This is a view i use in a test app,
very useful to list all the use cases

/*
import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,ScrollView,
} from 'react-native';


import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';

export class FormView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      formData:{}
    }
  }
  handleFormChange(formData){
    /*
    formData will contain all the values of the form,
    in this example.

    formData = {
    first_name:"",
    last_name:"",
    gender: '',
    birthday: Date,
    has_accepted_conditions: bool
    }


    this.setState({formData:formData})
    this.props.onFormChange && this.props.onFormChange(formData);
  }
  handleFormFocus(e, component){
    //console.log(e, component);
  }
  openTermsAndConditionsURL(){

  }
  render(){
    return (<ScrollView keyboardShouldPersistTaps={true} style={{paddingLeft:10,paddingRight:10, height:200}}>
      <Form
        ref='registrationForm'
        onFocus={this.handleFormFocus.bind(this)}
        onChange={this.handleFormChange.bind(this)}
        label="Personal Information">
        <Separator />
        <InputField
          ref='first_name'
          label='First Name'
          placeholder='First Name'
          helpText={((self)=>{

            if(Object.keys(self.refs).length !== 0){
              if(!self.refs.registrationForm.refs.first_name.valid){
                return self.refs.registrationForm.refs.first_name.validationErrors.join("\n");
              }

            }
            // if(!!(self.refs && self.refs.first_name.valid)){
            // }
          })(this)}
          validationFunction={[(value)=>{
            /*
            you can have multiple validators in a single function or an array of functions


            if(value == '') return "Required";
            //Initial state is null/undefined
            if(!value) return true;
            // Check if First Name Contains Numbers
            var matches = value.match(/\d+/g);
            if (matches != null) {
                return "First Name can't contain numbers";
            }

            return true;
          }, (value)=>{
            ///Initial state is null/undefined
            if(!value) return true;
            if(value.indexOf('4')!=-1){
              return "I can't stand number 4";
            }
            return true;
          }]}
          />
        <InputField ref='last_name' placeholder='Last Name'/>
        <InputField
          multiline={true}
          ref='other_input'
          placeholder='Other Input'
          helpText='this is an helpful text it can be also very very long and it will wrap' />
        <Separator />
        <LinkField label="test test test" onPress={()=>{}}/>
        <SwitchField label='I accept Terms & Conditions'
          ref="has_accepted_conditions"
          helpText='Please read carefully the terms & conditions'/>
        <PickerField ref='gender'
          label='Gender'
          options={{
            "": '',
            male: 'Male',
            female: 'Female'
          }}/>
          <DatePickerField ref='birthday'
          minimumDate={new Date('1/1/1900')}
          maximumDate={new Date()}
          placeholder='Birthday'/>
        <TimePickerField ref='alarm_time'
      placeholder='Set Alarm'/>
        <DatePickerField ref='meeting'
          minimumDate={new Date('1/1/1900')}
          maximumDate={new Date()} mode="datetime" placeholder='Meeting'/>
        </Form>
        <Text>{JSON.stringify(this.state.formData)}</Text>

      </ScrollView>);
    }
  }
*/
