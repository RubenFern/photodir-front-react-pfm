import React from 'react';

import { AddComponent } from '../helpers/AddComponent';
import { Avatar } from './Avatar';

import './InfoUser.css';

export const InfoUser = ({ user, numAlbums }) => 
{
    const { name, user_name, image, creation_date } = user;

    return (
        <div className="d-flex container flex-column flex-md-row justify-content-between align-items-center">
            <div className="d-flex">
                <div>
                    <Avatar user_name={user_name} image={image} />
                </div>
                <div className="ms-3 d-flex flex-column justify-content-center">
                    <h3 className="text-light fw-bold">{ user_name }</h3>
                    <h5 className="text-grey-cs">{ name }</h5>
                    <h4 className="text-grey-cs">{ numAlbums } { (numAlbums > 1) ? "ábumes creados" : "álbum creado" }</h4>
                </div>
            </div>
            
            <AddComponent action="Crear Álbum" />
        </div>
    )
}
