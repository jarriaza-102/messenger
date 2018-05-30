import React from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import Paper from 'material-ui/Paper';
import ConversationCard from '../core/conversation-card';
import ConversationView from '../core/conversation-card/conversationView';
import {findAll} from '../../actions/conversationActions';

class Conversations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            selected: 0
        };
        this.getContent = this.getContent.bind(this);
        this.updateConversations = this.updateConversations.bind(this);
        this.getConversationView = this.getConversationView.bind(this);
    }

    async componentWillMount() {
        const response = await this.props.dispatch(findAll());
        this.setState({ list: response.data });
    }

    updateConversations (id) {
        this.setState({
            selected: id
        });
    }

    getContent() {
        if (this.state.list.length == 0) {
            return <h2>No Conversations</h2>
        }
        return (
            this.state.list.map((element) => {
                return <ConversationCard updateConversations={(id) => this.updateConversations(id)} selected={this.state.selected} conversation={element} key={element.id}/>;
            })
        );
    }

    getConversationView() {
        if (this.state.selected == 0) {
            return '';
        }

        return (
            <ConversationView conversation={this.getSelectedConversation()}/>
        );
    }

    getSelectedConversation() {
        for (var i=0;i<this.state.list.length; i++) {
            if (this.state.list[i].id === this.state.selected)
                return this.state.list[i];
        }
        return null;
    }

    render() {
        return (
            <div className={(this.state.selected > 0) ? "container-conversation-selected": ""}>
                <Paper zDepth={2} className={(this.state.selected > 0) ? "conversation-card-selected": ""}>
                    {this.getContent()}
                </Paper>
                {this.getConversationView()}
            </div>

        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        conversations: state.conversations
    };
}

export default connect(mapStateToProps)(Conversations);