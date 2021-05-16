import { types } from "../types/types";

const dataUser = () =>
{
    /**
     * Si existe el usuario en el localStorage significa que está logueado y lo retorno
     */
    if (JSON.parse(localStorage.getItem('user')))
    {
        return {
            logged: true,
            user: JSON.parse(localStorage.getItem('user'))
        }

    } else
    {
        return {
            logged: false,
            user: {}
        }
    }
}

const initialState = dataUser();

export const authReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case types.login:
            // El payolad contiene los datos del usuario
            return {
                user: action.payload, // Recibo los datos del dispatch
                logged: true
            }    

        case types.logout:
            return {
                logged: false,
                user: {}
            } 

        default:
            return state;
    }
}