import React from 'react';
import { render } from 'react-dom';
import {search} from '../../../actions/userActions'
import { connect } from 'react-redux';
import {isNullOrUndefined} from '../../../utils/utils'
import SearchResults from './search-results';

const initialState = {
    count: 0,
    data: []
};

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            param: '',
            users: initialState,
            searching: false
        };
        this.onSearch = this.onSearch.bind(this);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.clearResults();
        }
    }

    clearResults() {
        this.setState({users: initialState});
        this.setState({searching: false});
    }

    async onSearch(event) {
        this.setState({param: event.target.value});
        if (isNullOrUndefined(event.target.value)) {
            this.clearResults();
            return;
        }
        const users = await this.props.dispatch(search(event.target.value));
        this.setState({searching: true});
        this.setState({users: users});
    }

    render() {
        return (
            <div className="text-center col-4 position-relative" ref={this.setWrapperRef}>
                <input className="search-input" type="text"
                       value={this.state.param} onChange={this.onSearch}/>
                <SearchResults users={this.state.users} searching={this.state.searching}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state.user;
}

export default connect(mapStateToProps)(Search);