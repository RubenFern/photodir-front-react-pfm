import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { back } from '../../../../helpers/back';
import { getPhoto } from '../../../redux/actions/explore';
import { types } from '../../../redux/types/types';

export const Photo = ({ user_name, photo }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const { title, description, fileImage, image, creation_date } = useSelector(state => state.photos);
    const reload = useSelector(state => state.reload);

    useLayoutEffect(() => 
    {
        // Obtengo los datos de la imagen para no depender de la página anterior y poder recargar los datos al editar  
        dispatch(getPhoto({ image: photo, user_name }, history));
        console.log('FOTO de usuario')

        // Finalizo el renderizado desactivando el reload
        return () =>
        {
            dispatch({
                type: types.reloadFalse
            });
        }   

    }, [photo, dispatch, history, user_name, reload]);

    return (
        <div className="photo-item mt-3">
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
                <div className="mx-md-3 mt-3">
                    <p className="text-light text-justify">
                        {description}
                    </p>
                </div>
            </div> 
        </div>
    )
}
