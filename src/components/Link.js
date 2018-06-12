import React from 'react'
import PropTypes from 'prop-types'
import '../styles/main.css'

const Link = ({ active, name, onClick }) => (
    <button
       className="country-list__button"
       onClick={onClick}
       disabled={active}
    >
        {name}
    </button>
)

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Link