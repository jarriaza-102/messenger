import React from 'react';
import { render } from 'react-dom';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

class ConversationCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="conversation-card">
                    <div className="photo">Photo</div>
                    <div className="message">Message</div>
                    <div className="actions">Actions</div>
                </div>
                <Divider />
            </div>

        );
    }
}

export default ConversationCard;