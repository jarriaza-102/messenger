import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {getLoggedUser} from '../../../utils/authUser';
import {getAllByConversationId} from '../../../actions/messageActions';
import {getSocket} from '../../../socket';

class ConversationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    componentWillMount() {
        this.setConversationMessages();
    }

    componentWillUnmount() {
        console.log('Going away');
    }

    setConversationMessages() {
        this.props.dispatch(getAllByConversationId(this.props.conversation.id))
            .then( (response) => {
                this.setState({ messages: response.data });
                const objDiv = document.getElementById('conversation-body');
                objDiv.scrollTop = objDiv.scrollHeight;
            });
    }


    render() {
        getSocket().on('receivedMessage', (data) => {
            console.log('messages');
            this.setConversationMessages();
        });

        return (
            <div className="conversation-view">
                <div className="title">
                    {this.props.conversation.sender}
                </div>
                <div className="body" id="conversation-body">
                    {this.state.messages.map((message) => {
                        return (
                            <div key={message.messageid}>
                                <div className={message.sender == getLoggedUser().user.id ? "message-right" : "message-left"}>
                                    {message.message}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="footer">
                    Footer
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        messages: state.messages
    };
}

export default connect(mapStateToProps)(ConversationView);