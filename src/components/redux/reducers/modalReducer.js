import { types } from "../types/types";

const initialState = 
{
    modalOpen: false
};

export const modalReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case types.openModal:
            // El payolad contiene los datos del usuario
            return {
                modalOpen: true
            }    

        case types.closeModal:
            return {
                modalOpen: false
            };    

        default:
            return state;
    }
}