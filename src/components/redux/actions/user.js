import { fetchNoToken } from "../../../helpers/fetch";
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

export
{
    searchUsers
}