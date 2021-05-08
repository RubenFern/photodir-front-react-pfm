import React from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { types } from '../../redux/types/types';
import { AlbumModal } from './components/AlbumModal';
import { PhotoModal } from './components/PhotoModal';


// CSS de React-Modal
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};
ReactModal.setAppElement('#root');

export const FormModal = ({tipo, album}) => 
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
          //onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          closeTimeoutMS={250}
          className="modal"
          overlayClassName="modal-fondo"
        >
        {
            // Reutilizo el modal y llamo a los componentes dependiendo la página en la que esté
            (tipo === 'album') ? <AlbumModal closeModal={closeModal} /> : <PhotoModal closeModal={closeModal} album={album} />
        }
        </ReactModal>

        
    )
}
