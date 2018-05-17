import React from 'react';
import { render } from 'react-dom';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import ConversationCard from '../core/conversation-card';

class Conversations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                1,
                2,
                3,
                4
            ]
        }
    }

    render() {
        return (
            <div>
                <Paper zDepth={2}>
                    {this.state.list.map((element) => {
                        return <ConversationCard key={element}/>;
                    })}
                </Paper>
            </div>

        );
    }
}

export default Conversations;