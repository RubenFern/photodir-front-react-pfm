import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { deleteAlbum } from '../../../redux/actions/album';

export const Delete = ({ image, name, description, uid, creation_date }) => 
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
            confirmButtonColor: '#0C6492',
            cancelButtonColor: '#0C9291',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            focusCancel: true
        }).then( (res) =>
        {
            if (res.isConfirmed) 
            {
                // Elimino el álbum si el usuario lo confirmó
                dispatch(deleteAlbum({image, name, description, uid, creation_date}));

                Swal.fire('Eliminado', 'Tu álbum se ha eliminado', 'success');
            }
        });
    }

    return (
        <button 
            className="btn btn-danger"
            onClick={openModal}
        >
            <i className="bi bi-trash"></i>
        </button>
    )
}
