import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";
import { deletePhoto } from '../../../../redux/actions/photo';


export const DeleteComponent = ({ action, uid, image}) => 
{
    const dispatch = useDispatch();

    const openModal = () =>
    {
        Swal.fire(
        {
            title: '¿Estás seguro de borrar la fotografía?',
            text: 'Se eliminará por completo y no la podrás recuperar. ¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then( (res) =>
        {
            if (res.isConfirmed) 
            {
                // Elimino la imagen si el usuario lo confirmó
                dispatch(deletePhoto({uid, image}));

                Swal.fire('Eliminado', 'Tu fotografía se ha eliminado', 'success');
            }
        })
    }

    return (
        <button 
            className="btn btn-danger h-75"
            onClick={openModal}
        >
            <i className="fa fa-trash-alt" aria-hidden="true"></i>
            <span> {action}</span>
        </button>
    )
}