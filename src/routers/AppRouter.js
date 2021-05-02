import React from 'react';
import {  useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { PrivateRoute } from './PrivateRoutes';
import { AuthRoutes } from './AuthRoutes';

// Exporto las ruta de los componentes por legibilidad
import { routes } from './componentsRoutes';
const { LoginScreen, RegisterScreen, HomePage, ImagesPage, HomeUserPage, ImagesUserPage } = routes;

export const AppRouter = () => 
{
    const { logged } = useSelector(state => state.auth);


    return (
        <Router>
            <>
                <Switch>
                    {
                        // Ruta protegidas dependiendo si el usuario está logueado o no
                    }
                    <AuthRoutes exact path='/login' isAuth={logged} component={LoginScreen} />
                    <AuthRoutes exact path='/registro' isAuth={logged} component={RegisterScreen} />

                    <PrivateRoute exact path="/home" isAuth={logged} component={HomePage} />
                    <PrivateRoute exact path="/home/imagenes" isAuth={logged} component={ImagesPage} />

                    {
                    // Rutas a la que puede acceder cualquier usuario
                    }
                    <Route exact path="/home/:username" component={HomeUserPage} />
                    <Route exact path="/home/:username/imagenes" component={ImagesUserPage} />

                    <Redirect to="/home" />
                </Switch>
            </>
        </Router>
    )
}
