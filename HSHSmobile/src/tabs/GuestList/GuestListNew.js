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

import {Button, ButtonGroup} from 'react-native-elements';
const ageButtons = ['Young', 'Middle', 'Old'];
const genderButtons = ['Male', 'Female', 'Others'];

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
        this.state = {
            name: "",
            note: "",
            ageIndex: -1,
            genderIndex: -1
        };

        this.updateAgeIndex = this.updateAgeIndex.bind(this);
        this.updateGenderIndex = this.updateGenderIndex.bind(this)
    }

    submit = () => {
        if (this.state.ageIndex === -1 || this.state.genderIndex === -1) {
            alert("Please select ago and gender");
            return;
        }

        if (this.state.name === "") {
            alert("Please input name");
            return;
        }

        let gender = "";
        if (this.state.genderIndex === 0)
            gender = "M";
        else if (this.state.genderIndex === 1)
            gender = "F";
        else
            gender = "O";

        if (this.state.note === "") {
            this.setState({note: "N/A"})
        }

        this.props.addNewGuest(this.state.name, ageButtons[this.state.ageIndex], gender, this.state.note);
        this.props.navigator.pop({
            animated: true, // does the pop have transition animation or does it happen immediately (optional)
            animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
        });


    };

    updateAgeIndex (ageIndex) {
        this.setState({ageIndex})
    }

    updateGenderIndex (genderIndex) {
        this.setState({genderIndex})
    }

    render() {
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
                            onPress={(index) => this.updateAgeIndex(index)}
                            selectedIndex={ageIndex}
                            buttons={ageButtons}
                            containerStyle={{backgroundColor: "#770B16", height: 100}}
                            selectedButtonStyle={styles.selectedButton}
                            underlayColor="#770B16"
                            selectedTextStyle={styles.selectedText}
                            textStyle={{color: "#FFFFFF"}}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Text>Guest Gender</Text>
                        <ButtonGroup
                            onPress={(index) => this.updateGenderIndex(index)}
                            selectedIndex={genderIndex}
                            buttons={genderButtons}
                            containerStyle={{backgroundColor: "#770B16", height: 100}}
                            selectedButtonStyle={styles.selectedButton}
                            underlayColor="#770B16"
                            selectedTextStyle={styles.selectedText}
                            textStyle={{color: "#FFFFFF"}}
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
        marginTop: 10
    },
    inputView: {
        marginTop: 10
    },
    textStyle: {
        color:"#770B16",
        fontSize: 16,
    },
    selectedButton: {
        backgroundColor: "#770B16",
        color: "#770B16",
        borderColor: "#770B16",


    },
    selectedText: {
        color: "#770B16"
    }
});
