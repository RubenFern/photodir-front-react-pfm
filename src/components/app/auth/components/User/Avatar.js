import React from 'react';

import './Avatar.css';

export const Avatar = ({ user_name = '', image = '' }) => 
{
    return (
        <div className="avatar">
            { 
                (user_name !== '')
                &&
                <img className="circular-image" src={`http://localhost:3010/api/upload/avatar/${user_name}/${image}`} alt={image} />   
            }
        </div>
    )
}
