import React from 'react'
import PropTypes from 'prop-types'

const Event = ({ id, imageUrl, name, onClick }) => (
    <div className="event">
        <img src={imageUrl} onClick={onClick}/> 
        <h4>{name}</h4>
    </div>
)

Event.PropTypes = {
    id: PropTypes.string.required,
    imageUrl: PropTypes.string.required,
    name: PropTypes.string.required,
    onClick: PropTypes.func.required
}

export default Event