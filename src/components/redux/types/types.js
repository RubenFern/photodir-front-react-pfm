/**
 * Tipos de acciones que ejecutará el Reducer
*/

export const types = 
{
    login: '[Auth] login',
    register: '[Auth] register', 
    logout: '[Auth] logout',

    openModal: '[Modal] Open',
    closeModal: '[Modal] Close',

    viewAlbums: '[Album] viewAlbums',
    addAlbum: '[Album] addAlbum',
    editAlbum: '[Album] editAlbum',
    deleteAlbum: '[Album] deleteALbum',

    viewPhotos: '[Photo] viewPhotos',
    addPhoto: '[Photo] addPhoto',
    editPhoto: '[Photo] editPhoto',
    deletePhoto: '[Photo] deletePhoto',

    viewUsers: '[Users] viewUsers',

    explore: '[Explore] explore',

    reloadTrue: '[Reload] reloadTrue',
    reloadFalse: '[Reload] reloadFalse',

    like: '[Like] like',
    notlike: '[Like] notLike'
}