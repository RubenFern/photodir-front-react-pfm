import { fetchNoToken, fetchWithToken } from "../../../helpers/fetch";
import { getImagesFavorites } from "../../../helpers/getImage";
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

const addLike = (user_name, image) =>
{
    return async(dispatch) =>
    {
        const res = await fetchWithToken('likesphoto/addlike', {user_name, image}, 'POST');
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

const getFavImages = (user_name) =>
{
    return async(dispatch) =>
    {
        const res = await fetchNoToken(`likesphoto/imagesliked/${user_name}`);
        const { photos } = await res.json();

        console.log(photos)

        if (photos.length)
        {
            await getImagesFavorites(photos);

            dispatch({
                type: types.viewPhotos,
                payload: photos
            });
        }
    }
}

export
{
    checkLike,
    addLike,
    removeLike,
    getFavImages
}