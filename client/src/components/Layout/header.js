import React from 'react';
import {Link} from 'react-router-dom';

export const Header = ({user, onLogout, onLogin}) => (
    <div className="navbar-fixed">
        <nav className={'blue-grey darken-4'}>
            <div className="nav-wrapper container">
                <Link to="/" className="brand-logo">Logo</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/">Home</Link></li>
                    {
                        user && (
                            <li>
                              <Link to="/" onClick={onLogout}>Sign Out</Link>
                            </li>
                        )
                    }
                    {
                        !user &&
                        <li>
                            <Link to="/" onClick={onLogin}>Sign In</Link>
                        </li>
                    }
                    {
                        user &&
                        <li className={'text-capitalize'}>
                           Hi {`${user.name}`}
                        </li>
                    }
                </ul>
            </div>
        </nav>
    </div>
);
