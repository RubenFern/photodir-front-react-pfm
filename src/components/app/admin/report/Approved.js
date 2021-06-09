import React from 'react';

// Reportes aprobados
export const Approved = ({ approved }) => 
{
    return (
        <>
            <h2 className="mt-4 text-light text-center">Reportes Aprobados <i className="bi bi-check-circle text-success"></i></h2>

            <div className="animate__animated animate__fadeIn report mt-2">
            {
                approved.map( ({ uid, user_reported, reporting_user, description, creation_date }) => 
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
                
                            <div className="text-light d-flex flex-column justify-content-center     align-items-center mx-md-5">
                                <h4 className="text-gray">Motivo:</h4>
                                <p className="text-justify">
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
