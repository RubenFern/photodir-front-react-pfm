import React from 'react';
import { useSelector } from 'react-redux';

import { AddAlbum } from '../Home/Forms/AddAlbum';
import { EditAlbum } from '../Home/Forms/EditAlbum';

export const AlbumModal = ({ closeModal }) => 
{
    /**
     * Dependiendo de la acción (añadir o editar) devuelvo un componente u otro. Estos componentes contiene los formularios
     * con sus métodos
     */
    const { action } = useSelector(state => state.modal);

    return (
        (action === 'añadir') ? <AddAlbum closeModal={closeModal} /> : <EditAlbum  closeModal={closeModal} />
    )
}
