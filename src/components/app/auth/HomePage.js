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

            <div className="container-fluid mt-5">
                <h1 className="text-light container">Álbumes del usuario</h1>

                <ul className="container-fluid card-list">
	
                    {
                        // Usar 2 componentes 
                        (album !== undefined && album.length > 0) ? album.map( ({image, uid, name, description, creation_date: date}) => 
                        (
                            <li className="card" key={uid}>
                                <a className="card-image" href="">
                                    <img src={`/${image}`} alt={image} />
                                </a>
                                <a className="card-description" href="">
                                    <h2>{name}</h2>
                                    <p>{description}</p>
                                    <p className="date">{date}</p>
                                </a>
                            </li>

                        )) : <h2 className="text-light">Este usuario no tiene álbumes :(</h2>
                    }
                    
                </ul>
            </div>
        </>
    )
}