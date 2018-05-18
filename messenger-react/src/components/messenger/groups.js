import React from 'react';
import { render } from 'react-dom';
import Paper from 'material-ui/Paper';

class Groups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    id: 1,
                    img: 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
                    name:  'Abner Juarez',
                    message: 'Hola Mundo',
                    sentOn: '9:04 PM',
                    status: 1
                },
                {
                    id: 2,
                    img: 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
                    name:  'Abner Juarez 2',
                    message: 'Hola Mundo X2',
                    sentOn: '9:04 PM',
                    status: 1
                },
                {
                    id: 3,
                    img: 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
                    name:  'Abner Juarez 3',
                    message: 'Hola Mundo X3',
                    sentOn: '9:04 PM',
                    status: 1
                }
            ]
        }
    }

    render () {
        return (
            <div>
                <Paper zDepth={2}>
                    {this.state.list.map((element) => {
                        return <h3 key={element.id}>This is a group {element.name}</h3>;
                    })}
                </Paper>
            </div>
        );
    }

}

export default Groups;