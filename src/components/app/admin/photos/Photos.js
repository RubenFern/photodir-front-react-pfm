import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deletePhoto, getPhotos } from '../../../redux/actions/admin';
import { NoPhoto } from '../NoContent/NoPhoto';

import './Photo.css';

export const Photos = () => 
{
    // Monto el componente
    const mounted = useRef(true);

    const [loading, setloading] = useState(true);

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
        
        return () => 
        {
            mounted.current = false;
        }

    }, [dispatch, username, album]);

     // Le doy margen de carga a las imágenes
     setTimeout(() => 
     {
         if (mounted.current)
         {
             setloading(false);
         }
     }, 100);

    // Ordeno los álbumes por fecha
    if (photos.length > 0)
    {
        photos.sort( (a, b) =>
        {
            return new Date(b.datems) - new Date(a.datems);
        });
    }

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
        (loading)
        ?
        <div className="container-fluid gallery pointer mt-3">
            <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        :
        (photos !== undefined && photos.length > 0) 
        ? 
        photos.reverse().map( ({ image, fileImage, uid = '' }) => 
        (
            <div className="gallery-item" key={uid}>
                <i className="bi bi-trash-fill text-danger delete" onClick={ () => removePhoto(image) }></i>
                <img 
                    className="gallery-img" 
                    src={fileImage} 
                    alt={image}
                />
            </div>

        )) 
        : 
        <NoPhoto />
        } 
        </div>
    )
}
