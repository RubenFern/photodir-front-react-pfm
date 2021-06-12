import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

import { deleteUser, getUsers, setRole } from '../../../redux/actions/admin';
import { types } from '../../../redux/types/types';

import './Users.css';

export const Users = () => 
{
    // Monto el componente
    const mounted = useRef(true);
    const users = useSelector(state => state.users);
    const { user: { user_name: authUserName } } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    useEffect(() => 
    {
        if (mounted.current)
        {
            dispatch(getUsers());
        }
        console.log('usuarios de photodir')
        return () => 
        {
           mounted.current = false;

           dispatch({
                type: types.reloadFalse
            });
        }
    }, [dispatch]);

    const changeRole = (is_admin, user_name) =>
    {
        if (user_name === 'admin')
        {
            Swal.fire('Ups', 'No puedes modificar el Rol del usuario admin', 'error');
            return;
        }

        Swal.fire(
        {
            title: `${ (is_admin) ? 'Retirar Rol de administrador' : 'Asignar Rol de administrador' }`,
            text: `${ (is_admin) ? '¿Estás seguro de quitar los permisos de administrador a ' + user_name + '?' : '¿Estás seguro de asignar permisos de administrador a ' + user_name + '?' }`, // Concateno porque falla el compilador de llaves
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Hazlo',
            cancelButtonText: 'Mejor no',
            focusCancel: true
        }).then( (res) =>
        {
            if (res.isConfirmed) 
            {
                dispatch(setRole(user_name, authUserName));
            }
        });
    }

    const confirmDeleteUser = (user_name) =>
    {
        if (user_name === 'admin')
        {
            Swal.fire('Ups', 'No puedes eliminar el usuario admin', 'error');
            return;
        }

        Swal.fire(
        {
            title: `Eliminar al usuario ${user_name}`,
            text: '¿Estás seguro? Se borrarán todos sus datos de la aplicación',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            focusCancel: true
        }).then( (res) =>
        {
            if (res.isConfirmed) 
            {
                dispatch(deleteUser(user_name));
            }
        });
    }

    return (
        <>
        {
        users.map( ({ uid, name, user_name, email, is_admin, private_profile, image, creation_date }) => 
        (
            <div key={uid} className="bg-users p-2 mb-2 rounded-3 d-flex flex-column flex-lg-row justify-content-between">
                <NavLink 
                    to={ (!is_admin) ? `/panel/usuarios/${user_name}` : '' }  
                    className={`d-flex justify-content-around justify-content-lg-center mx-lg-5 nav-item nav-link ${ (is_admin) && 'pe-none' }`}
                >
                    <img className="mv-image-user" src={`http://localhost:3010/api/upload/avatar/${user_name}/${image}`} alt={image} />
                    
                    <div className="d-flex flex-column justify-content-around mx-2">
                        <div className="text-light fs-4">
                            { `${user_name} ` }
                            { (is_admin) && <i className="bi bi-shield-lock-fill text-warning"></i> }
                            { (private_profile) ? <i className="bi bi-lock-fill text-gray"></i> : <i className="bi bi-unlock-fill text-gray"></i> }
                        </div>
                        <div className="text-gray">{ name }</div>
                        <div className="text-gray">{ email }</div>
                        <div className="text-gray">{ creation_date }</div>
                    </div>
                </NavLink>

                <div className="d-flex align-items-center justify-content-center mx-lg-5 my-3 my-lg-0">
                    <div className="mx-2">
                        <button className="btn btn-secondary" onClick={ () => changeRole(is_admin, user_name) }>
                        {
                            (is_admin) ? 'Quitar Permisos' : 'Dar Permisos'
                        }
                        </button>
                    </div>
                    <div className="mx-2">
                        <button className="btn btn-danger" onClick={ () => confirmDeleteUser(user_name) }>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        ))         
        }
        </>
    )
}
