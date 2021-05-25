import { validateUpload } from "./validateUpload";

const previewImage = (e, setimage, setpath) =>
{
    const file = e.target.files[0];

    if (file)
    {
        // Si el archivo no es válido no sobreescribo los estados de las imágenes
        if (!validateUpload(file.type))
        {
            return;
        }

        setimage(file);
        setpath(URL.createObjectURL(file));
    }
}

export
{
    previewImage
}