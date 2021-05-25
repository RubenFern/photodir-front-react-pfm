import Swal from "sweetalert2";
import { fetchImage, fetchNoToken, fetchWithToken } from "../../../helpers/fetch";
import { validateUpload } from "../../../helpers/validateUpload";
import { types } from "../types/types";


const getAlbums = (path, history) =>
{
    return async(dispatch) =>
    {
        // Uso un path variable para usar la función en el home del usuario conectado, y cuando se busque por usuario
        const res = await fetchNoToken(`albumes/${path}`);
        const { albums } = await res.json();

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
        const { name, description, infoImage } = data;
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
        const res = await fetchWithToken('albumes', {name, description, image}, 'POST');
        const { success = false, message, album, errors = [] } = await res.json();

        if (success)
        {
            dispatch({
                type: types.addAlbum,
                payload: album
            });

            // Activo la recarga
            dispatch({
                type: types.reloadTrue
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
        const { name, image: fileImage, description, oldName, oldImage } = data;
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
        const res = await fetchWithToken(`albumes/${oldName}`, {name, image, description}, 'PUT');
        const album = await res.json();

        dispatch({
            type: types.editAlbum,
            payload: album
        });

        // Activo la recarga
        dispatch({
            type: types.reloadTrue
        });
    }
}

const deleteAlbum = (data) =>
{
    return async(dispatch) =>
    {
        const { image, name } = data;
        const res = await fetchWithToken(`albumes/${name}`, {image}, 'DELETE');
        const { album } = await res.json();

        dispatch({
            type: types.deleteAlbum,
            payload: album
        });

        // Activo la recarga
        dispatch({
            type: types.reloadTrue
        });
    }
}

export 
{
    getAlbums,
    addAlbum,
    editAlbum,
    deleteAlbum
}