import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deletePhoto, getPhotos } from '../../../redux/actions/admin';

import './Photo.css';

export const Photos = () => 
{
    // Monto el componente
    const mounted = useRef(true);

    const dispatch = useDispatch();

    const { username, album } = useParams();
    const photos = useSelector(state => state.photos);

    useEffect(() => 
    {
        if (mounted.current)
        {
            // Realizo las peticiones para obtener la información de usuario
            dispatch(getPhotos(username, album));
        }
        
        console.log("albums del usuario2")

        return () => 
        {
            mounted.current = false;
        }

    }, [dispatch, username, album]);

    const removePhoto = (image) =>
    {
        Swal.fire(
        {
            title: `Eliminar fotografía del usuario ${username}`,
            text: 'Se eliminará la fotografía y sus me gusta ¿Estás seguro?',
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
                dispatch(deletePhoto({ user_name: username, album, image }));
            }
        });
    }

    return (
        <div className="container-fluid gallery mt-3 animate__animated animate__fadeIn">
        {
        (photos !== undefined && photos.length > 0) ? photos.reverse().map( ({ image, fileImage, uid = '' }) => 
        (
            <div className="gallery-item" key={uid}>
                <i className="bi bi-trash-fill text-danger delete" onClick={ () => removePhoto(image) }></i>
                <img 
                    className="gallery-img" 
                    src={fileImage} 
                    alt={image}
                />
            </div>

        )) : <h1 className="text-light">No tiene ninguna imagen</h1>
        } 
        </div>
    )
}
