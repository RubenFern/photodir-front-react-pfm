import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPhotos } from '../../../redux/actions/admin';

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
            dispatch(getPhotos(username, album ));
        }
        
        console.log("albums del usuario2")

        return () => 
        {
            mounted.current = false;
        }

    }, [dispatch, username, album]);

    return (
        <div className="container-fluid gallery mt-3 animate__animated animate__fadeIn">
        {
        (photos !== undefined && photos.length > 0) ? photos.reverse().map( ({ image, fileImage, uid = '' }) => 
        (
            <div className="gallery-item" key={uid}>
                <img 
                    className="gallery-img" 
                    src={fileImage} 
                    alt={fileImage}
                />
            </div>

        )) : <h1 className="text-light">No tiene ninguna imagen</h1>
        } 
        </div>
    )
}
