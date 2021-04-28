import { fetchNoToken } from '../../helpers/fetch';
import { types } from '../types/types';

/**
 * Retorno el tipo que determina al useReducer que acción hacer, en este caso el login.
 * Junto con él el payload donde puedo almacenar cualquier dato mientras esté dentro de este
*/
const login = async(user_name, password, dispatch, history) =>
{
    const res = await fetchNoToken('login', {user_name, password}, 'POST');
    
    const { logged, message, token, user } = await res.json();
    const { image, is_admin: isAdmin, name, user_name: userName, email, creation_date, uid } = user;

    // Si el usuario es correcto, almaceno el Token
    if (logged)
    {
        localStorage.setItem('token', token);

        dispatch({
            type: types.login,
            payload: {
                image, 
                isAdmin, 
                name, 
                userName, 
                email, 
                creation_date, 
                uid
            }
        });

        history.replace('/home');
    }
}

const register = () =>
{

}

export 
{
    login,
    register
}