import { fetchNoToken, fetchWithToken } from "../../../helpers/fetch";
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

const editUser = (data) =>
{
    return async(dispatch) =>
    {
        const  res = await fetchWithToken('editar-perfil', data, 'PUT');
        const { user } = await res.json();

        if (user)
        {
            dispatch({
                type: types.login,
                payload: user
            });
        }
    }
}

export
{
    searchUsers,
    editUser
}