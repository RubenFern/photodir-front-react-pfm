import { types } from "../types/types";
import { fetchWithToken } from "../../../helpers/fetch";
import Swal from "sweetalert2";

const getUsers = () =>
{
    return async(disptach) =>
    {
        const res = await fetchWithToken('panel/users');
        const { users } = await res.json();

        if (users)
        {
            disptach({
                type: types.getUsers,
                payload: users
            });
        }
    }
}

const setRole = (user_name, authUserName) =>
{
    return async(dispatch) =>
    {
        const res = await fetchWithToken('panel/setadmin', { user_name }, 'PUT');
        const { message, user } = await res.json();

        if (user)
        {
            Swal.fire('¡Rol cambiado!', `${message}`, 'success');

            dispatch({
                type: types.setRole,
                payload: user
            });

            // Si el usuario que cambió el rol es admin y estando logueado el actualizo el estado de autenticación para expulsarlo de las rutas del administrador
            if (user_name === authUserName)
            {
                dispatch({
                    type: types.login,
                    payload: user
                });
            }            
        }  
    }
}

const deleteUser = (user_name) =>
{
    return async(dispatch) =>
    {
        const res = await fetchWithToken('panel', { user_name }, 'DELETE');
        const { message } = await res.json();

        if (message)
        {
            Swal.fire(`${message}`, 'Se han borrado todos sus datos de Photodir', 'success');

            dispatch({
                type: types.reloadTrue
            });

            dispatch({
                type: types.deleteUser,
                payload: user_name
            });
        }
    }
}

export
{
    getUsers,
    setRole,
    deleteUser
}