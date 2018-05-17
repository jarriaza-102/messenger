import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Router from './router';
import './index.css';

render(
    <MuiThemeProvider  muiTheme={getMuiTheme(lightBaseTheme)}>
        <Router />
    </MuiThemeProvider>,
    document.getElementById('root')
);