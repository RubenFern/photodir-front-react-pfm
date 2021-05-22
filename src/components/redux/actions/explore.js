import { fetchNoToken } from "../../../helpers/fetch";
import { types } from "../types/types";


const getUser = (search) =>
{
    return async(dispatch) =>
    {
        const res = await fetchNoToken(`user/${search}`);
        const { user } = await res.json();

        if (user)
        {
            dispatch({
                type: types.explore,
                payload: user
            });
        }
    }
}

export
{
    getUser
}