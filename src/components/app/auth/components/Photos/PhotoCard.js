import React from 'react';
import { NavLink } from 'react-router-dom';

export const PhotoCard = ({ uid, album, image, fileImage, user_name, home = false }) => 
{
    return (
        <NavLink to={(home) ? `/home/${album}/${image}` : `/explore/${user_name}/${album}/${image}`} className="gallery-item" key={uid}>
            <img 
                className="gallery-img" 
                src={fileImage} 
                alt={fileImage}
            />
        </NavLink>
    )
}
