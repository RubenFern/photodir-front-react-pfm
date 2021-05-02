import Swal from "sweetalert2";

import { fetchNoToken } from "../../../helpers/fetch";
import { types } from "../types/types"

const startLogin = (user_name, password) =>
{
    // Con Thunk realizo el return de forma sícncrona a mi API para recibir los datos del usuario
    return async(dispatch) =>
    {
        const res = await fetchNoToken('login', {user_name, password}, 'POST');
        const { logged, token, user, message, errors = [] } = await res.json();

        // Si el login es correcto
        if (logged)
        {
            // Almaceno los datos
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            /**
             * Una vez guardo el Token, guardo los datos de usuario en el state de Redux para
             * poder acceder a ellos desde toda la apliación
             */
            dispatch(authLogin(user));
        } else if (errors.length > 0)
        {
            Swal.fire('Ups', errors[0].msg, 'error');
        } else
        {
            Swal.fire('Ups', message, 'error');
        }
    }
}

const authLogin = (data) =>
({
    type: types.login,
    payload: data
});

const startRegister = (data) =>
{
    return async(dispatch) =>
    {
        const res = await fetchNoToken('registro', data, 'POST');
        const { logged, message, errors = [] } = await res.json();
        
        if (logged)
        {
            const { user_name, password } = data;

            // Si el registro se hizo correctamente llamo al startLogin para que el usuario 
            //inicie sesión y genere su token
            dispatch(startLogin(user_name, password));

        } else if (errors.length > 0)
        {
            Swal.fire('Ups', errors[0].msg, 'error');
        } else
        {
            Swal.fire('Ups', message, 'error');
        }
    }
}

const startLogout = () =>
{
    return (dispatch) =>
    {
        localStorage.clear();

        dispatch({ type: types.logout });
    }
}

export 
{
    startLogin,
    startRegister,
    startLogout
}