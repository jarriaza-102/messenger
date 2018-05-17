import React from 'react';
import { render } from 'react-dom';

class Search extends React.Component {
    render() {
        return (
            <div className="row vertical-center">
                <div className="col-3 col-offset-3">
                    My Title App
                </div>
                <div className="text-center vertical-center col-3">
                    <input className="search-input" type="text"/>
                </div>
            </div>
        );
    }
}

export default Search;