import React from 'react';
import { NavLink } from 'react-router-dom';

//import './AlbumCard.css';

export const AlbumCardExplore = ({ uid, user_name, fileImage, name, description, creation_date }) => 
{
    return (
        <li key={uid} className="card">
            <p className="date">{creation_date}</p>
            <NavLink className="card-image" to={`/explore/${user_name}/${name}`}>
                <img className="pointer" src={fileImage} alt={fileImage} />
            </NavLink>
            <span className="card-description">
                <h2 className="title text-light">{name}</h2>
                <p className="text-justify">
                    {description}
                </p>
            </span>
        </li>
    )
}
