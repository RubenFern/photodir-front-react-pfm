import Swal from "sweetalert2"

import { addReport } from "../../../redux/actions/report";

const reportImage = async(dispatch, category, image, user_reported, reporting_user) =>
{
    Swal.fire(
    {
        input: 'textarea',
        title: 'Motivo del reporte:',
        icon: 'question',
        inputPlaceholder: 'Escribe el motivo aquí...',
        inputAttributes: {
            'aria-label': 'Escribe el motivo aquí'
        },
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true
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