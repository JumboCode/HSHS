// Defines a simple popup dialog with a TextInput prompt and two buttons:
// Submit and Cancel.
// Props include: ref - {(dialog) => this.popupname = dialog} <- for component use in parent
//                title - a string
//                placeholder - textinput placeholder string
//                defaultValue - for the textinput
//                onCancel - {() => {}}
//                onSubmit - {(val) => {}}
// TODO: figure out why the popup is so BIG
// Example usage:
// <PopupDialog
//  ref={(dialog) => {this.popupDialog = dialog; }}
//   title="Say something"
//   placeholder="Start typing"
//   defaultValue="Hello"
//   onCancel={ () => this.setState({
//     promptVisible: false,
//     message: "You cancelled"
//   }) }
//   onSubmit={ (value) => this.setState({
//     promptVisible: false,
//     message: `You said "${value}"`
//   }) }/>

// To open the popup, for example with a button use:
// <Button title="open popup" onPress={() => this.popupDialog.show(); }
// TODO: figure out buttons/styling
import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    Button
} from 'react-native';
import { List, ListItem, SearchBar, CheckBox } from "react-native-elements";
import PopupDialog, {DialogTitle, DialogButton} from 'react-native-popup-dialog';
import {enterWinners} from '../../redux/actions.js';


class PromptDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {input: ""}

    };

    // calls show() fn of PopupDialog
    show(onShown: ?Function) {
        this.popupDialog.show();
    }

    onSubmit = () => {
      this.popupDialog.dismiss();
      //this.props.onSubmit(this.state.input);
    }
    onCancel = () => {
      this.popupDialog.dismiss();
    }

    render() {
        return (
            <PopupDialog
                dialogStyle={{ position: 'absolute', top: "40%", width: '80%', height: 100 }}
                dialogTitle={<DialogTitle title={this.props.title}/>}
                ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            >
                <View style={styles.container}>
                  <TextInput
                    {...this.props}
                    style={styles.textInput}
                    onChangeText={(input) => this.setState({input})}
                    value={this.state.input}
                  />
                  <View style={styles.buttonContainer}>
                    <Button onPress={this.onCancel} title={"Cancel"}/>
                    <Button onPress={this.onSubmit} title={"Submit"}/>
                  </View>
                </View>
            </PopupDialog>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor: 'white',
      borderRadius: 8
    },
    buttonContainer: {
      marginBottom: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center',
      width: "80%",
    },
    title: {
      fontWeight:'bold'
    },
    text: {
      fontSize: 15,
    },
    textInput: {
      marginTop: 5,
      marginBottom: 5,
      height: 40,
      width: "80%",
      borderColor: 'gray',
      borderWidth: 1
    },
});

export default PromptDialog;
