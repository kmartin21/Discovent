import React from 'react'
import PropTypes from 'prop-types'
import '../styles/main.css'
import { Component } from 'react'
import TextEllipsis from 'react-text-ellipsis';

const Event = ({ id, imageUrl, name, onClick }) => (
    <div className="events-container__event">
        <img className="events-container__img" src={imageUrl} onClick={onClick}/>
        <div id="events-container__title"> 
            <TextEllipsis 
              lines={2} 
              tag={'p'} 
              ellipsisChars={'...'}>
              {name}
            </TextEllipsis>
        </div>
    </div>
)



Event.PropTypes = {
    id: PropTypes.string.required,
    imageUrl: PropTypes.string.required,
    name: PropTypes.string.required,
    onClick: PropTypes.func.required
}

export default Event