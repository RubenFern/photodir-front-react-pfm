import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReportImage } from '../components/ReportImage';

//import './AlbumCard.css';

export const AlbumCardExplore = ({ uid, user_name, image, fileImage, name, description, creation_date }) => 
{
    return (
        <li key={uid} className="card">
            <p className="date">{creation_date}</p>
            <NavLink className="card-image" to={`/explore/${user_name}/${name}`}>
                <img className="pointer" src={fileImage} alt={image} />
            </NavLink>
            <span className="card-description">
                <h2 className="title text-light">{name}</h2>
                <p className="text-justify">
                    {description}
                </p>

                <div className="d-flex justify-content-end w-100 bottom mb-2">
                    <ReportImage category='album' image={image} user_reported={user_name} />
                </div>
            </span>
        </li>
    )
}
