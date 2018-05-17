import React from 'react';
import { render } from 'react-dom';

class Search extends React.Component {
    render() {
        return (
            <div className="row vertical-center">
                <div className="col-4 col-offset-4">
                    My Title App
                </div>
                <div className="text-center vertical-center col-4">
                    <input className="search-input" type="text"/>
                </div>
            </div>
        );
    }
}

export default Search;