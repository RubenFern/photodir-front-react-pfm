import React from 'react';
import { useDispatch } from 'react-redux';

import { types } from '../../redux/types/types';

export const AddAlbum = ({action}) => 
{
    const dispatch = useDispatch();

    const openModal = () =>
    {
        dispatch({type: types.openModal});
    }

    return (
        <button 
            className="btn btn-danger"
            onClick={openModal}
        >
            <i className="fa fa-plus-square" aria-hidden="true"></i>
            <span> {action}</span>
        </button>
    )
}
