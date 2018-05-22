import React from 'react';
import { render } from 'react-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {isNullOrUndefined} from '../../utils/utils';
import {login, loadUsers} from '../../actions/userActions'
import Error from '../error'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessages: []
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
        console.log('submit');
        const lala = await loadUsers();
        console.log(lala);
        const user = await login(this.state.email, this.state.password);
        console.log(user);
        if (!user.data) {
            this.setState({ errorMessages: user.errors });
            return;
        }
        console.log('correctly');
    }

    isValid() {
        return !isNullOrUndefined(this.state.email) && !isNullOrUndefined(this.state.password);
    }

    render() {
        return (
            <div className="login-container">
                <Error errors={this.state.errorMessages}/>
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

export default Login;