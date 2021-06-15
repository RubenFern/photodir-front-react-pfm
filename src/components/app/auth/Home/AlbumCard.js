import React from 'react';
import { NavLink } from 'react-router-dom';

import { Delete } from './Delete';
import { Edit } from '../components/Edit';

import './AlbumCard.css';

export const AlbumCard = ({ album }) => 
{
    const { uid, image, fileImage, name, description, creation_date } = album;

    return (
        <>
            <p className="date">{creation_date}</p>
            <NavLink className="card-image" to={`/home/${name}`}>
                <img className="pointer" src={fileImage} alt={fileImage} />
            </NavLink>
            <span className="card-description">
                <h2 className="title text-light">{name}</h2>
                <p className="text-justify">
                    {description}
                </p>
                
                <div className="d-flex justify-content-end w-100 bottom mb-2">
                    <div>
                        <Edit image={image} fileImage={fileImage} name={name} description={description} uid={uid} creation_date={creation_date} />
                    </div>
                    <div className="mx-3">
                        <Delete image={image} fileImage={fileImage} name={name} description={description} uid={uid} creation_date={creation_date} />
                    </div>
                </div>
            </span>
        </>
    )
}
