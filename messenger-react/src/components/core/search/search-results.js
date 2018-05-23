import React from 'react';
import {render} from 'react-dom';
import Paper from 'material-ui/Paper';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.getSearchOptions = this.getSearchOptions.bind(this);
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

    render() {
        if (this.props.users.count == 0 && !this.props.searching) {
            return '';
        }
        return (
            <div className="search-results">
                {this.props.users.data.map((user) => {
                    return (
                        <div className="search-container">
                            <Paper zDepth={2} style={getStyle(true)} key={user.id}>
                                <div className="col-3">
                                    Photo
                                </div>
                                <div className="col-9">
                                    <div className="text-left">
                                        {user.fullName}
                                    </div>
                                </div>
                            </Paper>
                            <div className="col-12 text-center search-result-expand">
                                Expand
                                <div className="pull-right expand-arrow">E</div>
                            </div>
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