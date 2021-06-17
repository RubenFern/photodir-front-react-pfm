import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { back } from '../../../../helpers/back';
import { getPhotos } from '../../../redux/actions/photo';
import { Add } from '../components/Add';
import { FormModal } from '../Modal/FormModal';
import { NoPhoto } from '../NoContent/NoPhoto';
import { PhotoCard } from './PhotoCard';

export const Album = () => 
{
    // Monto el componente
    const mounted = useRef(true);

    const history = useHistory();

    const { album } = useParams();

    const [loading, setloading] = useState(true);

    // Obtengo el nombre de usuario del usuario conectado
    const { user: { user_name } } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const photos = useSelector(state => state.photos);

    useEffect(() => 
    {
        if (mounted.current)
        {
            dispatch(getPhotos({ user_name, album }, history));
        }

        return () => 
        {
            mounted.current = false;
        }
    }, [user_name, history, album, dispatch]);

    // Le doy margen de carga a las imágenes
    setTimeout(() => 
    {
        if (mounted.current)
        {
            setloading(false);
        }
    }, 250);

    // Ordeno los álbumes por fecha
    if (photos.length > 0)
    {
        photos.sort( (a, b) =>
        {
            return new Date(b.datems) - new Date(a.datems);
        });
    }
    
    return (
        <>
        <div className="container-fluid w-img mt-5">
            <div className="d-flex flex-column flex-md-row justify-content-md-around align-items-center">
                <div className="d-flex align-items-center">
                    <h1 className="text-light text-center">
                        <i className="bi bi-arrow-left-circle text-light pointer" onClick={() => back(history)}></i>
                        <span className="text-white-50"> Álbum:</span> {album}
                    </h1>
                </div>
                <Add />
            </div>

            {
            (loading)
            ?
            <div className="container-fluid gallery pointer mt-3">
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            :
            <div className="container-fluid gallery pointer mt-3 animate__animated animate__fadeIn">
                {(photos !== undefined && photos.length > 0) ? photos.map( (photo) => 
                (
                    <PhotoCard key={photo.uid} photo={photo} album={album} />

                )) : <NoPhoto />}
            </div>
            
            }
        </div>

        <FormModal tipo="photo" album={album} />
        </>
    )
}
