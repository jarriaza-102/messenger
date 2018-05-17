import React from 'react';
import { render } from 'react-dom';
import Search from '../../core/search'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navigation-bar nav-bar-color">
                <Search />
            </div>
        );
    }

}

export default NavBar;