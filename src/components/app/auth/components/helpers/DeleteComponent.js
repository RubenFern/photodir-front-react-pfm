import React from 'react';
import { useDispatch } from 'react-redux';

import { types } from '../../../../redux/types/types';
import Swal from "sweetalert2";

export const DeleteComponent = ({action}) => 
{
    const dispatch = useDispatch();

    const openModal = () =>
    {
        Swal.fire(
        {
            title: '¿Estás seguro de borrar el álbum?',
            text: 'Se eliminarán todas las imágenes que estén dentro de él',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then( (res) =>
        {
            if (res.isConfirmed) 
            {
                // Action de reducer
                Swal.fire('Eliminado', 'Tu álbum se ha eliminado', 'success');
            }
        })
        //dispatch({type: types.openModal});
    }

    return (
        <button 
            className="btn btn-danger h-75"
            onClick={openModal}
        >
            <i className="fa fa-plus-square" aria-hidden="true"></i>
            <span> {action}</span>
        </button>
    )
}