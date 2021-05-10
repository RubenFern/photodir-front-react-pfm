import { types } from "../types/types";

const initialState = 
{
    modalOpen: false,
    action: '',
    data: 
    {
        name: '',
        image: '',
        description: ''
    }
};

export const modalReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case types.openModal:
            // El payolad contiene los datos del usuario
            return {
                modalOpen: true,
                action: action.payload,
                data: action.data
            }    

        case types.closeModal:
            return {
                modalOpen: false,
                action: '',
                data: 
                {
                    name: '',
                    image: '',
                    description: ''
                }
            };    

        default:
            return state;
    }
}