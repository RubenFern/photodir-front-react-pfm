import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { getAlbums } from '../../../redux/actions/admin';

export const Albums = () => 
{
    // Monto el componente
    const mounted = useRef(true);

    const dispatch = useDispatch();

    const { username } = useParams();
    const albums = useSelector(state => state.album);

    useEffect(() => 
    {
        if (mounted.current)
        {
            // Realizo las peticiones para obtener la información de usuario
            dispatch(getAlbums(username));
        }
        
        console.log("albums del usuario2")

        return () => 
        {
            mounted.current = false;
        }

    }, [dispatch, username]);


    return (
        <ul className="container-fluid card-list animate__animated animate__fadeIn">
        {
        albums.map( ({ uid, name, fileImage, image, description, creation_date }) => 
        (
            <li key={uid} className="card">
                <p className="date">{creation_date}</p>
                <NavLink className="card-image" to={`/panel/usuarios/${username}/${name}`}>
                    <img className="pointer" src={fileImage} alt={image} />
                </NavLink>
                <span className="card-description">
                    <h2 className="title text-light">{name}</h2>
                    <p className="text-justify">
                        {description}
                    </p>
                </span>
            </li>
        ))         
        }
        </ul>
    )
}
