import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { NavBar } from '../../layout/NavBar';
import { DeleteComponent } from './components/Photos/DeleteComponent';
import { EditComponent } from './components/Photos/EditComponent';
import { FormModal } from './FormModal';

export const PhotoPage = ({ history }) => 
{
    // Realizo una petición para no depender de los datos de la página anterior PROBAR A SACAR EL ID DEL REDUCER PORQUE AL ACTUALIZAR ESTE CAMBIA Y COGE EL VALOR ACTUALIZADO
    const { state: { uid, title, description, image, creation_date } } = useLocation();
    const { user: { user_name } } = useSelector(state => state.auth);


    const back = () =>
    {
        history.goBack();
    }

    return (
        <>
            <NavBar />

            <div className="container">
                <div className="gallery mt-3">
                    <h1 className="title-img container">{title}</h1>
                    <div className="only-item animate__animated animate__fadeIn">
                        <img 
                            className="only-img" 
                            src={`http://localhost:3010/api/upload/photo/${user_name}/${image}`} 
                            alt={image}
                            onClick={back}
                        />
                    </div>
                    
                </div>
                <div className="d-flex justify-content-end mt-4">
                    <div className="h-25">
                        <EditComponent action="Editar" uid={uid} title={title} description={description} image={image} />
                    </div>
                    <div className="h-25 ms-3 mx-5">
                        <DeleteComponent action="Eliminar" uid={uid} image={image} />
                    </div>
                </div>
            </div>
            

            <FormModal tipo="photo" />
        </>
    )
}
