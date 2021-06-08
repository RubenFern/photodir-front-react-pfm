import { types } from "../types/types";

const initialState = [];

export const reportReducer = (state = initialState, action) => 
{
    switch (action.type) {
        case types.reports:
            return action.payload

        default:
            return state;
    }
}
