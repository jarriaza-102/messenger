import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import Login from '../components/login'

class NonLogged extends React.Component {
    render () {
        return (
            <BrowserRouter>
                <Route exact path="/" component={Login} />
            </BrowserRouter>
        );
    }
}

export default NonLogged;