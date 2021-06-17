import React from 'react';

import './Footer.css';

export const Footer = () => 
{
    return (
        <footer className="bg-footer footer">
            <div className="d-flex justify-content-around align-items-center fs-5">
                <a href="https://github.com/RubenFern/Photodir-PFM" target="_blank" rel="noreferrer" className="link">
                    <i className="bi bi-github"></i> API Rest
                </a>
                <a href="https://github.com/RubenFern/Photodir-PFM-Front-React" target="_blank" rel="noreferrer" className="link">
                    <i className="bi bi-github"></i> Interfaz React
                </a>
            </div>
        </footer>
    )
}
