import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Event from '../components/Event'
import { 
    fetchEventDetailsIfNeeded, 
    fetchEventsByCountryIfNeeded, 
    selectEvent, 
    deselectEvent, 
    selectCountry
} from '../actions/Events'
import EventDetailsModal from './EventDetailsModal';
import '../styles/main.css'
import Modal from '../components/Modal'
import ErrorPage from '../components/ErrorPage'

class EventsTable extends Component {
    static propTypes = {
        countryCode: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired,
        error: PropTypes.object,
        items: PropTypes.array.isRequired,
        selectedCountry: PropTypes.string.isRequired,
        selectedEventId: PropTypes.string
    }

    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }
    
    showModal = (eventId) => {
        this.selectEvent(eventId)
        this.setState({ show: true })
    }

    selectEvent = (eventId) => {
        const { dispatch } = this.props
        dispatch(selectEvent(eventId))
        dispatch(fetchEventDetailsIfNeeded(eventId))
    }

    hideModal = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(deselectEvent())
        this.setState({ show: false })
    }

    componentDidMount() {
        const { dispatch, countryCode } = this.props
        dispatch(selectCountry(countryCode))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedCountry !== this.props.selectedCountry) {
            const { dispatch, selectedCountry } = nextProps
            dispatch(fetchEventsByCountryIfNeeded(selectedCountry))
        }
    }
    
    render() {
        const {error, isLoading, items, selectedEventId } = this.props
        
        var errorPage = null

        if (error) {
            errorPage = <ErrorPage errorMessage="500. Oops, something went wrong on our end. We're working to fix this."/>
        } else if (!isLoading && items.length === 0) {
            errorPage = <ErrorPage errorMessage="No events available here at this time."/>
        }

        const modal = this.state.show ? (
            <Modal>
                <div className="event-details-modal">
                    <EventDetailsModal eventId={selectedEventId} onClose={(e) => this.hideModal(e)}/>
                </div>
            </Modal>
        ) : null

        return (
            <div className='events-table__container'>
                {React.isValidElement(errorPage) ? 
                    <div className='error-page__container--events-table'>{errorPage}</div>
                    :
                    [(items.length > 0 &&
                        <div key="0">
                            (<div className='events-table__events'>
                                {items.map(event => 
                                    <Event key={event.id} imageUrl={event.imageUrl} name={event.name} onClick={() => this.showModal(event.id)} />
                                )}
                            </div>
                            {modal}
                        </div>
                    )]
                }
            </div>
        )
    }
}

const mapStateToProps = state => {

    const { selectedCountry } = state
    const events = state.eventsByCountry[selectedCountry] || {
        isLoading: true,
        items: []
    }

    return {
        isLoading: events.isLoading,
        error: events.error,
        items: events.items !== undefined ? events.items : [],
        selectedCountry: state.selectedCountry,
        selectedEventId: state.selectedEvent
    }
}

export default connect(mapStateToProps)(EventsTable)



