import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import Login from '../components/login'
import {history} from '../utils/history'

class NonLoggedNav extends React.Component {
    render () {
        return (
            <BrowserRouter history={history}>
                <Route exact path="/" component={Login} />
            </BrowserRouter>
        );
    }
}

export default NonLoggedNav;