import React from 'react';
import { Footer } from '../../layout/Footer';

import { NavBar } from '../../layout/NavBar';
import { Favorite } from './FavsImages/Favorite';

export const FavImageHome = () => 
{
    return (
        <>
            <NavBar />

            <Favorite />

            <Footer />
        </>
    )
}
