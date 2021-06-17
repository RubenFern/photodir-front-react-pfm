import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { back } from '../../../../helpers/back';
import { getPhoto } from '../../../redux/actions/explore';
import { types } from '../../../redux/types/types';
import { Like } from '../../auth/components/Like';
import { ReportImage } from '../components/ReportImage';

export const Photo = ({ user_name, photo }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    // Si el usuario está logueado muestro el botón de Like
    const { logged } = useSelector(state => state.auth);

    const { title, description, fileImage, image, creation_date, likes } = useSelector(state => state.photos);
    const reload = useSelector(state => state.reload);

    useLayoutEffect(() => 
    {
        // Obtengo los datos de la imagen para no depender de la página anterior y poder recargar los datos al editar  
        dispatch(getPhoto({ image: photo, user_name }, history));

        // Finalizo el renderizado desactivando el reload
        return () =>
        {
            dispatch({ type: types.reloadFalse });

            dispatch({ 
                type: types.viewFavorites, 
                payload: [] 
            });
        }   

    }, [photo, dispatch, history, user_name, reload]);

    return (
        <>
        <div className="mt-2">
        <ReportImage category='photo' image={image} user_reported={user_name} />
        </div>
        <div className="photo-item mt-3 pb-4">
            <h1 className="title-img container">{title}</h1>
            
            <div className="only-item animate__animated animate__fadeIn">
                <p className="date">{creation_date}</p>
                <img 
                    className="only-img" 
                    src={fileImage} 
                    alt={image}
                    onClick={() => back(history)}
                />
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-center description">
                <div className="like">
                {(logged) && <Like user_name={user_name} likes={likes} image={image} />}
                </div>
                <div className="mx-md-3 mt-3">
                    <p className="text-light text-justify">
                        {description}
                    </p>
                </div>
            </div> 
        </div>
        </>
    )
}
