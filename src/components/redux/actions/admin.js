import { types } from "../types/types";
import { fetchWithToken } from "../../../helpers/fetch";
import Swal from "sweetalert2";
import { back } from "../../../helpers/back";

const getUsers = () =>
{
    return async(dispatch) =>
    {
        const res = await fetchWithToken('panel/users');
        const { users } = await res.json();

        if (users)
        {
            dispatch({
                type: types.getUsers,
                payload: users
            });
        }
    }
}

const getUser = (user_name, history) =>
{
    return async(dispatch) =>
    {
        const res = await fetchWithToken(`panel/user/${user_name}`);
        const { user } = await res.json();

        // Si no existe el usuario vuelvo hacia atrás
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

const getAlbums = (user_name) =>
{
    return async(dispatch) =>
    {
        const res = await fetchWithToken(`panel/albums/${user_name}`);
        const { albums } = await res.json();

        if (albums)
        {
            // Obtengo las imágenes del usuario aunque tenga el perfil privado
            await getImages(albums, user_name, 'album');

            dispatch({
                type: types.viewAlbums,
                payload: albums
            });
        }
    }
}

const getPhotos = (user_name, album) =>
{
    return async(dispatch) =>
    {
        const res = await fetchWithToken(`panel/photos/${user_name}/${album}`);
        const { photos } = await res.json();

        if (photos)
        {
            // Obtengo las imágenes del usuario aunque tenga el perfil privado
            await getImages(photos, user_name, 'photo');

            dispatch({
                type: types.viewPhotos,
                payload: photos
            });
        }
    }
}

const setRole = (user_name, authUserName) =>
{
    return async(dispatch) =>
    {
        const res = await fetchWithToken('panel/setadmin', { user_name }, 'PUT');
        const { message, user } = await res.json();

        if (user)
        {
            Swal.fire('¡Rol cambiado!', `${message}`, 'success');

            dispatch({
                type: types.setRole,
                payload: user
            });

            // Si el usuario que cambió el rol es admin y estando logueado el actualizo el estado de autenticación para expulsarlo de las rutas del administrador
            if (user_name === authUserName)
            {
                dispatch({
                    type: types.login,
                    payload: user
                });
            }            
        }  
    }
}

const deleteUser = (user_name) =>
{
    return async(dispatch) =>
    {
        const res = await fetchWithToken('panel', { user_name }, 'DELETE');
        const { message } = await res.json();

        if (message)
        {
            Swal.fire(`${message}`, 'Se han borrado todos sus datos de Photodir', 'success');

            dispatch({
                type: types.reloadTrue
            });

            dispatch({
                type: types.deleteUser,
                payload: user_name
            });
        }
    }
}

const getImages = async(type = [], user_name, folder) =>
{
    // Hago la petición 
    if (type.length > 0)
    {
        for(let i in type) 
        {
            const res2 = await fetchWithToken(`panel/image/${user_name}/${folder}/${type[i].image}`);
            const pathImage = await res2.blob();

            const image = URL.createObjectURL(pathImage);

            type[i].fileImage = image;
        }
    } else
    {
        const res2 = await fetchWithToken(`panel/image/${user_name}/${folder}/${type.image}`);
        const pathImage = await res2.blob();

        const image = URL.createObjectURL(pathImage);

        type.fileImage = image;
    }
}

export
{
    getUsers,
    getUser,
    getAlbums,
    getPhotos,
    setRole,
    deleteUser
}