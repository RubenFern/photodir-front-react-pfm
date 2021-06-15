import React from 'react';

import { NavBar } from '../../layout/NavBar';
import { Photo } from './Photos/Photo';

import './PhotoItem.css';

export const PhotoPage = () => 
{
    return (
        <>
            <NavBar />

            <Photo />
        </>
    )
}
