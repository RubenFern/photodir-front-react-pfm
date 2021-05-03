import { types } from "../types/types";

const initialState = [];

export const albumReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case types.viewAlbums:
            return {
                ...state,
                album: action.payload
            }
            
        case types.addAlbum:
            return {
                
            }

        default:
            return state;
    }
}