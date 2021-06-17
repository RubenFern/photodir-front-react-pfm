import { types } from "../types/types";

const initialState = [];

export const reportReducer = (state = initialState, action) => 
{
    switch (action.type) {
        case types.reports:
            return action.payload

        case types.stateReport:
            return state.map(
                // Si el id del reporte es igual al que cambié, devuelvo el cambiado, si no el reporte original
                report => (report.uid === action.payload.uid) ? action.payload : report
            )

        case types.emptyGlobal:
            return initialState;

        default:
            return state;
    }
}
