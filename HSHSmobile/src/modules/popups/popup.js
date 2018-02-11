import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import renderSeperator from "../UI/renderSeperator"

export default class Popup extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isVisible: false,
        content: false,
      };
  }

  _renderButton = (text, isDisabled, onPress) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      >
      <View style={isDisabled ? styles.disabledButton : styles.button}>
        {<Text>{text}</Text>}
      </View>
    </TouchableOpacity>
  );

  show(onShown: ?Function) {
    this.setState({ isVisible: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          isVisible={this.state.isVisible}
          animationIn="fadeIn"
          animationOut="fadeOut"
          onShow={this.props.onShow}
          >
          <View style={styles.modalContent}>
            <View style={styles.modalTitle}>
              <Text style={styles.titleText}>{this.props.title}</Text>
            </View>
            {renderSeperator()}
            {this.props.children}
            {renderSeperator()}
            <View style={styles.modalButtons}>
              {this._renderButton("Cancel", false, () => {this.setState({ isVisible: false }); this.props.onCancel()})}
              {this._renderButton("Confirm", this.props.confimDisable, () => {this.setState({ isVisible: false }); this.props.onConfirm()})}
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

import { StyleSheet } from "react-native";

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  disabledButton: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    opacity: 0.3
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalTitle: {
    margin: 12,
    padding: 0,
    justifyContent: "flex-start",
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: "white",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 0
  }
});
