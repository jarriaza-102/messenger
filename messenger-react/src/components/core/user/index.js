import React from 'react';
import { render } from 'react-dom';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class UserActions extends React.Component {
    render() {
        return(
            <div className="col-4">
                <IconMenu
                    iconButtonElement={
                        <FloatingActionButton>
                            <ContentAdd />
                        </FloatingActionButton>
                    }
                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                    <MenuItem primaryText="Refresh" />
                    <MenuItem primaryText="Send feedback" />
                    <MenuItem primaryText="Settings" />
                    <MenuItem primaryText="Help" />
                    <MenuItem primaryText="Sign out" />
                </IconMenu>
            </div>
        );
    }
}

export default UserActions;