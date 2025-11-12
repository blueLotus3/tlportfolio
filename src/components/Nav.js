import React, { useState }from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    const [ isOpen, setIsOpen ] = useState(false);
    return (
        <nav className="navbar">
        <div className="logo"><Link to='/'>Logo</Link></div>

        <div className={`nav-links ${isOpen ? "open": ""}`}>
            <Link to ='/' onClick={() => setIsOpen(false)}><p>Home</p></Link>
            <Link to ='/projects' onClick={() => setIsOpen(false)}><p>Projects</p></Link>
            <Link to ='/contact' onClick={() => setIsOpen(false)}><p>Contact</p></Link>
            </div>
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </div>

        </nav>
    ) 
}

export default Nav;