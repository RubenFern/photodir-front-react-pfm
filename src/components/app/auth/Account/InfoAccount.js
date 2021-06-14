import React from 'react';

import { Avatar } from '../User/Avatar';
import { SetPrivacy } from './SetPrivacy';

export const InfoAccount = ({ user_name, image, oldName, creation_date, private_profile }) => 
{
    return (
        <div className="d-flex container flex-column flex-md-row justify-content-between align-items-center">
            <div className="d-flex">
                <div>
                    <Avatar user_name={user_name} image={image} />
                </div>
                <div className="ms-3 d-flex flex-column justify-content-center">
                    <h3 className="text-light fw-bold">{ user_name }</h3>
                    <h5 className="text-grey-cs">{ oldName }</h5>
                    <h4 className="text-grey-cs"><small className="text-light">Cuenta creada: </small> { creation_date }</h4>
                </div>
            </div>

            <SetPrivacy private_profile={private_profile} />
        </div> 
    )
}
