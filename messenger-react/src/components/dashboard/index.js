import React from 'react';
import { render } from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.consoleLog = this.consoleLog.bind(this);
    }

    handleToggle = () => this.setState({open: !this.state.open});

    consoleLog(event) {
        console.log(event);
    }

    render() {
        return (
            <div>
                <AppBar
                    title="Messenger"
                    iconElementLeft={
                        <div>
                            <RaisedButton
                                label="Toggle Drawer"
                                onClick={this.handleToggle}
                            />
                            <Drawer
                                docked={false}
                                width={200}
                                open={this.state.open}
                                onRequestChange={(open) => this.setState({open})}
                            >
                                <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
                                <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
                            </Drawer>

                        </div>
                    }
                    onLeftIconButtonClick={this.consoleLog}/>
                <h2>Hello World!</h2>reterrrrFfffffrr
            </div>
        );
    }

}

export default Dashboard;