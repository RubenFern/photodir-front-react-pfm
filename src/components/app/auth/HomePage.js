import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavBar } from '../../layout/NavBar';
import { getAlbums } from '../../redux/actions/album';

export const HomePage = () => 
{
    // Obtengo el nombre de usuario del usuario conectado
    const { user: { user_name } } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => 
    {
        dispatch(getAlbums(user_name)); 
    }, [user_name, dispatch]);

    const {album} = useSelector(state => state.album);

    return (
        <>
            <NavBar />

            <div className="container mt-5">
                <h1 className="text-light">Álbumes del usuario</h1>

                <div className="conatiner">
                    <div className="row row-cols-4">
                    {
                        // Usar 2 componentes 
                        (album !== undefined && album.length > 0) ? album.map( ({image, uid, name, description, creation_date: date}) => 
                        (
                            <div
                                key={uid}
                                className="text-light"
                            >
                                <h1>{image}</h1>
                                <h2>{name}</h2>
                                <p>
                                    {description}
                                </p>
                                <p>
                                    {date}
                                </p>
                            </div>
                        )) : <h2 className="text-light">Este usuario no tiene álbumes :(</h2>
                    }
                    </div>
                </div>
            </div>
        </>
    )
}