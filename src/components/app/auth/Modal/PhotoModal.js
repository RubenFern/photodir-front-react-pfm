import React from 'react';
import { useSelector } from 'react-redux';

import { AddPhoto } from '../Album/Forms/AddPhoto';
import { EditPhoto } from '../Photos/Form/EditPhoto';


export const PhotoModal = ({ closeModal, album }) => 
{
    const { action } = useSelector(state => state.modal);

    return (
        (action === 'añadir') ? <AddPhoto closeModal={closeModal} album={album} /> : <EditPhoto  closeModal={closeModal} />
    )
}
