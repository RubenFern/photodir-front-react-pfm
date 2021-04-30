import { fetchNoToken } from '../../helpers/fetch';
import { types } from '../types/types';

/**
 * Retorno el tipo que determina al useReducer que acción hacer, en este caso el login.
 * Junto con él el payload donde puedo almacenar cualquier dato mientras esté dentro de este
*/
const login = async(user_name, password, dispatch, history) =>
{
    const res = await fetchNoToken('login', {user_name, password}, 'POST');
    
    const { logged, message, token, user, errors = [] } = await res.json();

    // Si el usuario es correcto, almaceno el Token
    if (logged)
    {
        const { image, is_admin: isAdmin, name, user_name: userName, uid, creation_date: registerDate } = user;

        localStorage.setItem('token', token);

        dispatch({
            type: types.login,
            payload: {
                image, 
                is_admin: isAdmin, 
                name, 
                user_name: userName, 
                uid, 
                creation_date: registerDate
            }
        });

        history.replace('/home');
    } else if (errors.length > 0)
    {
        dispatch({
            payload: {
                message: errors[0].msg
            }
        });

    } else
    {
        dispatch({
            payload: {
                message
            }
        });
    }
}

const register = async(data, dispatch, history) =>
{
    const res = await fetchNoToken('registro', data, 'POST');

    const { logged, message, token, user, errors = [] } = await res.json();

    if (logged)
    {
        const { image, is_admin: isAdmin, name, user_name: userName, uid, creation_date: registerDate } = user;

        localStorage.setItem('token', token);

        dispatch({
            type: types.login,
            payload: {
                image, 
                is_admin: isAdmin, 
                name, 
                user_name: userName, 
                uid, 
                creation_date: registerDate
            }
        });

        history.replace('/home');
    } else if (errors.length > 0)
    {
        dispatch({
            payload: {
                message: errors[0].msg
            }
        });

    } else
    {
        dispatch({
            payload: {
                message
            }
        });
    }
}

export 
{
    login,
    register
}