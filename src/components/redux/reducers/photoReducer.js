import { types } from "../types/types";

const initialState = [];

export const photoReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case types.viewPhotos:
            return action.payload
            
        case types.addPhoto:
            return [
                ...state,
                action.payload
            ]
        
        case types.editPhoto:
            return state.map(
                // Si el id de la iteracion es igual al que edité, devuelvo el editado, si no el objeto original
                photo => (photo.uid === action.payload.uid) ? action.payload : photo
            )
        
        case types.deletePhoto:
            // Filtro para no añadir el eliminado
            return state.filter( photo => photo.uid !== action.payload.uid);

        default:
            return state;
    }
}