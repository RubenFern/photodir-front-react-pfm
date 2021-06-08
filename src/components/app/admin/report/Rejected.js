import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

// Reportes rechazados
export const Rejected = ({ rejected }) => 
{
    const reload = useSelector(state => state.reload);

    useEffect(() => {}, [reload]);

    return (
        <>
            <h2 className="mt-4 text-light text-center">Reportes Pendientes <i className="bi bi-x-circle text-danger"></i></h2>

            <div className="report mt-2">
            {
                rejected.map( ({ uid, user_reported, reporting_user, description, creation_date }) => 
                (
                <div key={uid} className="bg-report mb-2 rounded-5">
                    <div className="card-body rounded-5">
                        <div className="d-flex justify-content-between flex-column flex-lg-row">
                            <div className="d-flex flex-column flex-lg-row ">
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
                
                            <div className="text-light text-center">
                                <p>
                                    { description }
                                </p>
                            </div>
                            <div className="d-flex flex-column justify-content-around align-items-center">
                                <p className="text-light">{ creation_date }</p>
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
