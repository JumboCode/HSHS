//
// Starter for the Resource page
//

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

class ResourceCategory extends Component {
    constructor(props) {
        super(props);
    }

    renderAccordionHeader(d) {
        return (
            <View>
                <Text>{d.name}</Text>
            </View>
        );
    }

    // Same thing, but renders the body/open view
    renderAccordionContent(linkData) {
        return (
            <View
                onPress={}
            >
                {linkData.description}
            </View>
        );
    }

    render() {

        return(
            <Accordion
                sections={this.props.links}
                renderHeader={this.renderAccordionHeader}
                renderContent={this.renderAccordionContent}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }
});

export default ResourceCategory
