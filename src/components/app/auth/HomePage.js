import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { NavBar } from '../../layout/NavBar';
import { getAlbums } from '../../redux/actions/album';
import { AddComponent } from './components/helpers/AddComponent';
import { DeleteComponent } from './components/helpers/DeleteComponent';
import { EditComponent } from './components/helpers/EditComponent';
import { FormModal } from './FormModal';


export const HomePage = () => 
{
    // Obtengo el nombre de usuario del usuario conectado
    const { user: { user_name } } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const album = useSelector(state => state.album);

    // Ordeno los álbumes por fecha
    album.sort( (a, b) =>
    {
        return new Date(a.creation_date) - new Date(b.creation_date);
    });

    useLayoutEffect(() => 
    {
        dispatch(getAlbums(user_name));
        console.log('recarga')
    }, [user_name, dispatch, album.length]);

    return (
        <>
            <NavBar />

            <div className="container-fluid mt-5">
                <div className="d-flex flex-column flex-md-row justify-content-md-around align-items-center">
                    <h1 className="text-light text-center">Álbumes del usuario</h1>
                    <AddComponent action="Crear Álbum" />
                </div>
                

                <ul className="container-fluid card-list">
	
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