import React from 'react';
import { render } from 'react-dom';
import Divider from 'material-ui/Divider';

class ConfigurationCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="configuration-card">
                    <p>{this.props.config.name}</p>
                </div>
                <Divider />
            </div>

        );
    }
}

export default ConfigurationCard;