import React from 'react';

import { NavBar } from '../../layout/NavBar';
import { Home } from './Home/Home';

export const HomePage = () => 
{
    //const reload = useSelector(state => state.reload);
    return (
        <>
        <NavBar />

        <Home />
        </>
    )
}