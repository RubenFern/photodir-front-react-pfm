import { types } from "../types/types";

const initialState = [];

export const albumReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case types.viewAlbums:
            return action.payload
            
        case types.addAlbum:
            return [
                ...state,
                action.payload
            ]

        case types.editAlbum:
            return state.map(
                // Si el id de la iteracion es igual al que edité, devuelvo el editado, si no el objeto original
                album => (album.uid === action.payload.uid) ? action.payload : album
            )

        case types.deleteAlbum:
            // Filtro para no añadir el álbum que coincida con el eliminado
            return state.filter( album => album.uid !== action.payload.uid);

        default:
            return state;
    }
}