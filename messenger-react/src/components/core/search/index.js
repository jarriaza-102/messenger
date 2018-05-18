import React from 'react';
import { render } from 'react-dom';

class Search extends React.Component {
    render() {
        return (
            <div className="text-center vertical-center col-4">
                <input className="search-input" type="text"/>
            </div>
        );
    }
}

export default Search;