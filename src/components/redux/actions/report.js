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

        // Realizo las peticiones a la ruta del administrador para obtener la imagen
        for(let i in reports) 
        {
            const res2 = await fetchWithToken(`panel/image/${reports[i].user_reported}/${reports[i].category}/${reports[i].name_image_reported}`);
            const pathImage = await res2.blob();

            const image = URL.createObjectURL(pathImage);

            reports[i].fileImage = image;
        }

        dispatch({
            type: types.reports,
            payload: reports
        });
    }
}

const approve = (uid_image_reported) =>
{
    return async() =>
    {
        const res = await fetchWithToken(`report/`, { uid_image_reported, state: 'approved' }, 'PUT');
        const { message } = await res.json();

        if (message)
        {
            Swal.fire('Reporte aprobado', `${message}`, 'success');
        }
    }
}

const reject = (uid_image_reported) =>
{
    return async(dispatch) =>
    {
        
    }
}

export
{
    addReport, 
    getReports,
    approve,
    reject
}