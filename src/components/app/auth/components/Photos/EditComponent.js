import React from 'react';
import { useDispatch } from 'react-redux';

import { types } from '../../../../redux/types/types';


export const EditComponent = ({action, uid, title, description}) => 
{
    const dispatch = useDispatch();

    // Recibo los datos del álbum del botón y los guardo en el store
    const openModal = () =>
    {
        dispatch({
            type: types.openModal,
            payload: 'editar',
            data: {
                uid,
                title, 
                description,
            }
        });
    }

    return (
        <button 
            className="btn bg-main-color text-light h-75"
            onClick={openModal}
        >
            <i className="bi bi-pencil"></i>
        </button>
    )
}