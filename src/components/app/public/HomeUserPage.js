import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

import { NavBar } from '../../layout/NavBar';
import { getAlbums } from '../../redux/actions/album';
import { getUser } from '../../redux/actions/explore';
import { types } from '../../redux/types/types';

export const HomeUserPage = () => 
{
    const { username } = useParams();
    const { name, image, creation_date } = useSelector(state => state.explore);
    const album = useSelector(state => state.album);

    const dispatch = useDispatch();

    useEffect(() => 
    {
        dispatch({
            type: types.viewUsers,
            payload: []
        });

        // Realizo las peticiones para obtener la información de usuario y los álbumes
        dispatch(getUser(username));
        dispatch(getAlbums(username));

        console.log("Home usuarios")

    }, [dispatch, username]);

    return (
        <>
        <NavBar />

        <div className="container-fluid mt-5">
                <div className="d-flex flex-column flex-md-row justify-content-md-around align-items-center">
                    <h1 className="text-light text-center">Álbumes del usuario</h1>
                </div>

                <ul className="container-fluid card-list animate__animated animate__fadeIn">
	
                    {
                        // Usar 2 componentes 
                        (album !== undefined && album.length > 0) ? album.reverse().map( ({image, uid = '', name, description, creation_date}) => 
                        (
                            <li key={uid} className="card">
                                <NavLink className="card-image" to={`/explore/${username}/${name}`}>
                                    <img className="pointer" src={`http://localhost:3010/api/upload/album/${username}/${image}`} alt={image} />
                                </NavLink>
                                <span className="card-description">
                                    <h2>{name}</h2>
                                    <p>{description}</p>
                                    <div className="d-flex w-100 justify-content-md-around align-items-center date">
                                        <p>{creation_date}</p>
                                    </div>
                                </span>
                            </li>

                        )) : <h2 className="text-light">Este usuario no tiene álbumes :(</h2>
                    }
                    
                </ul>
            </div>
        </>
    )
}
