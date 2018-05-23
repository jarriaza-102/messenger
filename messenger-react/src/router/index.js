import React from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import Login from '../components/login';
import Dashboard from '../components/dashboard';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import DefaultRoute from './defaultRoute';

class Router extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <PublicRoute path="/login" component={Login} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                </div>
            </BrowserRouter>
        );
    }
}

export default connect()(Router);