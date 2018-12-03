import React from 'react';
import {Link} from 'react-router-dom';

export const Header = () => (
    <div className="navbar-fixed">
        <nav className={'blue-grey darken-4'}>
            <div className="nav-wrapper container">
                <Link to="/" className="brand-logo">Logo</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Sign Out</Link></li>
                </ul>
            </div>
        </nav>
    </div>
);
