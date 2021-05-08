import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { NavBar } from '../../layout/NavBar';
import { getAlbums } from '../../redux/actions/album';
import { AddAlbum } from './AddAlbum';
import { FormModal } from './FormModal';


export const HomePage = () => 
{
    // Obtengo el nombre de usuario del usuario conectado
    const { user: { user_name } } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const albums = useSelector(state => state.album);
    const {album} = albums;

    useLayoutEffect(() => 
    {
        dispatch(getAlbums(user_name));
    }, [user_name, dispatch, albums.length]);

    return (
        <>
            <NavBar />

            <div className="container-fluid mt-5">
                <div className="d-flex flex-column flex-md-row justify-content-md-around">
                    <h1 className="text-light text-center">Álbumes del usuario</h1>
                    <AddAlbum action="Crear Álbum" />
                </div>
                

                <ul className="container-fluid card-list pointer">
	
                    {
                        // Usar 2 componentes 
                        (album !== undefined && album.length > 0) ? album.reverse().map( ({image, uid, name, description, creation_date: date}) => 
                        (
                            <NavLink className="card" to={`/home/${name}`} key={uid}>
                                <span className="card-image">
                                    <img src={`http://localhost:3010/api/upload/album/${user_name}/${image}`} alt={image} />
                                </span>
                                <span className="card-description">
                                    <h2>{name}</h2>
                                    <p>{description}</p>
                                    <p className="date">{date}</p>
                                </span>
                            </NavLink>

                        )) : <h2 className="text-light">Este usuario no tiene álbumes :(</h2>
                    }
                    
                </ul>
            </div>

            <FormModal tipo="album" />
        </>
    )
}