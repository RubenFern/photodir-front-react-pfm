import { fetchImage, fetchNoToken, fetchWithToken } from "../../../helpers/fetch";
import { getImageNoToken, getImageToken } from "../../../helpers/getImage";
import { types } from "../types/types";

const getPhotos = (path, history) =>
{
    return async(dispatch) =>
    {
        const { user_name, album } = path;

        // Uso un path variable para usar la función en el home del usuario conectado, y cuando se busque por usuario
        const res = await fetchNoToken(`fotografias/${user_name}/${album}`);
        const { photos } = await res.json();
        
        // Si no existe la imagen vuelvo al home
        if (photos === undefined)
        {
            history.replace('/home');
            return;
        }

        await getImageToken({ type: photos, user_name, folder: 'photo' });

        dispatch({
            type: types.viewPhotos,
            payload: photos
        });
    }
}

const getPhoto = (path, history) =>
{
    return async(dispatch) =>
    {
        const { image, user_name } = path;

        const res = await fetchNoToken(`fotografias/${image}`);
        const { photo } = await res.json();
        
        // Si no existe la imagen vuelvo al home
        if (photo === undefined)
        {
            history.replace('/home');
            return;
        }

        await getImageToken({ type: photo, user_name, folder: 'photo' });

        // Guardo los likes de la imagen
        const res2 = await fetchNoToken(`likesphoto/${photo.image}`);
        const { likes } = await res2.json();

        photo.likes = likes;

        dispatch({
            type: types.viewPhotos,
            payload: photo
        });
    }
}

const addPhoto = (data, album) =>
{
    return async(dispatch) =>
    {
        const { user_name, title, description, image } = data;

        // Sólo creo la publicación si subió una imagen
        if (image !== null)
        {
            // Alamceno la imagen en la API 
            const resSaveImage = await fetchImage('upload/photo', image, 'POST');
            const { resp: { nameImgUpload } } = await resSaveImage.json();
            
            // Almaceno el álbum en la base de datos
            const res = await fetchWithToken(`fotografias/${album}`, {title, description, image: nameImgUpload}, 'POST');
            const { photo } = await res.json();

            // Creo la ruta de la nueva imagen
            await getImageNoToken({ type: photo, user_name, folder: 'photo' });
                
            dispatch({
                type: types.addPhoto,
                payload: photo
            });
        } 
    }
}

const editPhoto = (data) =>
{
    return async(dispatch) =>
    {
        const { user_name, uid, title, description } = data;

        const res = await fetchWithToken(`fotografias/${uid}`, {title, description}, 'PUT');
        const { photo } = await res.json();

        if (photo)
        {
            // Creo la ruta de la nueva imagen
            await getImageNoToken({ type: photo, user_name, folder: 'photo' });

            dispatch({
                type: types.editPhoto,
                payload: photo
            });

            // Activo la recarga
            dispatch({
                type: types.reloadTrue
            });
        }
    }
}

const deletePhoto = (data) =>
{
    return async(dispatch) =>
    {
        const { uid, image } = data;

        const res = await fetchWithToken(`fotografias/${uid}`, {image}, 'DELETE');
        const { photo } = await res.json();

        dispatch({
            type: types.deletePhoto,
            payload: photo
        });
    }
}

export 
{
    getPhotos,
    getPhoto,
    addPhoto,
    editPhoto,
    deletePhoto
}