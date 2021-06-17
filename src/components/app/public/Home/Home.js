import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { NoItemsExplore } from '../NoItems/NoItemsExplore';
import { AlbumCardExplore } from './AlbumCardExplore';


export const Home = ({ username }) => 
{
    // Monto el componente. Si al entrar en la página se monta y seguidameete se desmonta el componete limpio el proceso
    const mounted = useRef(true);

    const [loading, setloading] = useState(true);

    const dispatch = useDispatch();
    const history = useHistory();

    const album = useSelector(state => state.album);
    const reload = useSelector(state => state.reload)

    useEffect(() => 
    {
        // Si el componente está montado realizo la petición
        if (reload)
        {
            //dispatch(getAlbums(username, history));
        }


        // Desmonto el componente al salir
        return () => 
        {
            mounted.current = false;
        }

    }, [dispatch, history, reload, username]);

    // Le doy margen de carga a las imágenes
    setTimeout(() => 
    {
        if (mounted.current)
        {
            setloading(false);
        }
    }, 100);

    return (
        <>
        {
            (loading)
            ?
            <div className="container-fluid gallery pointer mt-3">
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            :
            <ul className="container-fluid card-list animate__animated animate__fadeIn">
            {// Usar 2 componentes 
                (album !== undefined && album.length > 0) ? album.reverse().map( ({image, fileImage, uid = '', name, description, creation_date}) => 
                (
                    <AlbumCardExplore key={uid} uid={uid} image={image} fileImage={fileImage} name={name} description={description} creation_date={creation_date} user_name={username} />

                )) : <NoItemsExplore object="album" />}
            </ul>
        }
            
        </>
    )
}
