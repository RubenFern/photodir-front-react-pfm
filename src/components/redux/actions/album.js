import Swal from "sweetalert2";

import { fetchImage, fetchNoToken, fetchWithToken } from "../../../helpers/fetch";
import { getImageToken } from "../../../helpers/getImage";
import { validateUpload } from "../../../helpers/validateUpload";
import { types } from "../types/types";

const getAlbums = (path, history) =>
{
    return async(dispatch) =>
    {
        // Uso un path variable para usar la función en el home del usuario conectado, y cuando se busque por usuario
        const res = await fetchNoToken(`albumes/${path}`);
        const { albums } = await res.json();

        await getImageToken({ type: albums, user_name: path, folder: 'album' });

        if (albums === undefined)
        {
            history.replace('/home');
            return;
        }

        dispatch({
            type: types.viewAlbums,
            payload: albums
        });
    }
}

const addAlbum = (data) =>
{
    return async(dispatch) =>
    {
        const { user_name, name, description, infoImage } = data;
        let image = undefined;

        // Si el usuario añadió una imagen la guardo, si no le asigno la imagen por defecto mediante la API
        if (infoImage)
        {
            const type = infoImage.type;

            // Realizo una segunda comprobación
            if (!validateUpload(type))
            {
                Swal.fire('Ups', 'El archivo que has subido no es válido', 'error');
                return;
            }

            // Almaceno la imagen en la API 
            const resSaveImage = await fetchImage('upload/album', infoImage, 'POST');
            const { resp: { nameImgUpload } } = await resSaveImage.json();
            
            // Guardo el nuevo nombre de la imagen 
            image = nameImgUpload;
        }

        // Almaceno el álbum en la base de datos
        const res = await fetchWithToken('albumes', { name, description, image }, 'POST');
        const { success = false, message, album, errors = [] } = await res.json();

        if (success)
        {
            // Obtengo su imagen
            await getImageToken({ type: album, user_name, folder: 'album' });

            dispatch({
                type: types.addAlbum,
                payload: album
            });
        } 
        else if (errors.length > 0)
        {
            Swal.fire('Ups', errors[0].msg, 'error');
        } 
        else
        {
            Swal.fire('Ups', message, 'error');
        }
    }
}

const editAlbum = (data) =>
{
    return async(dispatch) =>
    {
        const { user_name, name, image: fileImage, description, oldName, oldImage } = data;
        let image = oldImage;

        // Si modificó la imagen elimino la anterior y la cambio por la nueva la almaceno en la API
        if (fileImage.lastModified)
        {
            image = fileImage.name;

            const resSaveImage = await fetchImage('upload/album', fileImage, 'POST', oldImage);
            const { resp: { nameImgUpload } } = await resSaveImage.json();

            // Guardo la nueva imagen
            image = nameImgUpload;
        }

        // Modifico los campos
        const res = await fetchWithToken(`albumes/${oldName}`, { name, image, description }, 'PUT');
        const { success = false, album, message, errors = [] } = await res.json();

        if (success)
        {
            await getImageToken({ type: album, user_name, folder: 'album' });

            dispatch({
                type: types.editAlbum,
                payload: album
            });
        } else if (errors.length > 0)
        {
            Swal.fire('Ups', errors[0].msg, 'error');
        } 
        else
        {
            Swal.fire('Ups', message, 'error');
        }
    }
}

const deleteAlbum = (data) =>
{
    return async(dispatch) =>
    {
        const { image, name } = data;
        const res = await fetchWithToken(`albumes/${name}`, { image }, 'DELETE');
        const { album } = await res.json();

        dispatch({
            type: types.deleteAlbum,
            payload: album
        });
    }
}

const deleteImage = (user_name, name) =>
{
    return async(dispatch) =>
    {
        const res = await fetchWithToken(`albumes/image/${name}`, { }, 'DELETE');
        const { album, error } = await res.json();

        if (album)
        {
            await getImageToken({ type: album, user_name, folder: 'album' });

            // Sobreeescribo los datos de usuario para almacenar el nuevo avatar
            dispatch({
                type: types.editAlbum,
                payload: album
            });
        } else if (error)
        {
            Swal.fire('Ups', error, 'error');
        } else
        {
            Swal.fire('Ups', 'Ha ocurrido un error', 'error');
        }
    }
}

export 
{
    getAlbums,
    addAlbum,
    editAlbum,
    deleteAlbum,
    deleteImage
}