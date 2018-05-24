import React from 'react';
import {render} from 'react-dom';
import Divider from 'material-ui/Divider';
import {connect} from 'react-redux';
import {logoutAuthUser} from '../../../utils/authUser';
import {logout} from '../../../actions/userActions';
import {
    LOGOUT_ACTION,
    CUSTOM_ACTION,
    VIEW_USER_PROFILE
} from '../../../utils/actions';

class ConfigurationCard extends React.Component {
    constructor(props) {
        super(props);
        this.action = this.action.bind(this);
        this.logout = this.logout.bind(this);
    }

    async action() {
        switch (this.props.config.action) {
            case LOGOUT_ACTION: {
                await this.logout();
                break;
            }
            case VIEW_USER_PROFILE: {
                break;
            }
            case CUSTOM_ACTION: {
                this.props.action();
                break;
            }
        }
        this.props.updateParent();
    }

    async logout() {
        await this.props.dispatch(logout());
        logoutAuthUser();
    }

    render() {
        return (
            <div>
                <div className="configuration-card" onClick={this.action}>
                    <span>{this.props.config.name}</span>
                </div>
                <Divider />
            </div>

        );
    }
}

function mapStateToProps(state) {
    return state.user;
}

export default connect(mapStateToProps)(ConfigurationCard);