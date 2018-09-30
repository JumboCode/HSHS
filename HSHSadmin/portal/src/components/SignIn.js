import React from 'react';
import { withRouter } from 'react-router-dom';
import {SignInCard} from './cards/SignInCard'

const SignInPage = ({ history }) =>
    <div style={
            {
                height: "100%",
                width: "100%",
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                //margin: '10% auto',
            }}>

        <SignInCard history = {history}/>
    </div>

export default withRouter(SignInPage);
