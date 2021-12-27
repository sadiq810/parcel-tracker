import React from "react";
import {Link, useLocation} from "react-router-dom";

function Navigation() {
    let location = useLocation();

    return (
        <ul className="menu-nav">
            <li className={(location.pathname === '/dashboard' ? 'menu-item-active': '')+" menu-item"} aria-haspopup="true">
                <Link to={'/dashboard'} className="menu-link">
                    <span className="menu-text">Dashboard</span>
                </Link>
            </li>
            <li className={(location.pathname === '/parcels' ? 'menu-item-active': '')+" menu-item"} aria-haspopup="true">
                <Link to={'/parcels'} className="menu-link">
                    <span className="menu-text">Parcels</span>
                </Link>
            </li>
        </ul>
    )
}

export default Navigation;
