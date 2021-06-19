import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { checkLike, addLike, removeLike } from '../../../redux/actions/like';
import { types } from '../../../redux/types/types';

import './Like.css';

export const Like = ({ user_name, likes, image, home = false }) => 
{
    const { user: { private_profile } } = useSelector(state => state.auth);
    const userliked = useSelector(state => state.userliked);
    
    const dispatch = useDispatch();

    // Cuando recargue la página compruebo si el usuario dió like
    useLayoutEffect(() => 
    {
        if (image)
        {
            dispatch(checkLike(image));
        }
        
        // Al salir del componente el userLiked vuelve a false
        return () =>
        {
            dispatch({
                type: types.notlike
            });
        }   
    }, [dispatch, image]);

    const toggleLike = ({ target }) =>
    {
        // Si se da like creo el like en la publiación
        if (target.checked)
        {
            if (private_profile && home)
            {
                Swal.fire('Ups', 'Tu perfil es privado y no puedes dar me gusta a las imágenes', 'error');
                return;
            }

            dispatch(addLike(user_name, image));
        } else
        {
            dispatch(removeLike(image));
        }
    }

    return (
        <div className="d-flex flex-column">
            {
                (userliked) 
                ? 
                <input id="heart" onClick={ toggleLike } type="checkbox" defaultChecked />
                :
                <input id="heart" onClick={ toggleLike } type="checkbox" />
            }
            
            <label id="lbl-heart" htmlFor="heart"><i className="bi bi-heart-fill"></i> </label>
            <label className="text-light text-center text">{likes} Me gusta</label>
        </div>
    )
}
