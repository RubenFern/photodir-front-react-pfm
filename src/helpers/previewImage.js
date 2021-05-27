import { validateUpload } from "./validateUpload";

const previewImage = (e, setimage, setpath) =>
{
    /*
     * Función para mostrar una imagen preliminar de la fotografía que subirá el usuario.
     * Cuenta con la función set de la imagen real que se subirá a la API y el set del path
     * que solo visualiza la imagen preliminar. 
     * 
     * Si el archivo no es válido, no modifica ninguna función por lo que nunca se podrá subir
     * un archivo que no sea una imagen.
     */
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