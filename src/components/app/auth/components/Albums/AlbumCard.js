import React from 'react';
import { NavLink } from 'react-router-dom';

import './AlbumCard.css';
import { DeleteComponent } from './DeleteComponent';
import { EditComponent } from './EditComponent';

export const AlbumCard = ({ uid, user_name, image, name, description, creation_date }) => 
{
    return (
        <div className="alb-card">
            <NavLink to={`/home/${name}`}>
                <img className="img" src={`http://localhost:3010/api/upload/album/${user_name}/${image}`} alt={image} />
            </NavLink>
            <div className="mt-3 d-flex flex-column justify-content-around">
                <h4 className="text-light">{ name }</h4>
                <p className="text-grey">
                    { description }
                </p>
                <div className="d-flex w-100 flex-column justify-content-md-around align-items-center foot">
                    <p className="text-grey">{creation_date}</p>
                    
                    <div className="d-flex justify-content-around w-100">
                        <EditComponent action="Editar" image={image} name={name} description={description} uid={uid} creation_date={creation_date} />
                        <DeleteComponent action="Eliminar" image={image} name={name} description={description} uid={uid} creation_date={creation_date} />
                    </div>
                </div>
            </div>
            
        </div >
    )
}
