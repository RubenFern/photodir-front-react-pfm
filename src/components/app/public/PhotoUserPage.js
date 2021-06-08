import React from 'react';
import { useParams } from 'react-router';
import { NavBar } from '../../layout/NavBar';

import { Photo } from './Photo/Photo';

import './../auth/PhotoItem.css';

export const PhotoUserPage = () => 
{
    const { username, photo } = useParams();

    return (
        <>
            <NavBar />
            
            <div className="container">
                <Photo user_name={username} photo={photo} />
            </div>
        </>
    )
}
