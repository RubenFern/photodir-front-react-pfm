import { fetchNoToken, fetchWithToken } from "../../../helpers/fetch";
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

export 
{
    getAlbums,
}