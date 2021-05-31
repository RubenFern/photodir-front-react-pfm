import Swal from "sweetalert2";

import { fetchImage, fetchNoToken, fetchWithToken } from "../../../helpers/fetch";
import { types } from "../types/types";


const searchUsers = (search) =>
{
    return async(dispatch) =>
    {
        const res = await fetchNoToken(`explore/${search}`);
        const { user } = await res.json();

        if (user)
        {
            dispatch({
                type: types.viewUsers,
                payload: user
            });
        }
    }
}

const editUser = (data, history) =>
{
    return async(dispatch) =>
    {
        const { name, password, image: fileImage, oldImage } = data;
        console.log('edita')

        // En caso de no subir la imagen dejo la imagen antigua como está
        let image = oldImage;

        // Si modifico la imagen la cambio con la anterior
        if (fileImage.lastModified)
        {
            image = fileImage.name;

            // Subo la nueva imagen y mando la antigua para borrarla de la API (Siempre que no sea el avatar por defecto)
            const resNewImage = await fetchImage('upload/avatar', fileImage, 'POST', oldImage);
            const { resp: { nameImgUpload } } = await resNewImage.json();

            // Guardo el nuevo nombre para editar la información en la BD
            image = nameImgUpload;
        }

        // Edito los datos en la base de datos
        const res = await fetchWithToken('user', { name, password, image }, 'PUT');
        const { user } = await res.json();
       
        if (user)
        {
            localStorage.setItem('user', JSON.stringify(user));

            dispatch({
                type: types.login,
                payload: user
            });

            Swal.fire('Has editado los datos', 'Tus datos de usuario han sido editados con éxito', 'success');

            history.replace('/home');
        }
    }
}

const deleteUser = () =>
{
    return async(dispatch) =>
    {
        const res = await fetchWithToken('user', {}, 'DELETE');
        await res.json();

        // Elimino la sesión actual
        dispatch({ type: types.logout });
    }
}

export
{
    searchUsers,
    editUser,
    deleteUser
}