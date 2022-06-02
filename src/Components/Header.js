import React from 'react'
import './Header.css'
import LogoSvg from '../assets/Logo.svg'

const Header = () => {
  return (
    <div className="Header">
      <div>
        <img className="logo" alt="Teetsy Logo" src={LogoSvg} />
      </div>
      <div>
        <h1 className="title">Free URL Shortner</h1>
      </div>
    </div>
  )
}

export default Header