import * as types from '../actions/ActionTypes'

export const eventsByCountry = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_EVENTS_BEGIN:
        case types.FETCH_EVENTS_SUCCESS:
        case types.FETCH_EVENTS_FAILURE:
            return {
                ...state,
                [action.payload.countryCode]: event(state[action.payload.countryCode], action)
            }
        default:
            return state
    }
}

export const eventDetailsById = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_EVENT_DETAILS_BEGIN:
        case types.FETCH_EVENT_DETAILS_SUCCESS:
        case types.FETCH_EVENT_DETAILS_FAILURE:
            return {
                ...state,
                [action.payload.id]: eventDetails(state[action.payload.id], action)
            }
        default: 
            return state
    }
}

export const selectedCountry = (state = 'US', action) => {
    switch (action.type) {
        case types.SELECT_COUNTRY:
            return action.payload.countryCode
        default:
            return state
    }
}

export const selectedEvent = (state = null, action) => {
    switch (action.type) {
        case types.SELECT_EVENT:
            return action.payload.eventId
        case types.DESELECT_EVENT:
            return null
        default:
            return state
    }
}

const event = (state = {
    isLoading: false,
    error: null,
    items: [],
    lastFetched: 0
}, action) => {
    switch (action.type) {
        case types.FETCH_EVENTS_BEGIN:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case types.FETCH_EVENTS_SUCCESS:
            const events = action.payload.numOfEvents > 0 ? createEventObjects(action.payload.events) : []
            return {
                isLoading: false,
                error: null,
                items: events,
                lastFetched: Date.now()
            }
        case types.FETCH_EVENTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            }
        default:
            return state
    }
}

const eventDetails = (state = {
    id: null,
    isLoading: false,
    error: null,
    imageUrl: null,
    name: null,
    seatingImageUrl: null,
    info: null,
    venue: null,
    date: null,
    time: null,
    lastFetched: 0
}, action) => {
    switch (action.type) {
        case types.FETCH_EVENT_DETAILS_BEGIN:
            return {
                ...state,
                id: action.payload.id,
                isLoading: true,
                error: null
            }
        case types.FETCH_EVENT_DETAILS_SUCCESS:
            const eventDetails = action.payload.eventDetails
            return {
                id: action.id,
                isLoading: false,
                error: null,
                url: eventDetails.url,
                imageUrl: getImageUrl(eventDetails.images),
                name: eventDetails.name,
                seatingImageUrl: eventDetails.seatmap.staticUrl,
                info: eventDetails.info,
                venue: eventDetails._embedded.venues[0].name,
                date: eventDetails.dates.start.localDate,
                time: eventDetails.dates.start.localTime,
                lastFetched: Date.now()
            }
        case types.FETCH_EVENT_DETAILS_FAILURE:
            return {
                ...state,
                id: action.payload.id,
                isLoading: false,
                error: action.payload.error
            }
        default:
            return state
    }
}

const getImageUrl = (images) => {
    for(var i in images) {
        if(images[i].ratio === "3_2") {
            return images[i].url
        }
    }
}

const createEventObjects = (events) => {
    const eventObjects = events.map(event => ({
        id: event.id,
        name: event.name,
        imageUrl: event.images[0].url
    }))

    return eventObjects
}





