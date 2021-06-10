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

    viewUsers: '[Search] viewUsers',
    emptyUsers: '[Search] emptyUsers',

    explore: '[Explore] explore',

    reloadTrue: '[Reload] reloadTrue',
    reloadFalse: '[Reload] reloadFalse',

    like: '[Like] like',
    notlike: '[Like] notLike',

    reports: '[Report - Admin] reports',
    stateReport: '[Report - Admin] stateReport',

    getUsers: '[User - Admin] getUsers',
    setRole: '[User - Admin] setRole',
    deleteUser: '[User - Admin] deleteUser',
}