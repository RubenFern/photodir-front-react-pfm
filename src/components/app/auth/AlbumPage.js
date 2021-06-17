import React from 'react';
import { Footer } from '../../layout/Footer';

import { NavBar } from '../../layout/NavBar';
import { Album } from './Album/Album';

export const AlbumPage = () => 
{
    return (
        <>
            <NavBar />

            <Album />

            <Footer />
        </>
    )
}