import * as types from './ActionTypes'
import * as eventsApi from '../api/EventsApi'
import { TIME_TO_STALE } from '../constants/Utils'

export const selectCountry = (countryCode) => ({
    type: types.SELECT_COUNTRY,
    payload: { countryCode }  
})

export const selectEvent = (eventId) => ({
    type: types.SELECT_EVENT,
    payload: { eventId }
})

export const deselectEvent = () => ({
    type: types.DESELECT_EVENT
})

export const fetchEventsBegin = (countryCode) => ({
    type: types.FETCH_EVENTS_BEGIN,
    payload: { countryCode }
})

export const fetchEventDetailsBegin = (id) => ({
    type: types.FETCH_EVENT_DETAILS_BEGIN,
    payload: { id }
})

export const fetchEventsSuccess = (json, countryCode) => ({
    type: types.FETCH_EVENTS_SUCCESS,
    payload: { 
        countryCode, 
        numOfEvents: json.page.totalElements, 
        events: json.page.totalElements > 0 ? json._embedded.events : []
    }
})

export const fetchEventDetailsSuccess = (id, json) => ({
    type: types.FETCH_EVENT_DETAILS_SUCCESS,
    payload: { 
        id, 
        eventDetails: json 
    }
})

export const fetchEventsFailure = (error, countryCode) => ({
    type: types.FETCH_EVENTS_FAILURE,
    payload: { 
        error, 
        countryCode 
    }
})

export const fetchEventDetailsFailure = (id, error) => ({
        type: types.FETCH_EVENT_DETAILS_FAILURE,
        payload: { 
            id, 
            error 
        }
})

export const fetchEventsByCountryIfNeeded = (countryCode = 'US') => {
    return (dispatch, getState) => {
        if (shouldFetchEvents(getState(), countryCode)) {
            dispatch(fetchEventsByCountry(countryCode))
        }
    }
}

const shouldFetchEvents = (state, countryCode) => {
    const event = state.eventsByCountry[countryCode]
    if (event === undefined) {
        return true
    }

    const isDataStale = Date.now() - event.lastFetched > TIME_TO_STALE
    return isDataStale
}

export const fetchEventsByCountry = (countryCode) => {
    return dispatch => {
        dispatch(fetchEventsBegin(countryCode))
        return eventsApi.getEventsByCountry(countryCode)
            .then(json => dispatch(fetchEventsSuccess(json, countryCode)))
            .catch(error => dispatch(fetchEventsFailure(error, countryCode)))
    }
}

export const fetchEventDetailsIfNeeded = (eventId) => {
    return (dispatch, getState) => {
        if (shouldFetchEventDetails(getState(), eventId)) {
            dispatch(fetchEventDetails(eventId))
        }
    }
}

const shouldFetchEventDetails = (state, eventId) => {
    const eventDetails = state.eventDetailsById[eventId]
    if (eventDetails === undefined) {
        return true
    }

    const isDataStale = Date.now() - eventDetails.lastFetched > TIME_TO_STALE
    return isDataStale
}

export const fetchEventDetails = (eventId) => {
    return (dispatch) => {
        dispatch(fetchEventDetailsBegin(eventId))
        return eventsApi.getEventDetails(eventId)
            .then(json => dispatch(fetchEventDetailsSuccess(eventId, json)))
            .catch(error => dispatch(fetchEventDetailsFailure(eventId, error)))
    }
}



