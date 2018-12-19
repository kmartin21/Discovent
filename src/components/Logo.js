import React from 'react'
import '../styles/main.css'

const Logo = () => (
    <div className="country-list__logo-container">
        <li className="fa fa-bars" />
        <img src= {require('../images/logo.png')} className='country-list__logo'/>
    </div>
)

export default Logo