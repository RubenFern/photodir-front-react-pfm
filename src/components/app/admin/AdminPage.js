import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavBar } from '../../layout/NavBar';
import { getReports } from '../../redux/actions/report';
import { types } from '../../redux/types/types';
import { Approved } from './report/Approved';
import { Pending } from './report/Pending';
import { Rejected } from './report/Rejected';

import './report/report.css';

export const AdminPage = () => 
{
    // Monto el componente
    const mounted = useRef(true);

    const dispatch = useDispatch();

    const reload = useSelector(state => state.reload);

    useEffect(() => 
    {
        // Si el componente está montado o activo el reload realizo la petición
        if (mounted.current || reload)
        {
            dispatch(getReports());
        }
        return () => 
        {
            mounted.current = false;

            dispatch({
                type: types.reloadFalse
            });
        }
    }, [dispatch, reload]);

    const reports = useSelector(state => state.reports);

    // Filtro los reportes
    const pending = reports.filter(report => report.state === 'pending');
    const approved = reports.filter(report => report.state === 'approved');
    const rejected = reports.filter(report => report.state === 'rejected');

    return (
        <>
            <NavBar />

            <div className="container mt-3 pb-4">
                <h1 className="text-gray">Panel del administrador</h1>

                <h2 className="mt-3 text-light text-center">Reportes Pendientes <i className="bi bi-exclamation-circle text-warning"></i></h2>

                { (pending.length > 0) ? <Pending pending={pending} /> : <h3 className="text-center text-gray">No queda ningún reporte por revisar</h3> }
                
                { (approved.length > 0) && <Approved approved={approved} /> }

                { (rejected.length > 0) && <Rejected rejected={rejected} /> }

            </div>
        </>
    )
}
