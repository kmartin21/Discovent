import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ active, name, onClick }) => (
    <button
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