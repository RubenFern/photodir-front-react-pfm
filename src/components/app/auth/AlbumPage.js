import React from 'react';

import { NavBar } from '../../layout/NavBar';
import { Album } from './Album/Album';

export const AlbumPage = () => 
{
    return (
        <>
            <NavBar />

            <Album />
        </>
    )
}