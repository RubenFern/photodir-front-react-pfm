import React from 'react';
import { NavLink } from 'react-router-dom';

export const PhotoCard = ({ uid, album, image, fileImage }) => 
{
    return (
        <NavLink to={`/home/${album}/${image}`} className="gallery-item" key={uid}>
            <img 
                className="gallery-img" 
                src={fileImage} 
                alt={fileImage}
            />
        </NavLink>
    )
}
