import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavBar } from '../../layout/NavBar';
import { FormModal } from './FormModal';
import { AddComponent } from './components/helpers/AddComponent';
import { useParams } from 'react-router';
import { getPhotos } from '../../redux/actions/photo';
import { NavLink } from 'react-router-dom';
import { types } from '../../redux/types/types';

export const AlbumPage = () => 
{
    const { album } = useParams();

    // Obtengo el nombre de usuario del usuario conectado
    const { user: { user_name } } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const photos = useSelector(state => state.photos);
    const reload = useSelector(state => state.reload);

    useLayoutEffect(() => 
    {
        dispatch(getPhotos(`${user_name}/${album}`));
        console.log('recargaphoto')

        // Finalizo el renderizado desactivando el reload
        return () =>
        {
            dispatch({
                type: types.reloadFalse
            });
        }   
    }, [user_name, album, dispatch, reload]);

    return (
        <>
            <NavBar />

            <div className="container-fluid w-img mt-5 animate__animated animate__fadeIn">
                <div className="d-flex flex-column flex-md-row justify-content-md-around align-items-center">
                    <div className="d-flex align-items-center">
                        <h1 className="text-light text-center">{album}</h1>
                    </div>
                    <AddComponent action="Añadir Fotografía" />
                </div>
                

                <div className="container-fluid gallery pointer mt-3">
	
                {
                    // Usar 2 componentes 
                    (photos !== undefined && photos.length > 0) ? photos.reverse().map( ({image, uid = '', title, description, creation_date}) => 
                    (
                        // En el NavLink retorno las props de la imagen
                        <NavLink to={{ pathname: `/home/${album}/${image}`, state: { uid, image, title, description, creation_date } }} className="gallery-item" key={uid}>
                            <img 
                                className="gallery-img" 
                                src={`http://localhost:3010/api/upload/photo/${user_name}/${image}`} 
                                alt={image}
                            />
                        </NavLink>

                    )) : <h2 className="text-light">Este usuario no tiene fotografías :(</h2>
                }
                    
                </div>
            </div>

            <FormModal tipo="photo" album={album} />
        </>
    )
}
