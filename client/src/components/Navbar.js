import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="logo">
            Logo
      </div>
      <Link to="/About">About Us</Link>
      <Link to="/Articles">Read Articles</Link>
      <button className='signin-button'>CONNECT WALLET</button>
    </div>
  )
}

export default Navbar
