import React from 'react'
import '../styles/main.css'
import PropTypes from 'prop-types'

const Logo = ({ toggleNav }) => (
    <div className="country-list__logo-container">
        <li className="fa fa-bars" onClick={toggleNav}/>
        <img src={require('../images/logo.png')} className='country-list__logo' alt="Logo"/>
    </div>
)

Logo.propTypes = {
    toggleNav: PropTypes.func
}

export default Logo