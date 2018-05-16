import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import Login from './components/login/login'

render(
    <MuiThemeProvider>
        <Login />
    </MuiThemeProvider>,
    document.getElementById('root')
);