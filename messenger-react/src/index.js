import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Router from './router';
import './index.css';

const store = configureStore();

render(
    <Provider store={store}>
        <MuiThemeProvider  muiTheme={getMuiTheme(lightBaseTheme)}>
            <Router />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);