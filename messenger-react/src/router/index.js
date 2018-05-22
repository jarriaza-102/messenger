import React from 'react';
import { render } from 'react-dom';
import Logged from './logged';
import NonLogged from './non-logged';
import {isLoggedUser} from '../utils/utils'

class Router extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedUser: isLoggedUser()
        };
    }

    render() {
        if (!this.state.isLoggedUser) {
            return (
                <NonLogged />
            );
        }

        return (
            <Logged />
        );
    }
}

export default Router;