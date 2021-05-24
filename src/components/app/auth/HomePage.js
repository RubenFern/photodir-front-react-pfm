import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { NavBar } from '../../layout/NavBar';
import { getAlbums } from '../../redux/actions/album';
import { DeleteComponent } from './components/Albums/DeleteComponent';
import { EditComponent } from './components/Albums/EditComponent';
import { FormModal } from './FormModal';
import { types } from '../../redux/types/types';
import { InfoUser } from './components/User/InfoUser';
import { AlbumCard } from './components/Albums/AlbumCard';


import './Album.css';

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
                        <li key={uid} className="card">
                            <p className="date">{creation_date}</p>
                            <NavLink className="card-image" to={`/home/${name}`}>
                                <img className="pointer" src={`http://localhost:3010/api/upload/album/${user_name}/${image}`} alt={image} />
                            </NavLink>
                            <span className="card-description">
                                <h2 className="title">{name}</h2>
                                <p className="text-justify mx-3">
                                    {description}
                                    </p>
                                <div className="d-flex justify-content-around w-100 bottom mb-2">
                                    <EditComponent action="Editar" image={image} name={name} description={description} uid={uid} creation_date={creation_date} />
                                    <DeleteComponent action="Eliminar" image={image} name={name} description={description} uid={uid} creation_date={creation_date} />
                                </div>
                            </span>
                        </li>

                    )) : <h2 className="text-light">Parece que no tienes ningún álbum... ¡Prueba a crear uno!</h2>
                } 
                </ul>

            </div>

            <FormModal tipo="album" album={album} />
        </>
    )
}