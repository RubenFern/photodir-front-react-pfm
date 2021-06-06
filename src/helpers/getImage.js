import { fetchNoToken, fetchWithToken } from "./fetch";

const getImageToken = async(data) =>
{
    const { type = [], user_name, folder } = data;

    // Hago la petición 
    if (type.length > 0)
    {
        for(let i in type) 
        {
            const res2 = await fetchWithToken(`upload/token/${folder}/${user_name}/${type[i].image}`);
            const pathImage = await res2.blob();

            const image = URL.createObjectURL(pathImage);

            type[i].fileImage = image;
        }
    } else
    {
        const res2 = await fetchWithToken(`upload/token/${folder}/${user_name}/${type.image}`);
        const pathImage = await res2.blob();

        const image = URL.createObjectURL(pathImage);

        type.fileImage = image;
    }
}

const getImageNoToken = async(data) =>
{
    const { type = [], user_name, folder } = data;

    if (type.length > 0)
    {
        for(let i in type) 
        {
            const res2 = await fetchNoToken(`upload/notoken/${folder}/${user_name}/${type[i].image}`);
            const pathImage = await res2.blob();

            const image = URL.createObjectURL(pathImage);

            type[i].fileImage = image;
        }
    } else
    {
        const res2 = await fetchNoToken(`upload/notoken/${folder}/${user_name}/${type.image}`);
        const pathImage = await res2.blob();

        const image = URL.createObjectURL(pathImage);

        type.fileImage = image;
    }
}

export
{
    getImageToken,
    getImageNoToken
}