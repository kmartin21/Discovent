import { combineReducers } from 'redux'
import {
    eventsByCountry,
    selectedCountry,
    eventDetailsById,
    selectedEvent
} from '../reducers/Events'

export default combineReducers({
    eventsByCountry, 
    eventDetailsById,
    selectedEvent,
    selectedCountry
})