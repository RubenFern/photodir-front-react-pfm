import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";

import { deleteAlbum } from '../../../../redux/actions/album';

export const DeleteComponent = ({ action, image, name, description, uid, creation_date }) => 
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
                // Eliminio el álbum si el usuario lo confirmó
                dispatch(deleteAlbum({image, name, description, uid, creation_date}));

                Swal.fire('Eliminado', 'Tu álbum se ha eliminado', 'success');
            }
        })
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