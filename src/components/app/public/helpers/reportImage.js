import Swal from "sweetalert2"

import { addReport } from "../../../redux/actions/report";

const reportImage = async(dispatch, category, image, user_reported, reporting_user) =>
{
    // Si la imagen es la de por defecto bloqueo el reporte
    if (image === 'default_image.jpg')
    {
        return Swal.fire('Ups', 'No puedes reportar las imágenes asignadas por defecto', 'error');
    }

    Swal.fire(
    {
        input: 'textarea',
        title: `Reporta la imagen ${ (category === 'photo') ? 'de la fotografía' : `del ${category}` }`,
        icon: 'warning',
        inputPlaceholder: 'Escribe el motivo aquí...',
        inputAttributes: {
            'aria-label': 'Escribe el motivo aquí'
        },
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        inputValidator: (value) => 
        {  
            if (value.length > 160)
            {
                return `Has superado el número de caracteres ${value.length} / 160.`;
            }
        }
    }).then( (res) =>
    {
        if (res.isConfirmed && res.value !== '')
        {
            const description = res.value;

            // Mando la petición a la API para reportar la imagen
            dispatch(addReport({ user_reported, reporting_user, image, description, category }));
        }
    });
}

// Mensaje para avisar que los reportes es solo para los usuarios autenticados
const onlyUsersAuth = () =>
{
    Swal.fire({
        title: 'Lo sentimos',
        text: 'Para reportar imágenes debes estar autenticado',
        icon: 'warning',
    });
}

export
{
    reportImage,
    onlyUsersAuth
}