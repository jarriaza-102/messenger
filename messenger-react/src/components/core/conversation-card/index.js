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
                    <div className="photo">
                        <img src={this.props.conversation.img}/>
                    </div>
                    <div className="message">
                        <div className="col-12 conversation-person">{this.props.conversation.name}</div>
                        <div className="col-12 conversation-message">{this.props.conversation.message}</div>
                    </div>
                    <div className="actions">
                        <span>{this.props.conversation.sentOn}</span>
                    </div>
                </div>
                <Divider />
            </div>

        );
    }
}

export default ConversationCard;