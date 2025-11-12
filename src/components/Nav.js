import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {

    return (
        <header className="header">
        <nav className="navbar">
        <div className="logo"><Link to='/'>Logo</Link></div>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn" id="nav"><span className="navicon"></span></label>
        <ul className="nav-menu">
        <li className="nav-item"><Link to ='/'><p className="nav-link">Home</p></Link></li>
        <li className="nav-item"><Link to ='/projects'><p className="nav-link">Projects</p></Link></li>
        <li classname="nav-item"><Link to ='/contact'><p className="nav-link">Contact</p></Link></li>
        </ul>
        </nav>
        </header>
    ) 
}

export default Nav;