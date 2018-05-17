import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import Login from './components/login'
import Dashboard from './components/dashboard'

render(
    <MuiThemeProvider>
        <div>
            <Dashboard />
            <Login />
        </div>
    </MuiThemeProvider>,
    document.getElementById('root')
);