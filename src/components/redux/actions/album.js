import { fetchImage, fetchNoToken, fetchWithToken } from "../../../helpers/fetch";
import { types } from "../types/types";


const getAlbums = (path) =>
{
    return async(dispatch) =>
    {
        // Uso un path variable para usar la función en el home del usuario conectado, y cuando se busque por usuario
        const res = await fetchNoToken(`albumes/${path}`);
        const { albums } = await res.json();

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
        const { name, description, infoImagen } = data;

        // Si el usuario añadió una imagen la guardo, si no Mongo le asigna por la imagen por defecto
        if (infoImagen)
        {
            // Añado el álbum en la base de datos
            const { imagen } = infoImagen;
            const res = await fetchWithToken('albumes', {name, description, imagen}, 'POST');
            const { album: { image, ...data } } = await res.json();
            

            // Guardo la imagen en mi API
            const resSaveImage = await fetchImage('upload/album', infoImagen, 'POST');
            const { resp: { nameImgUpload } } = await resSaveImage.json();
          
            console.log(nameImgUpload)
            console.log(data)

            dispatch({
                type: types.addAlbum,
                payload: data
            });

        } else
        {
            // Añado el álbum en la base de datos
            const res = await fetchWithToken('albumes', {name, description}, 'POST');
            const { album } = await res.json();

            dispatch({
                type: types.addAlbum,
                payload: album
            });
        }       

        
    }
}

export 
{
    getAlbums,
    addAlbum
}