import { types } from "../types/types";

const initialState = {};

export const userReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case types.viewUsers:
            return action.payload

        default:
            return state;
    }
}