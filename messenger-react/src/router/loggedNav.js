import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from '../components/dashboard'

class LoggedNav extends React.Component {
    render () {
        return (
            <BrowserRouter>
                <Route exact path="/" component={Dashboard} />
            </BrowserRouter>
        );
    }
}

export default LoggedNav;