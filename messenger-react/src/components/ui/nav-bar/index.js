import React from 'react';
import { render } from 'react-dom';
import Search from '../../core/search'
import UserActions from '../../core/user'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navigation-bar nav-bar-color">
                <div className="row vertical-center">
                    <UserActions />
                    <div className="col-4">
                        My Title App
                    </div>
                    <Search />
                </div>
            </div>
        );
    }

}

export default NavBar;