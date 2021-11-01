import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {

    return(
        <ul className="nav bg-primary">
            <div className="d-flex container-sm">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/search">Búsqueda</Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link text-white" to="/">Home</Link>
                </li>
            </div>
        </ul>
    );
}

export default NavBar;