import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { NavBar } from '../../layout/NavBar';
import { DeleteUser } from './Account/DeleteUser';
import { Form } from './Account/Form';
import { InfoAccount } from './Account/InfoAccount';

export const AccountPage = ({ history }) => 
{
    const { user: { user_name, name: oldName, image: oldImage, creation_date, private_profile } } = useSelector(state => state.auth);
    const [image, setimage] = useState(oldImage);

    return (
        <>
            <NavBar />

            <div className="container-fluid mt-5">

                {
                    // Cabecera con la información del usuario
                }
                <InfoAccount user_name={user_name} image={oldImage} oldName={oldName} creation_date={creation_date} private_profile={private_profile} />
                
                {
                    // Formulario para editar el usuario
                }
                <div className="container d-flex align-items-center flex-column">
                    <Form oldName={oldName} image={image} oldImage={oldImage} setimage={setimage} />
                </div>
                   

                <div className="container d-flex justify-content-end mt-5">
                    <DeleteUser history={history} />
                </div>
            </div>
        </>
    )
}
