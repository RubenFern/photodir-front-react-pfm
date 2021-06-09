import { types } from "../types/types";

const initialState = {};

export const searchReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case types.viewUsers:
            return action.payload

        case types.emptyUsers:
            return {};

        default:
            return state;
    }
}