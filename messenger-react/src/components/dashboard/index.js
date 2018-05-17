import React from 'react';
import { render } from 'react-dom';
import NavBar from '../ui/nav-bar'
import NavTabs from '../ui/nav-tabs';

class Dashboard extends React.Component{
    render() {
        return (
            <div>
                <NavBar />
                <NavTabs />
            </div>
        );
    }

}

export default Dashboard;