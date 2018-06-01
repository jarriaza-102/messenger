import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {getLoggedUser} from '../../../utils/authUser';
import {getAllByConversationId} from '../../../actions/messageActions';
import {getSocket} from '../../../socket';
import ImageImage from 'material-ui/svg-icons/image/image';
import IconButton from 'material-ui/IconButton';
import TextareaAutosize from 'react-autosize-textarea';
import {send} from '../../../actions/messageActions';
import {isNullOrUndefined} from '../../../utils/utils';

class ConversationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            message: '',
            isEnterPressed: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.onTextAreaKeyPress = this.onTextAreaKeyPress.bind(this);
        this.setConversationMessages(this.props);
    }

    componentWillReceiveProps(nextProps, nextState) {
        console.log('Receive props');
        this.setConversationMessages(nextProps);
    }

    setConversationMessages(props) {
        props.dispatch(getAllByConversationId(props.conversation.id))
            .then( (response) => {
                this.setState({
                    messages: response.data
                });
                const objDiv = document.getElementById('conversation-body');
                objDiv.scrollTop = objDiv.scrollHeight;
                this.state.isEnterPressed = false;
            });
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    async onTextAreaKeyPress(event) {
        const key = event.which || event.keyCode;
        if ( (event.shiftKey && key == 13 )|| key != 13) {
            return;
        }
        event.preventDefault();
        if (!this.state.isEnterPressed) {
            await this.sendMessage();
            return;
        }
    }

    async sendMessage() {
        if (isNullOrUndefined(this.state.message)) return;
        this.state.isEnterPressed = true;
        await this.props.dispatch(send({
            slave: this.props.conversation.sendto,
            messageType: 1,
            message: this.state.message
        }));
        this.setState({
            message: ''
        });
        this.setConversationMessages(this.props);
    }

    render() {
        getSocket().on('receivedMessage', (data) => {
            this.setConversationMessages(this.props);
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
                    <div className="message-to-send-container">
                        <TextareaAutosize
                            rows={1}
                            maxRows={3}
                            className="message-to-send"
                            value={this.state.message}
                            onChange={this.handleChange}
                            onKeyPress={this.onTextAreaKeyPress}
                            name="messageToSend"
                        />
                    </div>
                    <div className="message-send-action">
                        <IconButton>
                            <ImageImage />
                        </IconButton>
                    </div>
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