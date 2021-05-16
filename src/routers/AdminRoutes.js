import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router';

export const AdminRoute = ({isAdmin, component: Component, ...rest}) => 
{
    // Almaceno la última página visitada
    //localStorage.setItem('lastPage', rest.location.pathname);

    return (
        <Route {...rest}
            component = 
            {
                (props) => (isAdmin) ? (<Component {...props} />) : (<Redirect to="/login" />)
            }
        />
    )
}

AdminRoute.propTypes =
{
    isAdmin: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}