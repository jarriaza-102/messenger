import React from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import Paper from 'material-ui/Paper';
import ConversationCard from '../core/conversation-card';
import {findAll} from '../../actions/conversationActions';

class Conversations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        this.getContent = this.getContent.bind(this);
    }

    async componentWillMount() {
        const response = await this.props.dispatch(findAll());
        this.setState({ list: response.data });
        console.log(response);
    }

    getContent() {
        if (this.state.list.length == 0) {
            return <h2>No Conversations</h2>
        }
        return (
            this.state.list.map((element) => {
                return <ConversationCard conversation={element} key={element.id}/>;
            })
        );
    }

    render() {
        return (
            <div>
                <Paper zDepth={2}>
                    {this.getContent()}
                </Paper>
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