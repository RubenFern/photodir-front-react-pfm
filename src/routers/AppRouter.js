import React from 'react';
import {  useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { PrivateRoute } from './PrivateRoutes';
import { AuthRoutes } from './AuthRoutes';
import { AdminRoute } from './AdminRoutes'

// Exporto las ruta de los componentes por legibilidad
import { routes } from './componentsRoutes';

const { LoginScreen, RegisterScreen, HomePage, AlbumPage, PhotoPage, HomeUserPage, AlbumUserPage, AdminPage, PhotoUserPage, AccountPage } = routes;

export const AppRouter = () => 
{
    const { logged, user: { is_admin = false } } = useSelector(state => state.auth);


    return (
        <Router>
            <>
                <Switch>
                    {
                    // Ruta protegidas dependiendo si el usuario está logueado o no
                    }
                    <AuthRoutes exact path='/login' isAuth={logged} isAdmin={is_admin} component={LoginScreen} />
                    <AuthRoutes exact path='/registro' isAuth={logged} isAdmin={is_admin} component={RegisterScreen} />

                    <PrivateRoute exact path="/home" isAuth={logged} component={HomePage} />
                    <PrivateRoute exact path="/home/perfil" isAuth={logged} component={AccountPage} />
                    <PrivateRoute exact path="/home/:album" isAuth={logged} component={AlbumPage} />
                    <PrivateRoute exact path="/home/:album/:photo" isAuth={logged} component={PhotoPage} />

                    <AdminRoute exact path="/panel" isAdmin={is_admin} component={AdminPage} />

                    {
                    // Rutas a la que puede acceder cualquier usuario
                    }
                    <Route exact path="/explore/:username" component={HomeUserPage} />
                    <Route exact path="/explore/:username/:album" component={AlbumUserPage} />
                    <Route exact path="/explore/:username/:album/:photo" component={PhotoUserPage} />

                    {
                    (is_admin) ? <Redirect to="/panel" /> : <Redirect to="/home" />
                    }
                </Switch>
            </>
        </Router>
    )
}
