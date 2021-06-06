import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";

import { deleteUser } from '../../../redux/actions/user';

export const DeleteUser = ({ history }) => 
{
    const dispatch = useDispatch();

    const deleteAccount = () =>
    {
        Swal.fire(
        {
            title: '¿Estás seguro de borrar tu cuenta?',
            text: 'Se eliminarán todos los álbumes y fotografías que has creado.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            focusCancel: true
        }).then( (res) =>
        {
            if (res.isConfirmed) 
            {
                dispatch(deleteUser(history));

                localStorage.clear();

                Swal.fire('Eliminado', 'Tu cuenta ha sido borrada completamente', 'success');
            }
        });
    }

    return (
        <button 
            className="btn btn-danger"
            onClick={deleteAccount}
        >
            <i className="fa fa-trash-alt" aria-hidden="true"></i>
            <span> Borrar Cuenta</span>
        </button>
    )
}
