import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import { deleteAlbum, getAlbums } from '../../../redux/actions/admin';

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

    const removeAlbum = (name, image) =>
    {
        Swal.fire(
        {
            title: `Eliminar álbum del usuario ${username}`,
            text: 'Se eliminará el álbum y todas sus fotografías ¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            focusCancel: true
        }).then( (res) =>
        {
            if (res.isConfirmed) 
            {
                dispatch(deleteAlbum({ user_name: username, album: name, image }));
            }
        });
    }

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

                    <i className="bi bi-trash-fill text-danger delete bottom" onClick={ () => removeAlbum(name, image) }></i>
                </span>
            </li>
        ))         
        }
        </ul>
    )
}
