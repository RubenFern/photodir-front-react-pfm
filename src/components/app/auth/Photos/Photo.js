import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { getPhoto } from '../../../redux/actions/photo';
import { FormModal } from '../Modal/FormModal';
import { Edit } from './Edit';
import { Delete } from './Delete';
import { back } from '../../../../helpers/back';
import { Like } from '../components/Like';
import { types } from '../../../redux/types/types';

export const Photo = () => 
{ 
    const history = useHistory();
    const { photo } = useParams();
    
    const { user: { user_name } } = useSelector(state => state.auth);
    const { uid, title, description, image, fileImage, creation_date, likes } = useSelector(state => state.photos);
    const reload = useSelector(state => state.reload);

    const dispatch = useDispatch();

    useEffect(() => 
    {
        // Obtengo los datos de la imagen para no depender de la página anterior y poder recargar los datos al editar  
        dispatch(getPhoto({ image: photo, user_name }, history));
        console.log('recargaphoto')
        
        // Limpio el componente
        return () =>
        {
            dispatch({
                type: types.reloadFalse
            });

            console.log("salgo")
        }
    }, [photo, dispatch, history, reload, user_name]);

    return (
        <>
        <div className="container">
            <div className="d-flex justify-content-end  mt-4">
                <div className="h-25">
                    <Edit action="Editar" uid={uid} title={title} description={description} image={image} />
                </div>
                <div className="h-25 ms-3 mx-5">
                    <Delete action="Eliminar" uid={uid} image={image} />
                </div>
            </div>
            <div className="photo-item animate__animated animate__fadeIn mt-3">
                <h1 className="title-img container">{title}</h1>
                <div className="only-item">
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
                        <Like likes={likes} image={image} />
                    </div>
                    <div className="mx-md-3 mt-3">
                        <p className="text-light text-justify">
                            {description}
                        </p>
                    </div>
                </div> 
            </div>
        </div>
        

        <FormModal tipo="photo" />
        </>
    )
}
