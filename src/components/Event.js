import React from 'react'
import PropTypes from 'prop-types'
import '../styles/main.css'

const Event = ({ id, imageUrl, name, onClick }) => (
    <div className="events-container__event">
        <img className="events-container__img" src={imageUrl} onClick={onClick}/> 
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