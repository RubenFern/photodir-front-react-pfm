import React from 'react';
import { useSelector } from 'react-redux';

import { AddPhotoForm } from './AddPhotoForm';
import { EditPhotoForm } from './EditPhotoForm';


export const PhotoModal = ({closeModal, album}) => 
{
    const { action } = useSelector(state => state.modal);

    return (
        (action === 'añadir') ? <AddPhotoForm closeModal={closeModal} album={album} /> : <EditPhotoForm  closeModal={closeModal} />
    )
}
