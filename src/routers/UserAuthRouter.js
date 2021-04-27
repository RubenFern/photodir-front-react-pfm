import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { HomePage } from '../components/app/auth/HomePage';
import { ImagesPage } from '../components/app/auth/ImagesPage';

export const UserAuthRouter = () => 
{
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/home" component={HomePage} />
                    <Route exact path="/home/imagenes" component={ImagesPage} />

                    <Redirect to='/home' />
                </Switch>
            </div>
        </Router>
    )
}
