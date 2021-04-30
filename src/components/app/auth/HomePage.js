import React, { useContext, useEffect, useState } from 'react';
import { getAlbums } from '../../../helpers/getAlbums';
import { reducer } from '../../../hooks/useReducer';

import { AuthContext } from '../../../hooks/useContext';
import { NavBar } from '../../layout/NavBar';

export const HomePage = () => 
{
    // Obtengo el nombre del usuario conectado para mostrar sus álbumes
    const { user: { name } } = useContext(AuthContext);

    // Creo un useState para manejar los álbumes
    const [albums, setalbums] = useState([]);

    useEffect( () => 
    {
        
        const fetchAlbums = async() =>
        {
            const arrayAlbums = await getAlbums(name);
            setalbums(arrayAlbums);
        }
        
        fetchAlbums();
    }, [name]);

    return (
        <>
            <NavBar />

            <div className="container mt-5">
                <h1 className="text-light">Álbumes del usuario</h1>

                <div className="conatiner">
                    <div className="row row-cols-4">
                    {
                        albums.map( ({image, uid, name, description, creation_date: date}) => 
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
                        ))
                    }
                    </div>
                </div>
            </div>
        </>
    )
}