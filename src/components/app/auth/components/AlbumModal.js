import React from 'react';
import { useSelector } from 'react-redux';

import { AddAlbumForm } from './AddAlbumForm';
import { EditAlbumForm } from './EditAlbumForm';

export const AlbumModal = ({ closeModal }) => 
{
    /**
     * Dependiendo de la acción (añadir o editar) devuelvo un componente u otro. Estos componentes contiene los formularios
     * con sus métodos
     */
    const { action } = useSelector(state => state.modal);

    return (
        (action === 'añadir') ? <AddAlbumForm closeModal={closeModal} /> : <EditAlbumForm  closeModal={closeModal} />
    )
}
