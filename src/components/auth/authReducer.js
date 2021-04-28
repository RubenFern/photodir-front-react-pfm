import { types } from "../types/types";

export const authReducer = (state = {}, action) => 
{
    /**
     * Retorno siempre un booleano para saber si el usuario está o no conectado. En el login añado un 
     * payload para poder almacenar cualquier datos adicional.
    */ 
    switch (action.type) {
        case types.login:
            
            return {
                ...action.payload,
                logged: true
            }

        case types.logout:

            return {
                logged: false
            }
    
        default:
            break;
    }    
}
