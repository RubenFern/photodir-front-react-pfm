import React from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { types } from '../../../redux/types/types';

import { PhotoModal } from './PhotoModal';
import { AlbumModal } from './AlbumModal';

import './Modal.css';

// Dimensión de React-Modal
const customStyles = 
{
    content: 
    {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};
ReactModal.setAppElement('#root');

export const FormModal = ({tipo, album = {}}) => 
{
    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.modal)   

    const closeModal = () =>
    {
        dispatch({type: types.closeModal});
    }

    return (
        <ReactModal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={250}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <button type="button" className="btn-close btn-close-white" onClick={closeModal} aria-label="Close"></button>
        {
            // Reutilizo el modal y llamo a los componentes dependiendo la página en la que esté
            (tipo === 'album') ? <AlbumModal key={album.uid} closeModal={closeModal} /> : <PhotoModal key={album.uid} closeModal={closeModal} album={album} />
        }
        </ReactModal>
    )
}
