import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getAlbums } from '../../../redux/actions/album';
import { FormModal } from '../Modal/FormModal';
import { NoAlbum } from '../NoContent/NoAlbum';
import { InfoUser } from '../User/InfoUser';
import { AlbumCard } from './AlbumCard';

import './AlbumCard.css';

export const Home = () => 
{
    // Monto el componente
    const mounted = useRef(true);

    const history = useHistory();

    const [loading, setloading] = useState(true);

    const dispatch = useDispatch();

    // Obtengo el nombre de usuario del usuario conectado
    const { user } = useSelector(state => state.auth);
    const album = useSelector(state => state.album);
    const { user_name } = user;

    useEffect(() => 
    {
        if (mounted.current)
        {
            dispatch(getAlbums(user_name, history));
            console.log('recarga')
        }
        
        // Limpio el componente
        return () =>
        {
            mounted.current = false;
        }
    }, [user_name, history, dispatch]);

    // Le doy margen de carga a las imágenes
    setTimeout(() => 
    {
        if (mounted.current)
        {
            setloading(false);
        }
    }, 100);

    // Ordeno los álbumes por fecha
    if (album.length > 0)
    {
        album.sort( (a, b) =>
        {
            return new Date(a.creation_date) - new Date(b.creation_date);
        });
    }
    
    return (
        <>
        <div className="container-fluid mt-5">

            <InfoUser user={user} numAlbums={album.length} home={true} />

            {
            (loading)
            ?
            <div className="container-fluid gallery pointer mt-3">
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            : 
            <div className="container-fluid card-list animate__animated animate__fadeIn mt-3">
            {
                
                (album !== undefined && album.length > 0) ? album.reverse().map( ({image, fileImage, uid = '', name, description, creation_date}) => 
                (

                    <div key={uid} className="card">
                        <AlbumCard key={uid} uid={uid} image={image} fileImage={fileImage} name={name} description={description} creation_date={creation_date} />
                    </div>

                )) : <NoAlbum object="album" />
            } 
            </div>
            }

        </div>

        <FormModal tipo="album" album={album} />
        </>
    )
}
