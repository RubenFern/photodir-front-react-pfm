import React from 'react';
import { useDispatch } from 'react-redux';

import { types } from '../../../../redux/types/types';


export const EditComponent = ({action, uid, image, name, description, creation_date}) => 
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
                name, 
                image, 
                description,
                creation_date
            }
        });
    }

    return (
        <button 
            className="btn bg-main-color text-light h-75"
            onClick={openModal}
        >
            <i className="fa fa-edit" aria-hidden="true"></i>
            <span> {action}</span>
        </button>
    )
}