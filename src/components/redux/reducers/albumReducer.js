import { types } from "../types/types";

const initialState = [];

export const albumReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case types.viewAlbums:
            return {
                album: action.payload
            }
            
        case types.addAlbum:
            const { album } = state;
            return [
                ...album,
                action.payload
            ]

        default:
            return state;
    }
}