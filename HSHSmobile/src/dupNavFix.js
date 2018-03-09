import React, { Component } from 'react';

function preventNavStackDuplicate(Component){
    return class PreventNavStackDuplicate extends React.Component {

        componentDidMount(){
             this.props.navigator.addOnNavigatorEvent(event => {
                 if (event.id === 'didDisappear') {
                    this._navigated = null
                }
             })
        }

        _navigated = null

        navigateTo = screenOptions => {
            if (!this._navigated) {
                this.props.navigator.push(screenOptions)
            }

            this._navigated = true
        }

        render(){
            return <Component {...this.props} navigateTo = {this.navigateTo} />
        }
    }
}

export default preventNavStackDuplicate;
