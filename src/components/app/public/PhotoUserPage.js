import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { NavBar } from '../../layout/NavBar';
import { getPhoto } from '../../redux/actions/photo';
import { types } from '../../redux/types/types';
import { Like } from '../auth/components/Like';

export const PhotoUserPage = ({ history }) => 
{
    const { username, album, photo } = useParams();

    const { logged } = useSelector(state => state.auth);
    const { title, description, image, creation_date, likes } = useSelector(state => state.photos);
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
                <div className="gallery mt-3">
                    <div className="only-item animate__animated animate__fadeIn">
                        <img 
                            className="only-img" 
                            src={`http://localhost:3010/api/upload/photo/${username}/${image}`} 
                            alt={image}
                            onClick={back}
                        />
                    { (logged) && <Like likes={likes} image={image} /> }
                    </div>
                    <h1 className="title-img container">{title}</h1>
                    
                </div>
            </div>
        </>
    )
}
