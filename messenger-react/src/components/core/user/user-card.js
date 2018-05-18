import React from 'react';
import { render } from 'react-dom';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class UserCard extends React.Component {
    render() {
        return(
            <IconButton><MoreVertIcon /></IconButton>
        );
    }
}

export default UserCard;