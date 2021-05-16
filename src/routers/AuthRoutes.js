import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router';

export const AuthRoutes = ({isAuth, isAdmin, component: Component, ...rest}) => 
{
    if (isAuth && isAdmin)
    {
        // Si el usuario conectado es admin lo redirecciono al panel de administrador
        return (
            <Redirect to="/panel" />
        )
    } else if (isAuth)
    {
        // Si el usuario está conectado lo redirecciono a su home
        return (
            <Redirect to="/home" />
        )
    } else
    {
        // Si el usuario no está conectado entra al login o al registro
        return (
            <Route {...rest} component={ (props) => <Component {...props} /> } />
        )
    }
}

AuthRoutes.propTypes =
{
    isAuth: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}