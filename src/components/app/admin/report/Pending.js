import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { changeState } from '../../../redux/actions/report';

// Reportes pendientes de aprobar o rechazar
export const Pending = ({ pending }) => 
{
    const dispatch = useDispatch();

    const approveReport = (uid_image_reported) =>
    {
        Swal.fire(
        {
            title: 'Estás a punto de aprobar el reporte',
            text: 'Se eliminará la imagen del usuario',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aprobar',
            cancelButtonText: 'Cancelar',
            focusCancel: true
        }).then( (res) =>
        {
            if (res.isConfirmed) 
            {
                dispatch(changeState(uid_image_reported, 'approved'));
            }
        });
    }

    const rejectReport = (uid_image_reported) =>
    {
        Swal.fire(
        {
            title: 'Estás a punto de rechazar el reporte',
            text: 'La imagen del usuario no tendrá ningún cambio',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Rechazar',
            cancelButtonText: 'Cancelar',
            focusCancel: true
        }).then( (res) =>
        {
            if (res.isConfirmed) 
            {
                dispatch(changeState(uid_image_reported, 'rejected'));
            }
        });
    }

    return (
        <>
            <div className="animate__animated animate__fadeIn report mt-4">
            {
                
                pending.map( ({ uid, user_reported, uid_image_reported, reporting_user, name_image_reported, fileImage, description, creation_date }) => 
                (
                    <div key={uid} className="bg-report mb-2 rounded-5">
                        <div className="card-body rounded-5">
                            <div className="d-flex justify-content-between flex-column flex-lg-row">
                                <div className="d-flex flex-column flex-lg-row ">
                                    <img className="image-rep rounded-5" src={fileImage} alt={name_image_reported} />
                                    <div className="mt-2 mt-lg-0 text-light mx-3 d-flex flex-row flex-lg-column justify-content-around justify-content-lg-center">
                                        <div>
                                            <span>Usuario reportado:</span>
                                            <p className="text-gray mx-2">{ user_reported }</p>
                                        </div>
                                        <div>
                                            <span>Reportado por:</span>
                                            <p className="text-gray mx-2">{ reporting_user }</p>
                                        </div> 
                                    </div>
                                </div>

                                <div className="text-light d-flex flex-column justify-content-center     align-items-center mx-md-5">
                                    <h4 className="text-gray">Motivo:</h4>
                                    <p className="text-justify">
                                        { description }
                                    </p>
                                </div>

                                <div className="d-flex flex-column justify-content-around align-items-center">
                                    <p className="text-light">{ creation_date }</p>

                                    <div className="d-flex justify-content-between">
                                        <button className="mx-1 btn btn-success" onClick={ () => approveReport(uid_image_reported) }>Aprobar</button>
                                        <button className="mx-1 btn btn-secondary" onClick={ () => rejectReport(uid_image_reported) }>Rechazar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))             
            }
            </div>
        </>
    )
}