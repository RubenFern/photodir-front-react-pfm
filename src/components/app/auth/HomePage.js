import React from 'react';
import { Footer } from '../../layout/Footer';

import { NavBar } from '../../layout/NavBar';
import { Home } from './Home/Home';

export const HomePage = () => 
{
    return (
        <>
        <NavBar />

        <Home />

        <Footer />
        </>
    )
}