import React from 'react';
import { NavLink } from 'react-router-dom';

export const PhotoCard = ({ photo, album }) => 
{
    const { uid, image, fileImage } = photo;

    return (
        <NavLink to={`/home/${album}/${image}`} className="gallery-item" key={uid}>
            <img 
                className="gallery-img" 
                src={fileImage} 
                alt={image}
            />
        </NavLink>
    )
}
