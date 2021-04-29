import React from 'react'
import { NavBar } from '../../layout/NavBar'

export const HomePage = () => {
    return (
        <>
            <NavBar />

            <div className="container mt-5">
                <h1 className="text-light">Álbumes del usuario</h1>

            </div>
        </>
    )
}