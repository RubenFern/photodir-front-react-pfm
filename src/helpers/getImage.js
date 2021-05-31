import { fetchWithToken } from "./fetch";

const getImage = async(data) =>
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

export 
{
    getImage
}