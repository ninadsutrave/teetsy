import React from 'react'
import './Error.css'
import Error404 from '../assets/Error404.svg'
import Logo from '../assets/Logo.svg'

function Error() {
  return (
    <div className="Error404">
        <img className="Logo" alt="logo" src={Logo} />
        <h1>Page not found!</h1>
        <img className="ErrImage" alt="Error 404" src={Error404} />
        <h4 className="error-message">The URL you are looking for does not exist</h4>
        <h4 className="error-message">Go back to <a href="http://localhost:3000/">homepage</a>?</h4> 
    </div>
  )
}

export default Error