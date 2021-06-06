import { back } from "../../../helpers/back";
import { fetchNoToken } from "../../../helpers/fetch";
import { getImageNoToken } from "../../../helpers/getImage";
import { types } from "../types/types";


const getUser = (search, history) =>
{
    return async(dispatch) =>
    {
        const res = await fetchNoToken(`user/${search}`);
        const { user } = await res.json();

        if (!user)
        {
            back(history);

            return;
        }

        dispatch({
            type: types.explore,
            payload: user
        });
    }
}

const getAlbums = (path, history) =>
{
    return async(dispatch) =>
    {
        // Uso un path variable para usar la función en el home del usuario conectado, y cuando se busque por usuario
        const res = await fetchNoToken(`albumes/${path}`);
        const { albums } = await res.json();

        await getImageNoToken({ type: albums, user_name: path, folder: 'album' });

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

        await getImageNoToken({ type: photos, user_name, folder: 'photo' });

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

        await getImageNoToken({ type: photo, user_name, folder: 'photo' });

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

export
{
    getUser,
    getAlbums,
    getPhotos, 
    getPhoto
}