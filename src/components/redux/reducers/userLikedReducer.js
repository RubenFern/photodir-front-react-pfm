import { types } from "../types/types";

const initialState = false;

export const userLikedReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case types.like:
            return true;

        case types.notlike:
            return false;

        default:
            return state;
    }
}