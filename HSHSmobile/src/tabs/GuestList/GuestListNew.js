/*
 *
 *
 *
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    Alert,
    Picker,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import {addNewGuest} from '../../redux/actions.js';

import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import ModalDropdown from 'react-native-modal-dropdown';

// Dropdown fields
const age_list = [
    {
        label: '',
        value: ''
    },
    {
        label: 'Old',
        value: 'Old'
    },
    {
        label: 'Middle',
        value: 'Middle'
    },
    {
        label: 'Young',
        value: 'Young'
    },
];

const genders = [
    {
        label: '',
        value: ''
    },
    {
        label: 'Male',
        value: 'M'
    },
    {
        label: 'Female',
        value: 'F'
    },
    {
        label: 'Other',
        value: '/'
    },
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
 * NewGuest: props- none i think
 * Represents the complete view containing a form to input new guests
 * formInput is a dictionary containing information about the guest
 * For new form validation, add a [field]Error entry to the state and update
 * it in register() if the current formInput entry is not up to par.
 * TODO make it a scrollview
 */
class NewGuest extends Component<{}> {
    constructor(props) {
        super(props);
        this.formInput = {
            name: '',
            description: '',
            gender: 'M',
            age: 'Middle',
            actionItems: [],
            interactions: []
        };
        this.state = {
            nameError: '',
            genderError: '',
            ageError: ''
        }
    }


    register(form) {
        const nameError = (form.name == '' ? 'Required Field' : '')
        const genderError = (form.gender == '' ? 'Required Field' : '')
        const ageError = (form.age == '' ? 'Required Field' : '')

        this.setState({
            nameError, genderError, ageError
        })

        if (!nameError && !genderError && !ageError) {
            let timestamp =
                this.props.addNewGuest(form.name, form.age, form.gender,
                    form.description);
            this.props.navigator.pop({
                animated: true, // does the pop have transition animation or does it happen immediately (optional)
                animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
            });
        }
    }

    render() {
        return (
            <ScrollView style={{flex: 1, flexDirection: 'column', padding: 10}}>
                <FormInputField
                    label={'Name'}
                    ref={input => this.input = input}
                    onChangeText={(text) => this.formInput.name = text}
                    error={this.state.nameError}
                />
                <PickerFormField
                    label="Age"
                    value={this.formInput.age}
                    onValueChange={(selected) => this.formInput.age = selected}
                    error={this.state.ageError}
                    items={age_list}/>
                <PickerFormField
                    label="Gender"
                    value={this.formInput.gender}
                    onValueChange={(selected) => this.formInput.gender = selected}
                    error={this.state.genderError}
                    items={genders}/>
                <FormLabel>Description</FormLabel>
                <FormInput
                    ref={input => this.input = input}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => this.formInput.description = text}
                />
                <Button
                    style={{height: 50}}
                    onPress={() => this.register(this.formInput)}
                    title="Submit"
                />
            </ScrollView>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewGuest)


/*
 * FormInputField: props- label string
 *                        error string empty when no error
 *                        editable bool if you can edit forminput
 *                        onChangeText function (text) => { do something w it}
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
                <FormInput
                    onChangeText={this.props.onChangeText}
                    editable={this.props.editable}
                    value={this.props.value}/>
                {this.error()}
            </View>
        );
    }
}

/*
 * PickerFormField - a FormField that triggers a Picker modal to populate field
 * props: label string - label for FormField
 *        value string - initial value for form field & picker (should be value w/in items)
 *        onValueChange fn - (selected) => do something with selected
 *        error string - used in FormField for validation (in parent state)
 *        items array  - [{label: STRING, value:STRING} ...] of picker items
 * TODO figure out how to not take up whole page, maybe change styling
 * TODO maybe put into own file
 */
export class PickerFormField extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {modalVisible: false, pickerVal: this.props.value}
    }

    render() {
        if (Platform.OS === "android") {
            return (
                <View>
                    <FormLabel>{this.props.label}</FormLabel>
                    <Picker
                        selectedValue={this.props.value || (this.state && this.state.pickerVal)}
                        onValueChange={(val) => {
                            this.setState({pickerVal: val});
                            this.props.onValueChange(val);
                        }}
                    >
                        {this.props.items.map((i, index) => (
                            <Picker.Item key={index} label={i.label} value={i.value}/>
                        ))}
                    </Picker>
                </View>
            );
        } else {
            const selectedItem = this.props.items.find(
                i => i.value === this.state.pickerVal
            );
            const selectedLabel = selectedItem ? selectedItem.label : "";

            return (
                <View>
                    <TouchableOpacity
                        onPress={() => this.setState({
                            modalVisible: true
                        })}
                    >
                        <FormInputField
                            label={this.props.label}
                            ref={input => this.input = input}
                            editable={false}
                            value={selectedLabel}
                            error={this.props.error}
                        />
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        style={{margin: 4}}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => this.setState({modalVisible: false})}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.buttonContainer}>
                                    <Text
                                        style={{color: "blue"}}
                                        onPress={() => this.setState({modalVisible: false})}
                                    >
                                        Done
                                    </Text>
                                </View>
                                <View>
                                    <Picker
                                        selectedValue={(this.state && this.state.pickerVal)}
                                        onValueChange={(val) => {
                                            this.setState({pickerVal: val});
                                            this.props.onValueChange(val);
                                        }}
                                    >
                                        {this.props.items.map((i, index) => (
                                            <Picker.Item
                                                key={index}
                                                label={i.label}
                                                value={i.value}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        ...Platform.select({
            ios: {
                borderBottomColor: "gray",
                borderBottomWidth: 1
            }
        })
    },
    input: {
        height: 40
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "#ffffff"
    },
    buttonContainer: {
        justifyContent: "flex-end",
        flexDirection: "row",
        padding: 4,
        backgroundColor: "#ececec"
    }
});
