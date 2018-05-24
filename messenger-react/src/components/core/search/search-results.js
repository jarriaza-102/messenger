import React from 'react';
import {render} from 'react-dom';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import CommunicationMessage from 'material-ui/svg-icons/communication/message';
import PlacesSmokingRooms from 'material-ui/svg-icons/places/smoking-rooms';
import SocialPerson from 'material-ui/svg-icons/social/person';
import SocialShare from 'material-ui/svg-icons/social/share';
import IconButton from 'material-ui/IconButton';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandUserId: 0
        };
        this.getSearchOptions = this.getSearchOptions.bind(this);
        this.onClick = this.onClick.bind(this);
        this.getUserCard = this.getUserCard.bind(this);
        this.getExpandIcon = this.getExpandIcon.bind(this);
    }

    getSearchOptions() {
        if (this.props.users.count == 0 && this.props.searching) {
            return (
                <Paper zDepth={2} style={getStyle()} key={this.props.users.count + 1}>
                    There are no results...
                </Paper>
            );
        }
        if (this.props.users.count < 4) {
            return '';
        }
        return (
            <Paper zDepth={2} style={getStyle()} key={this.props.users.count + 1}>
                More Results...
            </Paper>
        );
    }

    onClick(id) {
        if (this.state.expandUserId === id) id = 0;
        this.setState({
            expandUserId: id
        });
    }

    getUserCard(user) {
        if (this.state.expandUserId !== user.id) {
            return (
                <div>
                    <div className="col-3">
                        Photo
                    </div>
                    <div className="col-9">
                        <div className="text-left">
                            {user.fullName}
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div className="preview">
                    <div className="col-12 text-center separator bordered">
                        <div className="user-photo">
                            Photo
                        </div>
                    </div>
                    <div className="col-12 text-center user-name separator">
                        {user.fullName}
                    </div>
                    <div className="col-12 text-center">
                        <div className="col-2 pull-none inline-block">
                            <IconButton tooltip="View Profile">
                                <SocialPerson />
                            </IconButton>
                        </div>
                        <div className="col-2 pull-none inline-block">
                            <IconButton tooltip="Send Message">
                                <CommunicationMessage />
                            </IconButton>
                        </div>
                        <div className="col-2 pull-none inline-block">
                            <IconButton tooltip="A Pistear">
                                <PlacesSmokingRooms />
                            </IconButton>
                        </div>
                        <div className="col-2 pull-none inline-block">
                            <IconButton tooltip="Share">
                                <SocialShare />
                            </IconButton>
                        </div>
                    </div>
                    <div className="clear-both"></div>
                </div>
            </div>
        );
    }

    getExpandIcon(id) {
        return (this.state.expandUserId !== id) ? <NavigationExpandMore /> : <NavigationExpandLess />;
    }

    render() {
        if (this.props.users.count == 0 && !this.props.searching) {
            return '';
        }
        return (
            <div className="search-results">
                {this.props.users.data.map((user) => {
                    return (
                        <div className="search-container" key={user.id}>
                            <Paper zDepth={2} style={getStyle(true)}>
                                {this.getUserCard(user)}
                            </Paper>
                            <RaisedButton
                                fullWidth={true}
                                icon={<div className="expand-arrow">{this.getExpandIcon(user.id)}</div>}
                                className="text-center search-result-expand"
                                onClick={() => this.onClick(user.id)}
                            />
                        </div>
                    );
                })}
                {this.getSearchOptions()}
            </div>
        );
    }
}

function getStyle(isResult) {
    return {
        padding: "10px",
        paddingBottom: "0px",
        minHeight: isResult ? "60px" : "30px",
        zIndex: 2
    };
}

export default SearchResults;