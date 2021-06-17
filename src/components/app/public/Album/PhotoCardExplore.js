import React from 'react';
import { NavLink } from 'react-router-dom';

import './PhotoCard.css';

export const PhotoCardExplore = ({ uid, album, image, fileImage, user_name }) => 
{
    return (
        <>
        <NavLink to={`/explore/${user_name}/${album}/${image}`} className="gallery-item" key={uid}>
            <img 
                className="gallery-img" 
                src={fileImage} 
                alt={fileImage}
            />
        </NavLink>
        </>
    )
}
