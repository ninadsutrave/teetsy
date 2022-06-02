import React from 'react'
import './LeftSection.css'
import Illustration from '../assets/Illustration.svg'

const LeftSection = () => {
  return (
    <div className="LeftSection">
        <h1 className="tagline">
            The go to tool for
            <pre className="highlight">
                professionals.
            </pre>
        </h1>
        <img className="illustration" alt="Link Sharing Illustration" src={Illustration} />
    </div>
  )
}

export default LeftSection