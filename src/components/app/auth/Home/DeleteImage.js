import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { deleteImage } from '../../../redux/actions/album';

export const DeleteImage = ({ user_name, image, album }) => 
{
    const dispatch = useDispatch();

    const removeImage = () =>
    {
        if (image === 'default_image.jpg')
        {
            Swal.fire('Ups', 'No puedes eliminar la imagen por defecto', 'error');
        } else
        {
            Swal.fire(
            {
                title: '¿Estás seguro de eliminar la imagen del álbum?',
                text: 'La imagen se borrará de la aplicación',
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
                    dispatch(deleteImage(user_name, album));
                }
            });
        }
        
    }

    return (
        <div>
            <button className="button" onClick={ removeImage }>Eliminar Imagen</button>
        </div>
    )
}
