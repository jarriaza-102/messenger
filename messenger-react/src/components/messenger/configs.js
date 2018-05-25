import React from 'react';
import { render } from 'react-dom';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import ConfigurationCard from '../core/configuration-card';
import {isLoggedUser} from '../../utils/authUser';
import { Redirect } from 'react-router-dom';
import {
    LOGOUT_ACTION,
    VIEW_USER_PROFILE
} from '../../utils/actions';

class Configs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            configs: [
                {
                    id: 1,
                    name:  'My Profile',
                    action: VIEW_USER_PROFILE
                },
                {
                    id: 2,
                    name:  'This is not my profile'
                },
                {
                    id: 3,
                    name: 'Logout',
                    action: LOGOUT_ACTION
                }
            ],
            updateParent: false
        };
    }

    render() {
        if (!isLoggedUser()) {
            return (
                <Redirect to={{
                    pathname: "/login"
                }} />
            );
        }
        return (
            <div>
                <Paper zDepth={2}>
                    <div>
                        {this.state.configs.map((config) => {
                           return <ConfigurationCard updateParent={() => this.setState({updateParent: true})} config={config} key={config.id}/>;
                        })}
                        <Divider />
                    </div>
                </Paper>
            </div>
        );
    }
}

export default Configs;