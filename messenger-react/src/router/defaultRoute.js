import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isLoggedUser} from '../utils/authUser';

const DefaultRoute = ({ component: Component, ...rest }) => (
    <Route
        render={props =>
            isLoggedUser() ? (
                <Redirect
                    to={{
                        pathname: "/dashboard",
                        state: { from: props.location }
                    }}
                />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);
export default DefaultRoute;