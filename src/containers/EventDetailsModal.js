import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ErrorPage from '../components/ErrorPage'

class EventDetailsModal extends Component {
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
        const { seatingImageUrl } = this.props

        var slides = seatingImageUrl !== null ? [this.eventSlideRef.current, this.seatingSlideRef.current] : [this.eventSlideRef.current]
        var dots = seatingImageUrl !== null ? [this.firstSlideDotRef.current, this.secondSlideDotRef.current] : []

        if (n > slides.length) {this.slideIndex = 1} 
        if (n < 1) {this.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace("--active", "")
        }
        
        slides[this.slideIndex-1].style.display = "flex"
        slides[this.slideIndex-1].style.alignContent = "center"
        slides[this.slideIndex-1].style.justifyContent = "center"
        
        if (dots.length != 0) {
            dots[this.slideIndex-1].className += "--active"
        }
    }

    render() {
        const { onClose, url, imageUrl, name, seatingImageUrl, venue, date, time } = this.props
        const dateTime = new Date(`${date} ${time}`).toDateString()

        return (
            <div className='event-details__container'>
                <a href="#" class="close" onClick={onClose}/>
                <div className='event-details__slideshow-container'>
                    <div className='event-details__slide' ref={this.eventSlideRef}>
                        <img className= 'event-details__event-image' src={imageUrl}  alt="Event"/>
                    </div>
                    {seatingImageUrl &&
                        <div className='event-details__slide' ref={this.seatingSlideRef}>
                            <img className= 'event-details__event-image' src={seatingImageUrl}  alt="Seating"/>
                        </div>
                    }
                </div>

                {seatingImageUrl &&
                    <div className='slide-dots-container'>
                        <span className="slide-dot--active" onClick={() => this.currentSlide(1)} ref={this.firstSlideDotRef}></span>
                        <span className="slide-dot" onClick={() => this.currentSlide(2)} ref={this.secondSlideDotRef}></span>
                    </div>
                }
                
                <div className='event-details__info-container'>
                    <h4>{name}</h4>
                    <h5>{venue}</h5>
                    <h5>{dateTime}</h5>
                    <a href={url} className='event-details__tickets-link' target='_blank'>Purchase Tickets</a>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {

    const eventDetails = state.eventDetailsById[ownProps.eventId]
    
     return {
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