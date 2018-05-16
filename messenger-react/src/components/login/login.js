import React from 'react';
import { render } from 'react-dom';
import TextField from 'material-ui/TextField';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    };

    render() {
        return (
            <div className="container">
                <TextField
                    floatingLabelText="Email"
                />
            </div>
        );
    };
}

export default Login;