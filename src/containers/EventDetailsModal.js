import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FETCH_EVENT_DETAILS_SUCCESS } from '../actions/ActionTypes';

class EventDetailsModal extends React.Component {
    static propTypes = {
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

    constructor(props) {
        super(props)
        this.slideIndex = 1
        this.showSlides = this.showSlides.bind(this)
        this.eventSlideRef = React.createRef()
        this.seatingSlideRef = React.createRef()
        this.firstSlideDotRef = React.createRef()
        this.secondSlideDotRef = React.createRef()
    }

    componentDidMount() {
        this.showSlides(this.slideIndex)
    }

    currentSlide(n) {
        this.showSlides(this.slideIndex = n)
    }
  
    showSlides(n) {
        var i;
        var slides = [this.eventSlideRef.current, this.seatingSlideRef.current]
        var dots = [this.firstSlideDotRef.current, this.secondSlideDotRef.current]
        
        if (n > slides.length) {this.slideIndex = 1} 
        if (n < 1) {this.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "")
        }

        slides[this.slideIndex-1].style.display = "inline-block"
        slides[this.slideIndex-1].style.width = "50%"
        slides[this.slideIndex-1].style.height = "50%"
        console.log(slides[this.slideIndex-1])
        dots[this.slideIndex-1].className += " active"
    }

    render() {
        const { onClose, isLoading, error, url, imageUrl, name, seatingImageUrl, venue, date, time } = this.props
        const dateTime = new Date(`${date} ${time}`).toDateString()

        return (
            <div className='event-details-modal' >
                <a href="#" class="close" onClick={onClose}/>
                <div className='event-details__slideshow-container'>
                    <div className='event-details__slide' ref={this.eventSlideRef}>
                        <img className= 'event-details-modal__event-image' src={imageUrl}  alt="Event image"/>
                    </div>
                    <div className='event-details__slide' ref={this.seatingSlideRef}>
                        <img className= 'event-details-modal__event-image' src={seatingImageUrl}  alt="Seating image"/>
                    </div>
                </div>

                <div className='dots-container'>
                    <span className="dot" onClick={() => this.currentSlide(1)} ref={this.firstSlideDotRef}></span> 
                    <span className="dot" onClick={() => this.currentSlide(2)} ref={this.secondSlideDotRef}></span> 
                </div>
                
                <div className='event-details-modal__details'>
                    <h4>{name}</h4>
                    <h5>{venue}</h5>
                    <h5>{dateTime}</h5>
                    <a href={url} className='buttonz' target='_blank'>Purchase Tickets</a>
                    <button className='event-details-modal__tickets-button'>Purchase Tickets</button>
                </div>
            </div>
        )
    }

}

// const EventDetailsModal = ({ onClose, isLoading, error, url, imageUrl, name, seatingImageUrl, venue, date, time }) => {
//     const dateTime = new Date(`${date} ${time}`).toDateString();
//     return (
//         <div className='event-details-modal' >
//             <a href="#" class="close" onClick={onClose}/>
//             <div className='event-details__slideshow-container'>
//                 <div className='event-details__slide'>
//                     <img className= 'event-details-modal__event-image' src={imageUrl}  alt="Event image"/>
//                 </div>
//                 <div className='event-details__slide'>
//                     <img className= 'event-details-modal__event-image' src={seatingImageUrl}  alt="Seating image"/>
//                 </div>
//             </div>

//             <div className='dots-container'>
//                 <span class="dot"></span> 
//                 <span class="dot"></span> 
//                 <span class="dot"></span> 
//             </div>
            
//             <div className='event-details-modal__details'>
//                 <h4>{name}</h4>
//                 <h5>{venue}</h5>
//                 <h5>{dateTime}</h5>
//                 <a href={url} className='buttonz' target='_blank'>Purchase Tickets</a>
//                 {/* <button className='event-details-modal__tickets-button'>Purchase Tickets</button> */}
//             </div>
//         </div>
//     )
// }

// EventDetailsModal.PropTypes = {
//     isLoading: PropTypes.bool.isRequired,
//     error: PropTypes.object,
//     imageUrl: PropTypes.string,
//     name: PropTypes.string,
//     seatingImageUrl: PropTypes.string,
//     info: PropTypes.string,
//     venue: PropTypes.string,
//     date: PropTypes.string,
//     time: PropTypes.string
// }

const mapStateToProps = (state, ownProps) => {

    const eventDetails = state.eventDetailsById[ownProps.eventId]
    
     return {
        isLoading: eventDetails.isLoading,
        error: eventDetails.error,
        url: eventDetails.url,
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