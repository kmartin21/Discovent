import React from 'react'
import PropTypes from 'prop-types'
import '../styles/main.css'

const Link = ({ active, name, onClick }) => (
    <div className='country-list__link-container'>
        <img src= {require(`../images/flag-icons/${name}.png`)} className='country-list__flag'/>
        <button
        className="country-list__button"
        onClick={onClick}
        >
            {active ? <span className="country-list__button--selected">{name}</span> : name}
        </button>
    </div>
)

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Link