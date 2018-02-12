//
// Starter for the Resource page
//

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button
} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';


// Resource data JSON spec-
// [{
//    categoryName: "Emergency Shelters",
//    links: [
//      {
//        name: "Dry Men's shelter",
//        description: "dummy information about link",
//        link: "www.fake.com/fake"
//      },
//    ...]
// }, {}, ...]
//


class Resources extends Component {
    constructor(props) {
        super(props);

        this.linkData = [{categoryName: "Emergency Shelters",
                          links: [
                              {name: "Dry Men's shelter",description: "dummy information about link",
                                  link: "www.fake.com/fake"},
                              {name: "Dry Womens's shelter",description: "dummy information about link",
                                  link: "www.fake.com/fake"},
                              {name: "Late Night Men's shelter",description: "dummy information about link",
                                  link: "www.fake.com/fake"},
                              {name: "Late Night Women's shelter",description: "dummy information about link",
                                  link: "www.fake.com/fake"},
                                  ]
                        },
                        {categoryName: "Permanent Housing",
                            links: [
                                {name: "Furniture",description: "dummy information about link",
                                    link: "www.fake.com/fake"},
                                {name: "Market Rate Appartment",description: "dummy information about link",
                                    link: "www.fake.com/fake"},
                                {name: "Private Subsidized Housing",description: "dummy information about link",
                                    link: "www.fake.com/fake"},
                                {name: "Public Housing",description: "dummy information about link",
                                    link: "www.fake.com/fake"},
                            ]
                        },
            {categoryName: "Permanent Housing",
                links: [
                    {name: "Furniture",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Market Rate Appartment",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Private Subsidized Housing",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Public Housing",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                ]
            },
            {categoryName: "Permanent Housing",
                links: [
                    {name: "Furniture",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Market Rate Appartment",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Private Subsidized Housing",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Public Housing",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                ]
            },
            {categoryName: "Permanent Housing",
                links: [
                    {name: "Furniture",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Market Rate Appartment",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Private Subsidized Housing",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Public Housing",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                ]
            },
        ];
    }



    // Passed to the Accordion component to render the header/closed accordion
    // view
    _renderAccordionHeader(d) {
      return (
        <View>
          <Text>{d.categoryName}</Text>
        </View>
      );
    }

    // Same thing, but renders the body/open view
    _renderAccordionContent(d) {
      return (
        <List>
          {d.links.map((linkData) => <Text key={linkData.name}>{linkData.name}</Text>)}
        </List>
      );
    }

    _renderCategoryButton(d){
        return (
            <View>
                <Button
                    title={d.categoryName}
                    color="#841584"
                />
            </View>
        );
    }

    render() {

        const categories = [];
        this.linkData.forEach((category) => {
            categories.push(
                this._renderCategoryButton(category)
            );
        });

        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex : 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                    {categories}
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

export default Resources
