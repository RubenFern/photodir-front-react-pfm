import React from 'react';

import './Picture.css';

export const Picture = ({ path, image, photo = false }) => 
{
    return (
        <div className="picture">
            <img className={`${(photo) ? "photo" : "image" }`} id="picture" src={path} alt={image} />
        </div>
    )
}
