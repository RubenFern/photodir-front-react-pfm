import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { checkLike, addLike, removeLike } from '../../../redux/actions/like';

export const Like = ({ likes, image }) => 
{
    const userliked = useSelector(state => state.userliked);
    console.log(userliked)
    
    const dispatch = useDispatch();

    // Cuando recagrue la página compurebo si el usuario dió like
    useEffect(() => 
    {
        if (image)
        {
            dispatch(checkLike(image));
        }
        
    }, [image])

    const toggleLike = ({ target }) =>
    {
        // Si se da like creo el like en la publiación
        if (target.checked)
        {
            dispatch(addLike(image));
        } else
        {
            dispatch(removeLike(image));
        }
    }

    return (
        <>
            {
                (userliked) 
                ? 
                <input id="heart" onClick={ toggleLike } type="checkbox" defaultChecked />
                :
                <input id="heart" onClick={ toggleLike } type="checkbox" />
            }
            
            <label id="lbl-heart" htmlFor="heart"><i className="bi bi-heart-fill"></i> </label>
            <label className="text-light">{likes} Me gusta</label>
        </>
    )
}
