import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import { HomeScreen } from '../components/app/HomeScreen';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AppRouter = () => {
    return (
        <Router>
            <>
                <Switch>
                    <Route exact path='/' component={LoginScreen} />

                    <Route exact path='/registro' component={RegisterScreen} />

                    <Route exact path='/home/:usuario' component={HomeScreen} />

                    <Redirect to='/' />
                </Switch>
            </>
        </Router>
    )
}
