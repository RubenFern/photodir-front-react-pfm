import React, { useContext } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { AuthContext } from '../components/auth/AuthContext';
import { LoginScreen } from '../components/login/LoginScreen';
import { RegisterScreen } from '../components/login/RegisterScreen';
import { PrivateRoute } from './PrivateRoutes';
import { AuthRoutes } from './AuthRoutes';
import { UserAuthRouter } from './UserAuthRouter';
import { HomeUserPage } from '../components/app/public/HomeUserPage';
import { ImagesUserPage } from '../components/app/public/ImagesUserPage';


export const AppRouter = () => 
{

    const {user: {logged}} = useContext(AuthContext);

    return (
        <Router>
            <>
                <Switch>
                    <AuthRoutes exact path='/login' isAuth={logged} component={LoginScreen} />
                    <AuthRoutes exact path='/registro' isAuth={logged} component={RegisterScreen} />

                    <PrivateRoute path='/home' isAuth={logged} component={UserAuthRouter} />

                    {// Rutas a la que puede acceder cualquier usuario
                    }
                    <Route exact path="/explore/:username" component={HomeUserPage} />
                    <Route exact path="/explore/:username/imagenes" component={ImagesUserPage} />

                    <Redirect to="/home" />
                </Switch>
            </>
        </Router>
    )
}
