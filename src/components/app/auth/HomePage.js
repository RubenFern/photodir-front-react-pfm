import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavBar } from '../../layout/NavBar';
import { getAlbums } from '../../redux/actions/album';
import { FormModal } from './FormModal';
import { types } from '../../redux/types/types';
import { InfoUser } from './components/User/InfoUser';
import { AlbumCard } from './components/Albums/AlbumCard';

export const HomePage = ({ history }) => 
{
    // Obtengo el nombre de usuario del usuario conectado
    const { user } = useSelector(state => state.auth);
    const { user_name, is_admin } = user;

    if (is_admin)
    {
        // Si es admin redirecciono a su home si la posibilidad de ir hacia atrás
        history.replace('/panel');
    }

    const dispatch = useDispatch();

    const album = useSelector(state => state.album);
    const reload = useSelector(state => state.reload);

    // Ordeno los álbumes por fecha
    album.sort( (a, b) =>
    {
        return new Date(a.creation_date) - new Date(b.creation_date);
    });

    useLayoutEffect(() => 
    {
        dispatch(getAlbums(user_name, history));
        console.log('recarga')

        // Finalizo el renderizado desactivando el reload
        return () =>
        {
            dispatch({
                type: types.reloadFalse
            });
        }         
    }, [user_name, history, dispatch, reload]);

    return (
        <>
            <NavBar />

            <div className="container-fluid mt-5">

                <InfoUser user={user} numAlbums={album.length} />

                <ul className="container-fluid card-list animate__animated animate__fadeIn mt-3">
                {
                    (album !== undefined && album.length > 0) ? album.reverse().map( ({image, uid = '', name, description, creation_date}) => 
                    (
                        <AlbumCard key={uid} uid={uid} image={image} name={name} description={description} creation_date={creation_date} user_name={user_name} />

                    )) : <h2 className="text-light">Parece que no tienes ningún álbum... ¡Prueba a crear uno!</h2>
                } 
                </ul>

            </div>

            <FormModal tipo="album" album={album} />
        </>
    )
}