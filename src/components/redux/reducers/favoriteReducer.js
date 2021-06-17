import { types } from "../types/types";

const initialState = [];

export const favoriteReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case types.viewFavorites:
            return action.payload

        case types.emptyGlobal:
            return initialState;

        default:
            return state;
    }
}