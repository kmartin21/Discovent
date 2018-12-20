import React from 'react'
import PropTypes from 'prop-types'
import '../styles/main.css'
import TextEllipsis from 'react-text-ellipsis';

const Event = ({ imageUrl, name, onClick }) => (
    <div className="events-table__event">
        <img className="event__img" src={imageUrl} onClick={onClick} alt="Event"/>
        <div className="event__title"> 
            <TextEllipsis 
              lines={2} 
              tag={'p'} 
              ellipsisChars={'...'}>
              {name}
            </TextEllipsis>
        </div>
    </div>
)

Event.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Event