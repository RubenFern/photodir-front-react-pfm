import Swal from "sweetalert2";

const validateUpload = (type) =>
{
    if (['image/png', 'image/gif', 'image/svg', 'image/jpeg'].includes(type))
    {
        return true;
    } else
    {
        // Si la extensión no es válida retorno un error
        Swal.fire('Ups', 'El archivo que has subido no es válido', 'error');
        return false;
    }
}

export
{
    validateUpload
}