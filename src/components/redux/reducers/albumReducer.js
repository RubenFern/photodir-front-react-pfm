import { types } from "../types/types";

export const albumReducer = (state = [], action) =>
{
    switch (action.type) {
        case types.viewAlbums:
            return {

            }
            
        case types.addAlbum:
            return {
                
            }

        default:
            return state;
    }
}