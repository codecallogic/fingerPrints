import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    let nav = props.user ? 
        <React.Fragment>
            <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
                <Link to="/instruments" className="nav-link">Tune Room</Link>
            </li>
            <li className="nav-item">
                <Link to='' className="nav-link" onClick={props.handleLogout}>Logout</Link>
            </li>
        </React.Fragment>
        :
        <React.Fragment>
            <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
                <Link to="/signup" className="nav-link">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
            </li>
        </React.Fragment>
    
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
        <div className="container">
            <a className="navbar-brand" href="/">InstaTone</a>
            <ul className="navbar-nav">
                {nav}
            </ul>
        </div>
        </nav>
    )
}

export default Navbar