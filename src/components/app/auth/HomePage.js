import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { NavBar } from '../../layout/NavBar';
import { getAlbums } from '../../redux/actions/album';
import { AddComponent } from './components/helpers/AddComponent';
import { DeleteComponent } from './components/Albums/DeleteComponent';
import { EditComponent } from './components/Albums/EditComponent';
import { FormModal } from './FormModal';
import { types } from '../../redux/types/types';


export const HomePage = () => 
{
    // Obtengo el nombre de usuario del usuario conectado
    const { user: { user_name, is_admin } } = useSelector(state => state.auth);
    const history = useHistory();

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
        dispatch(getAlbums(user_name));
        console.log('recarga')

        // Finalizo el renderizado desactivando el reload
        return () =>
        {
            dispatch({
                type: types.reloadFalse
            });
        }         
    }, [user_name, dispatch, reload]);

    return (
        <>
            <NavBar />

            <div className="container-fluid mt-5">
                <div className="d-flex flex-column flex-md-row justify-content-md-around align-items-center">
                    <h1 className="text-light text-center">Álbumes del usuario</h1>
                    <AddComponent action="Crear Álbum" />
                </div>
                

                <ul className="container-fluid card-list animate__animated animate__fadeIn">
	
                    {
                        // Usar 2 componentes 
                        (album !== undefined && album.length > 0) ? album.reverse().map( ({image, uid = '', name, description, creation_date}) => 
                        (
                            <li key={uid} className="card">
                                <NavLink className="card-image" to={`/home/${name}`}>
                                    <img className="pointer" src={`http://localhost:3010/api/upload/album/${user_name}/${image}`} alt={image} />
                                </NavLink>
                                <span className="card-description">
                                    <h2>{name}</h2>
                                    <p>{description}</p>
                                    <div className="d-flex w-100 justify-content-md-around align-items-center date">
                                        <p>{creation_date}</p>
                                        <EditComponent action="Editar" image={image} name={name} description={description} uid={uid} creation_date={creation_date} />
                                        <DeleteComponent action="Eliminar" image={image} name={name} description={description} uid={uid} creation_date={creation_date} />
                                    </div>
                                </span>
                            </li>

                        )) : <h2 className="text-light">Este usuario no tiene álbumes :(</h2>
                    }
                    
                </ul>
            </div>

            <FormModal tipo="album" album={album} />
        </>
    )
}