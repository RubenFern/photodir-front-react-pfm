import React from 'react';

import './Avatar.css';

export const Avatar = ({ user_name = '', image = '' }) => 
{
    return (
        <div className="avatar">
            { 
                (user_name !== '')
                &&
                <div 
                    className="image" 
                    style={{ backgroundImage: `url(http://localhost:3010/api/upload/avatar/${user_name}/${image})` }}>    
                </div>
            }
        </div>
    )
}
