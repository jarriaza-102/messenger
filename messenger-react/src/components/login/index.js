import React from 'react';
import { render } from 'react-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {isNullOrUndefined} from '../../utils/utils';
import {login} from '../../actions/userActions'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import Error from '../error'
import {logUser} from '../../utils/authUser'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessages: [],
            isLoggedUser: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value})
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (!this.isValid()) return;
        const response = await this.props.dispatch(login(this.state.email, this.state.password));
        if (!response.data) {
            this.setState({ errorMessages: response.errors });
            return;
        }
        logUser(response.data);
        this.setState({ isLoggedUser: true });
    }

    isValid() {
        return !isNullOrUndefined(this.state.email) && !isNullOrUndefined(this.state.password);
    }

    render() {
        if (this.state.isLoggedUser) {
            return (
                <Redirect to={{
                    pathname: "/dashboard"
                }} />
            );
        }
        return (
            <div className="login-container">
                {this.state.errorMessages.map( (error) => {
                    return <Error error={error.error} key={error.index}/>;
                })}
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        id="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        floatingLabelText="Email"
                        fullWidth={true}
                    />
                    <TextField
                        id="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        floatingLabelText="Password"
                        type="password"
                        fullWidth={true}
                    />
                    <div className="text-center">
                        <RaisedButton label="Login" primary={true} type="submit"/>
                    </div>
                </form>

            </div>
        );
    };
}

function mapStateToProps(state) {
    return state.authentication;
}


export default withRouter(connect(mapStateToProps)(Login));