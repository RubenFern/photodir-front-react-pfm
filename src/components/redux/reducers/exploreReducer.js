import { types } from "../types/types";

const initialState = {};

export const exploreReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case types.explore:
            return action.payload
            
        //case types.emptyGlobal:
        //    return initialState;

        default:
            return state;
    }
}