import React from 'react';
import { render } from 'react-dom';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {getLoggedUser} from '../../../utils/authUser';

class ConversationCard extends React.Component {
    constructor(props) {
        super(props);
        this.getUserPhoto = this.getUserPhoto.bind(this);
    }

    getUserPhoto() {
        if (this.props.conversation.photo === 'default') {
            let name = this.props.conversation.sender.split(' ');
            name = name[0].substr(0, 1) + name[1].substr(0, 1);
            return <Avatar style={{width: "75px", height: "75px"}}>{name}</Avatar>;
        }

        return <img src={this.props.conversation.photo} className="avatar" />
    }

    render() {
        let name = this.props.conversation.sender;
        if (this.props.conversation.senderid == getLoggedUser().user.id) {
            name = 'Me';
        }
        return (
            <div>
                <div className="conversation-card">
                    <div className="photo">
                        {this.getUserPhoto()}
                    </div>
                    <div className="message">
                        <div className="col-12 conversation-person">
                            {name}
                        </div>
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