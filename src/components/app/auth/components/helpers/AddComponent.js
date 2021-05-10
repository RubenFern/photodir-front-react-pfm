import React from 'react';
import { useDispatch } from 'react-redux';

import { types } from '../../../../redux/types/types';

export const AddComponent = ({action}) => 
{
    const dispatch = useDispatch();

    const openModal = () =>
    {
        dispatch({
            type: types.openModal, 
            payload: 'añadir'
        });
    }

    return (
        <button 
            className="btn btn-danger h-75"
            onClick={openModal}
        >
            <i className="fa fa-plus-square" aria-hidden="true"></i>
            <span> {action}</span>
        </button>
    )
}
