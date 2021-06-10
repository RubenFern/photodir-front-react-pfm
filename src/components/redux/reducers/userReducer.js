import { types } from "../types/types";

const initialState = [];

export const userReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case types.getUsers:
            return action.payload

        case types.setRole:
            return state.map(
                // Si el id del reporte es igual al que cambié, devuelvo el cambiado, si no el reporte original
                role => (role.uid === action.payload.uid) ? action.payload : role
            )

        case types.deleteUser:
            // Elimino al usuario de Redux
            return state.filter( user => user.user_name !== action.payload);

        default:
            return state;
    }
}