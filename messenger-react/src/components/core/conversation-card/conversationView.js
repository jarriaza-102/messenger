import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {getLoggedUser} from '../../../utils/authUser';
import {getAllByConversationId} from '../../../actions/messageActions';

class ConversationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    async componentWillMount() {
        const response = await this.props.dispatch(getAllByConversationId(this.props.conversation.id));
        this.setState({ messages: response.data });
    }


    render() {
        const logUserId = getLoggedUser().user.id;
        console.log(logUserId);
        return (
            <div className="conversation-view">
                <div className="title">
                    {this.props.conversation.sender}
                </div>
                <div className="body">
                    {this.state.messages.map((message) => {
                        return (
                            <div key={message.messageid}>
                                <div className={message.sender == logUserId ? "message-right" : "message-left"}>
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