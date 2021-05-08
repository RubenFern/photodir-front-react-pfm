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
        console.log(image)
        // Si el usuario añadió una imagen la guardo, si no le asigno la imagen por defecto mediante la API
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

export 
{
    getPhotos,
    addPhoto
}