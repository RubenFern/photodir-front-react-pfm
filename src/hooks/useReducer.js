import { types } from "../components/types/types"

export const reducer = (state = {}, action) => 
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
            
            return {
                ...action.payload,
                logged: false
            }
    }    
}