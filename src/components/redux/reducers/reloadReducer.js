import { types } from "../types/types";

const initialState = false;

export const reloadReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case types.reloadTrue:
            // El payolad contiene los datos del usuario
            return true  

        case types.reloadFalse:
            return false

        default:
            return state;
    }
}