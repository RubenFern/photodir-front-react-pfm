import { types } from "../types/types";

const initialState = [];

export const photoReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case types.viewPhotos:
            return {
                photos: action.payload
            }
            
        case types.addPhoto:
            const { photos } = state;
            return [
                ...photos,
                action.payload
            ]

        default:
            return state;
    }
}