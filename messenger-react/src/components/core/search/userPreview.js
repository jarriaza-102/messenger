import React from 'react';
import {render} from 'react-dom';
import IconButton from 'material-ui/IconButton';
import CommunicationMessage from 'material-ui/svg-icons/communication/message';
import PlacesSmokingRooms from 'material-ui/svg-icons/places/smoking-rooms';
import SocialPerson from 'material-ui/svg-icons/social/person';
import SocialShare from 'material-ui/svg-icons/social/share';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import {isNullOrUndefined} from '../../../utils/utils';
import { connect } from 'react-redux';
import {send} from '../../../actions/messageActions';

class UserPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message: '',
        };
        this.viewUserProfile = this.viewUserProfile.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.requestPeda = this.requestPeda.bind(this);
        this.share = this.share.bind(this);
        this.closeSendMessageModal = this.closeSendMessageModal.bind(this);
        this.getMessageDialog = this.getMessageDialog.bind(this);
        this.sendMessageToUser = this.sendMessageToUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    viewUserProfile() {
        console.log(this.props.user);
    }

    sendMessage() {
        this.setState({open: true});
        console.log('send message');
    }

    closeSendMessageModal = () => {
        this.setState({open: false});
    };

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value})
    }

    getMessageDialog() {
        const actions = [
            <RaisedButton
                label="Cancel"
                onClick={this.closeSendMessageModal}
            />,
            <RaisedButton
                label="Send"
                primary={true}
                style={{marginLeft: "12px"}}
                keyboardFocused={true}
                onClick={this.sendMessageToUser}
            />
        ];
        return (
            <Dialog
                title="Send Message"
                titleClassName="dialog-title"
                actions={actions}
                modal={false}
                open={this.state.open}
                autoScrollBodyContent={true}
            >
                <div>
                    <Chip>{this.props.user.fullName}</Chip>
                </div>
                <br/>
                <TextField
                    multiLine={true}
                    name="message"
                    id="message"
                    value={this.state.message}
                    onChange={this.handleChange}
                    underlineShow={false}
                    style={{border: "1px solid lightgray", width: "95%", padding: "8px"}}
                    textareaStyle={{marginTop: "0px", fontSize: "15px"}}
                    rows={3}
                    rowsMax={5}
                />
            </Dialog>
        );
    }

    async sendMessageToUser() {
        if (isNullOrUndefined(this.state.message)) return;
        const message = {
            slave: this.props.user.id,
            messageType: 1,
            message: this.state.message
        };
        await this.props.dispatch(send(message));
        this.setState({
            message: '',
            open: false
        });
    }

    requestPeda() {
        console.log('request peda');
    }

    share() {
        console.log('share');
    }

    render() {
        if (this.props.expandUserId !== this.props.user.id) {
            return (
                <div className="cursor-pointer" onClick={this.viewUserProfile}>
                    <div className="col-3">
                        {this.props.getUserPhoto(this.props.user, '50px')}
                    </div>
                    <div className="col-9">
                        <div className="text-left">
                            {this.props.user.fullName}
                        </div>
                    </div>
                    <div className="clear-both"></div>
                </div>
            );
        }

        return (
            <div>
                <div className="preview">
                    <div className="col-12 text-center separator bordered">
                        <div className="user-photo cursor-pointer" onClick={this.viewUserProfile}>
                            {this.props.getUserPhoto(this.props.user, '75px')}
                            <div className="clear-both"></div>
                        </div>
                    </div>
                    <div className="col-12 text-center user-name separator">
                        <span className="cursor-pointer"
                              onClick={this.viewUserProfile}>{this.props.user.fullName}</span>
                    </div>
                    <div className="col-12 text-center">
                        <div className="col-2 pull-none inline-block">
                            <IconButton tooltip="View Profile" onClick={this.viewUserProfile}>
                                <SocialPerson />
                            </IconButton>
                        </div>
                        <div className="col-2 pull-none inline-block">
                            <IconButton tooltip="Send Message" onClick={this.sendMessage}>
                                <CommunicationMessage />
                            </IconButton>
                        </div>
                        <div className="col-2 pull-none inline-block">
                            <IconButton tooltip="A Pistear" onClick={this.requestPeda}>
                                <PlacesSmokingRooms />
                            </IconButton>
                        </div>
                        <div className="col-2 pull-none inline-block">
                            <IconButton tooltip="Share" onClick={this.share}>
                                <SocialShare />
                            </IconButton>
                        </div>
                    </div>
                    <div className="clear-both"></div>
                </div>
                {this.getMessageDialog()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state.message;
}

export default connect(mapStateToProps)(UserPreview);