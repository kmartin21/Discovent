import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const EventDetailsModal = ({ onClose, isLoading, error, imageUrl, name, seatingImageUrl, venue, date, time }) => {
    const dateTime = new Date(`${date} ${time}`).toDateString();
    return (
        <div className='event-details-modal' >
            <a href="#" class="close" onClick={onClose}/>
            <h4>{name}</h4>
            <h5>{venue}</h5>
            <h5>{dateTime}</h5>
        </div>
    )
}

EventDetailsModal   .PropTypes = {
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    seatingImageUrl: PropTypes.string,
    info: PropTypes.string,
    venue: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {

    const eventDetails = state.eventDetailsById[ownProps.eventId]
    
     return {
        isLoading: eventDetails.isLoading,
        error: eventDetails.error,
        imageUrl: eventDetails.imageUrl,
        name: eventDetails.name,
        seatingImageUrl: eventDetails.seatingImageUrl,
        info: eventDetails.info,
        venue: eventDetails.venue,
        date: eventDetails.date,
        time: eventDetails.time
     }
}

export default connect(mapStateToProps)(EventDetailsModal)