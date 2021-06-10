import React from 'react';

import { NavBar } from '../../layout/NavBar';
import { Users } from './users/Users';

export const UsersPage = () => 
{
    return (
        <>
        <NavBar />

        <div className="container mt-3 pb-4">
            <h1 className="text-gray mb-4">Usuarios de Photodir</h1>

            <Users />
        </div>
        </>
    )
}
