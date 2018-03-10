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

import {FormLabel, FormInput, FormValidationMessage, Button, ButtonGroup} from 'react-native-elements';

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
            name: "",
            note: "",
            ageIndex: -1,
            genderIndex: -1
        };

        this.updateAgeIndex = this.updateAgeIndex.bind(this)
        this.updateGenderIndex = this.updateGenderIndex.bind(this)
    }

    submit = () => {
        alert(this.state.name)
    };

    updateAgeIndex (ageIndex) {
        this.setState({ageIndex})
    }

    updateGenderIndex (genderIndex) {
        this.setState({genderIndex})
    }

    render() {
        const ageButtons = ['Young', 'Middle', 'Old'];
        const genderButtons = ['Male', 'Female', 'Others'];
        const { ageIndex, genderIndex } = this.state;

        return (
            <ScrollView style={styles.wrapper}>
                <View style={styles.firstView}>
                    <View style={styles.inputView}>
                        <Text>Guest Name</Text>
                        <TextInput
                            placeholder={"Please input name"}
                            placeholderTextColor={"#770B16"}
                            onChangeText={(name) => this.setState({name})}
                            borderBottomColor="#770B16"
                            borderBottomWidth={1}
                            style={styles.textStyle}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Text>Guest Age</Text>
                        <ButtonGroup
                            onPress={this.updateAgeIndex}
                            selectedIndex={ageIndex}
                            buttons={ageButtons}
                            containerStyle={{height: 100}}
                            selectedButtonStyle={styles.sellected}
                            underlayColor="#770B16"
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Text>Guest Gender</Text>
                        <ButtonGroup
                            onPress={this.updateGenderIndex}
                            selectedIndex={genderIndex}
                            buttons={genderButtons}
                            containerStyle={{height: 100}}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Text>Guest Note</Text>
                        <View>
                            <TextInput
                                placeholder={"Please add notes"}
                                placeholderTextColor={"#770B16"}
                                onChangeText={(note) => this.setState({note})}
                                borderBottomColor="#770B16"
                                borderBottomWidth={1}
                                multiline={true}
                                style={styles.textStyle}
                            />
                        </View>
                    </View>
                    <View style={{marginTop: 20, marginBottom: 20}}>
                        <Button
                            small
                            backgroundColor="#770B16"
                            onPress={this.submit}
                            title='Submit'/>
                    </View>
                </View>
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
    horiButtonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    },
    submitButton: {
        backgroundColor: "rgba(92, 99,216, 1)",
        width: 300,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },
    wrapper: {
        flex: 1,
    },
    submitView: {
        position: 'absolute',
        bottom: 40,
    },
    firstView: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 50
    },
    inputView: {
        marginTop: 10
    },
    textStyle: {
        color:"#770B16",
        fontSize: 16,
    },
    sellected: {
        backgroundColor: "#770B16",
    }
});
