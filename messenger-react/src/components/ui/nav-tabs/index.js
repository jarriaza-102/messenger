import React from 'react';
import {render} from 'react-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
import Container from '../container';
import Conversations from '../../messenger/conversations';
import Groups from '../../messenger/groups';
import Configs from '../../messenger/configs';
import ActionHome from 'material-ui/svg-icons/action/home';
import SocialPeople from 'material-ui/svg-icons/social/people';
import ActionSettings from 'material-ui/svg-icons/action/settings';

class NavTabs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Tabs className="nav-tabs" inkBarStyle={getStyle()}>
                    <Tab style={getStyle(0)} icon={<ActionHome />} className="nav-bar-color">
                        <Container class="container-tabs">
                            <Conversations className="container" />
                        </Container>
                    </Tab>
                    <Tab style={getStyle(1)} icon={<SocialPeople />} className="nav-bar-color">
                        <Container class="container-tabs">
                            <Groups className="container" />
                        </Container>
                    </Tab>
                    <Tab style={getStyle(2)} icon={<ActionSettings />} className="nav-bar-color">
                        <Container class="container-tabs">
                            <Configs className="container" />
                        </Container>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

function getStyle(left) {
    const response = {
        position: "fixed",
        bottom:"0",
        zIndex: 1
    };
    if (!left) {
        return response;
    }
    response.left = (left * 33.3) + '%';
    return response
}

export default NavTabs;