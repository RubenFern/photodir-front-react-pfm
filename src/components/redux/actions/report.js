import Swal from "sweetalert2";
import { fetchWithToken } from "../../../helpers/fetch";
import { types } from "../types/types";

const addReport = (data) =>
{
    return async() =>
    {
        const report = await fetchWithToken('report/', data, 'POST');
        const { message } = await report.json();

        if (message)
        {
            Swal.fire(`${message}`, '¡Gracias por ayudar a tener una comunidad más limpia!', 'success');
        }
    }
}

const getReports = () =>
{
    return async(dispatch) =>
    {
        const res = await fetchWithToken('report/');
        const { reports } = await res.json();

        if (!reports) { return; }

        // Realizo las peticiones a la ruta del administrador para obtener la imagen
        for(let i in reports) 
        {
            const mimeValid = ['image/png', 'image/gif', 'image/svg', 'image/jpeg'];

            const res2 = await fetchWithToken(`panel/image/${reports[i].user_reported}/${reports[i].category}/${reports[i].name_image_reported}`);
            const pathImage = await res2.blob();

            // Compruebo si la imagen blob es válida, si lo es retorno la imagen, sino undefined
            if (mimeValid.includes(pathImage.type))
            {
                const image = URL.createObjectURL(pathImage);

                reports[i].fileImage = image;
            } else
            {
                reports[i].fileImage = undefined;
            }
        }

        dispatch({
            type: types.reports,
            payload: reports
        });
    }
}

const changeState = (uid_image_reported, state) =>
{
    return async(dispatch) =>
    {
        const res = await fetchWithToken(`report/`, { uid_image_reported, state }, 'PUT');
        const data = await res.json();

        if (data.message)
        {
            Swal.fire(`Reporte ${ (state === 'approved') ? 'aprobado' : 'rechazado' }`, `${data.message}`, 'success');

            dispatch({
                type: types.stateReport,
                payload: data.report
            });

            dispatch({
                type: types.reloadTrue
            });
        }
    }
}

export
{
    addReport, 
    getReports,
    changeState
}