import React from 'react';

import './Picture.css';

export const Picture = ({ path, image, avatar = false }) => 
{
    return (
        <img className={`${(avatar) ? 'circular-image' : 'preview rounded-3'}`} id="picture" src={path} alt={image} />
    )
}
