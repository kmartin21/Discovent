import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const EventDetailsModal = ({ eventId, onClose, isLoading, error, imageUrl, name, seatingImageUrl, info, venue, date, time }) => {

    return (
        <div>
            LOADING: {`${isLoading}`} ||
            ERROR: {`${error}`} ||
            IMAGEURL: {imageUrl} ||
            NAME: {name} ||
            SEATING: {seatingImageUrl} ||
            INFO: {info} ||
            VENUE: {venue} ||
            DATE: {date} ||
            TIME: {time} ||
            <button onClick={onClose}>
                Close
            </button>
        </div>
    )
}

EventDetailsModal.PropTypes = {
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