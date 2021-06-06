import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { setPrivacy } from '../../../redux/actions/privacy';

import './Privacy.css';

export const SetPrivacy = ({ private_profile }) => 
{
    const dispatch = useDispatch();

    const setprivate = () =>
    {
        Swal.fire(
        {
            title: `${ (private_profile) ? '¿Quieres poner la cuenta pública?' : '¿Quieres poner la cuenta privada?' }`,
            text: `${ (private_profile) ? 'Todo el mundo podrá ver tus álbumes y fotografías.' : 'Nadie podrá ver tus álbumes y fotografías.' }`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Cambiar',
            cancelButtonText: 'Cancelar',
            focusCancel: true
        }).then( (res) =>
        {
            if (res.isConfirmed) 
            {
                // Edito el usuario para establecer el nuevo estado
                dispatch(setPrivacy(private_profile));
            }
        });
    }

    return (
        <div className="text-light privacy">
            {
            (private_profile) 
            ?
            <div className="d-flex align-items-center">
                <span className="fs-5"><i className="bi bi-lock"></i> Cuenta privada</span>
                <i className="mx-2 bi bi-toggle2-on on pointer" onClick={ setprivate }></i>
            </div>
            :
            <div className="d-flex align-items-center">
                <span className="fs-5"><i className="bi bi-unlock"></i> Cuenta pública</span> 
                <i className="mx-2 bi bi-toggle2-on off pointer" onClick={ setprivate }></i>
            </div>
            }
        </div>
    )
}
