import React, { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavBar } from '../../layout/NavBar';
import { FormModal } from './FormModal';
import { AddComponent } from './components/helpers/AddComponent';
import { useParams } from 'react-router';
import { getPhotos } from '../../redux/actions/photo';
import { types } from '../../redux/types/types';
import { back } from '../../../helpers/back';
import { PhotoCard } from './components/Photos/PhotoCard';
import { NoItems } from './components/NoItems/NoItems';

export const AlbumPage = ({ history }) => 
{
    const { album } = useParams();

    const [loading, setloading] = useState(true);

    // Le doy margen de carga a las imágenes
    setTimeout(() => 
    {
        setloading(false);
    }, 100);

    // Obtengo el nombre de usuario del usuario conectado
    const { user: { user_name } } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const photos = useSelector(state => state.photos);
    const reload = useSelector(state => state.reload);

    useLayoutEffect(() => 
    {
        dispatch(getPhotos({ user_name, album }, history));
        console.log('recargaphoto')

        // Finalizo el renderizado desactivando el reload
        return () =>
        {
            dispatch({
                type: types.reloadFalse
            });
        }   
    }, [user_name, history, album, dispatch, reload]);

    return (
        <>
            <NavBar />

            <div className="container-fluid w-img mt-5">
                <div className="d-flex flex-column flex-md-row justify-content-md-around align-items-center">
                    <div className="d-flex align-items-center">
                        <h1 className="text-light text-center">
                            <i className="bi bi-arrow-left-circle text-light pointer" onClick={() => back(history)}></i>
                            <span className="text-white-50"> Álbum:</span> {album}
                        </h1>
                    </div>
                    <AddComponent />
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
                    {(photos !== undefined && photos.length > 0) ? photos.reverse().map( ({ image, fileImage, uid = '' }) => 
                    (
                        <PhotoCard key={uid} uid={uid} album={album} image={image} fileImage={fileImage} user_name={user_name} home={true} />

                    )) : <NoItems object="photo" />}
                </div>
                
                }
            </div>

            <FormModal tipo="photo" album={album} />
        </>
    )
}