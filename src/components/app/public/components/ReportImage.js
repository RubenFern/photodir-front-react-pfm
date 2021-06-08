import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { onlyUsersAuth, reportImage } from '../helpers/reportImage'

export const ReportImage = ({ category, image, user_reported }) => 
{
    const { logged, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // Si está autenticado muestro el mensaje para reportar o el aviso de que se requiere estar autenticado
    return (
        <i 
            className="mx-4 bi bi-exclamation-triangle fs-4 text-danger pointer"
            onClick={(logged) ? () => reportImage(dispatch, category, image, user_reported, user.user_name) : onlyUsersAuth}
        ></i>
    )
}
