import React from 'react';

import { AlbumNIExplore } from './AlbumNIExplore';
import { PhotoNIExplore } from './PhotoNIExplore';

export const NoItemsExplore = ({ object }) => 
{
    return (
        <div className="container d-flex justify-content-center align-items-center w-100">
        {
            (object === 'album') && <AlbumNIExplore />
        }
        {
            (object === 'photo') && <PhotoNIExplore />
        }
        </div>
    )
}
