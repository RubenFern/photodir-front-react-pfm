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
            // Retorno la imagen editada
            return action.payload
            
            
        case types.deletePhoto:
            // Filtro para no añadir el eliminado
            //return state.filter( photo => photo.uid !== action.payload.uid);
            return action.payload

        // Case para eliminar fotografrías desde el panel de administrador
        case types.deletePhotoFromUser:
            return state.filter( photo => photo.uid !== action.payload.uid);

        case types.emptyGlobal:
            return initialState;    

        default:
            return state;
    }
}