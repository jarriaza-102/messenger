import React from 'react';
import {render} from 'react-dom';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import Avatar from 'material-ui/Avatar';
import UserPreview from './userPreview';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandUserId: 0
        };
        this.getSearchOptions = this.getSearchOptions.bind(this);
        this.expandUserCard = this.expandUserCard.bind(this);
        this.getExpandIcon = this.getExpandIcon.bind(this);
        this.getUserPhoto = this.getUserPhoto.bind(this);
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

    expandUserCard(id) {
        if (this.state.expandUserId === id) id = 0;
        this.setState({
            expandUserId: id
        });
    }

    getUserPhoto(user, size) {
        if (user.photo === 'default') {
            let name = user.fullName.split(' ');
            name = name[0].substr(0, 1) + name[1].substr(0, 1);
            return <Avatar style={{width: size, height: size}}>{name}</Avatar>;
        }

        return <img src={user.photo} className="avatar" />
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
                                <UserPreview getUserPhoto={this.getUserPhoto} user={user} expandUserId={this.state.expandUserId}/>
                            </Paper>
                            <RaisedButton
                                fullWidth={true}
                                icon={<div className="expand-arrow">{this.getExpandIcon(user.id)}</div>}
                                className="text-center search-result-expand"
                                onClick={() => this.expandUserCard(user.id)}
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