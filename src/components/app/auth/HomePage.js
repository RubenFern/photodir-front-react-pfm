import React from 'react';

//import { getAlbums } from '../../../helpers/getAlbums';
import { NavBar } from '../../layout/NavBar';

export const HomePage = () => 
{
    

    return (
        <>
            <NavBar />

            <div className="container mt-5">
                <h1 className="text-light">Álbumes del usuario</h1>

                <div className="conatiner">
                    <div className="row row-cols-4">
                    {
                        /*albums.map( ({image, uid, name, description, creation_date: date}) => 
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
                        ))*/
                    }
                    </div>
                </div>
            </div>
        </>
    )
}