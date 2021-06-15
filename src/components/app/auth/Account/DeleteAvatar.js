import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { deleteAvatar } from '../../../redux/actions/user';

export const DeleteAvatar = ({ image }) => 
{
    const dispatch = useDispatch();

    const deleteImage = () =>
    {
        if (image === 'default_image.jpg')
        {
            Swal.fire('Ups', 'No puedes eliminar el avatar por defecto', 'error');
        } else
        {
            Swal.fire(
            {
                title: '¿Estás seguro de eliminar tu avatar?',
                text: 'La imagen se borrará de la aplicación',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí',
                cancelButtonText: 'No',
                focusCancel: true
            }).then( (res) =>
            {
                if (res.isConfirmed) 
                {
                    dispatch(deleteAvatar());
                }
            });
        }
        
    }

    return (
        <div>
            <button className="button" onClick={ deleteImage }>Eliminar Avatar</button>
        </div>
    )
}
