import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavBar } from '../../layout/NavBar';
import { FormModal } from './FormModal';
import { AddComponent } from './components/helpers/AddComponent';
import { useParams } from 'react-router';
import { getPhotos } from '../../redux/actions/photo';
import { EditComponent } from './components/helpers/EditComponent';

export const AlbumPage = () => 
{
    const { album } = useParams();

    // Obtengo el nombre de usuario del usuario conectado
    const { user: { user_name } } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const arrayPhotos = useSelector(state => state.photos);
    const { photos } = arrayPhotos;

    useLayoutEffect(() => 
    {
        dispatch(getPhotos(`${user_name}/${album}`));
        console.log('recagra')
    }, [user_name, album, dispatch, arrayPhotos.length]);

    return (
        <>
            <NavBar />

            <div className="container-fluid mt-5">
                <div className="d-flex flex-column flex-md-row justify-content-md-around align-items-center">
                    <div className="d-flex align-items-center">
                        <h1 className="text-light text-center">{album}</h1>
                        <EditComponent action="Editar Álbum" />
                    </div>
                    <AddComponent action="Añadir Fotografía" />
                </div>
                

                <ul className="container-fluid card-list pointer">
	
                {
                    // Usar 2 componentes 
                    (photos !== undefined && photos.length > 0) ? photos.reverse().map( ({image, uid, title, description, creation_date: date}) => 
                    (
                        <li className="card" key={uid}>
                            <span className="card-image">
                                <img src={`http://localhost:3010/api/upload/photo/${user_name}/${image}`} alt={image} />
                            </span>
                            <span className="card-description">
                                <h2>{title}</h2>
                                <p>{description}</p>
                                <p className="date">{date}</p>
                            </span>
                        </li>

                    )) : <h2 className="text-light">Este usuario no tiene fotografías :(</h2>
                }
                    
                </ul>
            </div>

            <FormModal tipo="photo" album={album} />
        </>
    )
}
