import { fetchNoToken } from "./fetch";

const getAlbums = async(name) =>
{
    const res = await fetchNoToken(`albumes/${name}`, {}, 'GET');
    const { albums } = await res.json();

    return albums;
}

export {
    getAlbums
}