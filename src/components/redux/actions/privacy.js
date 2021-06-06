import { fetchWithToken } from "../../../helpers/fetch";
import { types } from "../types/types";

const setPrivacy = (state) =>
{
    return async(dispatch) =>
    {
        // Edito los datos en la base de datos
        const res = await fetchWithToken('user', { private_profile: !state }, 'PUT');
        const { user } = await res.json();
       
        if (user)
        {
            localStorage.setItem('user', JSON.stringify(user));

            dispatch({
                type: types.login,
                payload: user
            });
        }
    }
}

export
{
    setPrivacy
}