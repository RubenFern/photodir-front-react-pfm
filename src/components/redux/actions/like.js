import { fetchWithToken } from "../../../helpers/fetch";
import { types } from "../types/types";


const checkLike = (image) =>
{
    return async(dispatch) =>
    {
        const res = await fetchWithToken('likesphoto/checklike', {image}, 'POST');
        const { likeExists } = await res.json();

        if (likeExists)
        {
            dispatch({
                type: types.like
            });
        } else
        {
            dispatch({
                type: types.notlike
            });
        }
    }
}

const addLike = (image) =>
{
    return async(dispatch) =>
    {
        const res = await fetchWithToken('likesphoto/addlike', {image}, 'POST');
        await res.json();

        // Recargo la página
        dispatch({
            type: types.reloadTrue
        });
    }
}

const removeLike = (image) =>
{
    return async(dispatch) =>
    {
        const res = await fetchWithToken('likesphoto/removelike', {image}, 'POST');
        await res.json();

        // Recargo la página
        dispatch({
            type: types.reloadTrue
        });
    }
}

export
{
    checkLike,
    addLike,
    removeLike
}