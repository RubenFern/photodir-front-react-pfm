import React from 'react';

import './Picture.css';

export const Picture = ({ path, image, photo = false }) => 
{
    return (
        <img className="preview rounded-3" id="picture" src={path} alt={image} />
    )
}
