import { fetchImage, fetchNoToken, fetchWithToken } from "../../../helpers/fetch";
import { types } from "../types/types";

const getPhotos = (path) =>
{
    return async(dispatch) =>
    {
        // Uso un path variable para usar la función en el home del usuario conectado, y cuando se busque por usuario
        const res = await fetchNoToken(`fotografias/${path}`);
        const { photos } = await res.json();

        dispatch({
            type: types.viewPhotos,
            payload: photos
        });
    }
}

const addPhoto = (data, album) =>
{
    return async(dispatch) =>
    {
        const { title, description, image } = data;

        // Sólo creo la publicación si subió una imagen
        if (image !== null)
        {
            // Alamceno la imagen en la API 
            const resSaveImage = await fetchImage('upload/photo', image, 'POST');
            const { resp: { nameImgUpload } } = await resSaveImage.json();
            
            // Almaceno el álbum en la base de datos
            const res = await fetchWithToken(`fotografias/${album}`, {title, description, image: nameImgUpload}, 'POST');
            const photo = await res.json();
                
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
        const { uid, title, description } = data;

        const res = await fetchWithToken(`fotografias/${uid}`, {title, description}, 'PUT');
        const { photo } = await res.json();

        dispatch({
            type: types.editPhoto,
            payload: photo
        });
    }
}

const deletePhoto = (data) =>
{
    return async(dispatch) =>
    {
        const { uid, image } = data;

        const res = await fetchWithToken(`fotografias/${uid}`, {image}, 'DELETE');
        const { photo } = await res.json();
        console.log(photo)

        dispatch({
            type: types.deletePhoto,
            payload: photo
        });
    }
}

export 
{
    getPhotos,
    addPhoto,
    editPhoto,
    deletePhoto
}