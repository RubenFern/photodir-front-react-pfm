import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route, useHistory } from 'react-router';

export const PrivateRoute = ({isAuth, isAdmin, component: Component, ...rest}) => 
{
    const history = useHistory();

    // Si es admin su home es el panel
    if (isAdmin)
    {
        history.replace('/panel');
    }

    return (
        <Route {...rest}
            component = 
            {
                (props) => (isAuth) ? (<Component {...props} />) : (<Redirect to="/login" />)
            }
        />
    )
}

PrivateRoute.propTypes =
{
    isAuth: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}