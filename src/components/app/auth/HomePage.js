import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
                    <AddAlbum />
                </div>
                

                <ul className="container-fluid card-list">
	
                    {
                        // Usar 2 componentes 
                        (album !== undefined && album.length > 0) ? album.reverse().map( ({image, uid, name, description, creation_date: date}) => 
                        (
                            <li className="card" key={uid}>
                                <span className="card-image">
                                    <img src={`/${image}`} alt={image} />
                                </span>
                                <span className="card-description">
                                    <h2>{name}</h2>
                                    <p>{description}</p>
                                    <p className="date">{date}</p>
                                </span>
                            </li>

                        )) : <h2 className="text-light">Este usuario no tiene álbumes :(</h2>
                    }
                    
                </ul>
            </div>

            <FormModal />
        </>
    )
}