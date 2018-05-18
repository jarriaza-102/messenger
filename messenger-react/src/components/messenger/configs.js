import React from 'react';
import { render } from 'react-dom';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import ConfigurationCard from '../core/configuration-card';

class Configs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            configs: [
                {
                    id: 1,
                    name:  'My Profile'
                },
                {
                    id: 2,
                    name:  'This is not my profile'
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <Paper zDepth={2}>
                    <div>
                        {this.state.configs.map((config) => {
                           return <ConfigurationCard config={config} key={config.id}/>;
                        })}
                        <Divider />
                    </div>
                </Paper>
            </div>
        );
    }
}

export default Configs;