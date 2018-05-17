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

const style = {
    marginTop: '30px'
};

class NavTabs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Tabs className="nav-tabs">
                    <Tab icon={<ActionHome />} className="nav-bar-color">
                        <Container class="container-tabs">
                            <Conversations className="container" />
                        </Container>
                    </Tab>
                    <Tab icon={<SocialPeople />} className="nav-bar-color">
                        <Container class="container-tabs">
                            <Groups className="container" />
                        </Container>
                    </Tab>
                    <Tab icon={<ActionSettings />} className="nav-bar-color">
                        <Container class="container-tabs">
                            <Configs className="container" />
                        </Container>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default NavTabs;