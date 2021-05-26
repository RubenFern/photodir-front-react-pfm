import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { NavBar } from '../../layout/NavBar';
import { getPhoto } from '../../redux/actions/photo';
import { types } from '../../redux/types/types';

import './../auth/PhotoItem.css';

export const PhotoUserPage = ({ history }) => 
{
    const { username, photo } = useParams();

    const { title, description, image, creation_date } = useSelector(state => state.photos);
    const reload = useSelector(state => state.reload);

    const dispatch = useDispatch();

    useLayoutEffect(() => 
    {
        // Obtengo los datos de la imagen para no depender de la página anterior y poder recargar los datos al editar  
        dispatch(getPhoto(photo, history));
        console.log('FOTO de usuario')

        // Finalizo el renderizado desactivando el reload
        return () =>
        {
            dispatch({
                type: types.reloadFalse
            });
        }   

    }, [photo, dispatch, history, reload]);

    const back = () =>
    {
        if (history.length <= 2)
        {
            history.push('/home');
        } else
        {
            history.goBack();
        }
    }

    return (
        <>
            <NavBar />
            
            <div className="container">
            <div className="photo-item mt-3">
                    <h1 className="title-img container">{title}</h1>
                    <div className="only-item animate__animated animate__fadeIn">
                        <p className="date">{creation_date}</p>
                        <img 
                            className="only-img" 
                            src={`http://localhost:3010/api/upload/photo/${username}/${image}`} 
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
            </div>
        </>
    )
}
