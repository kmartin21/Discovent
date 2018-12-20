import fetch from 'cross-fetch'

const BASE_URL = `https://app.ticketmaster.com`
const DISCOVERY_BASE_URL = `${BASE_URL}/discovery/v2/`

export const getEventsByCountry = (countryCode) => {
    return fetch(`${DISCOVERY_BASE_URL}events?apikey=${process.env.REACT_APP_TM_API_KEY}&countryCode=${countryCode}`)
    .then(handleNetworkErrors)
    .then(response => response.json())
    .catch(error => {
        throw error
    })
}

export const getEventDetails = (eventID) => {
    return fetch(`${DISCOVERY_BASE_URL}events/${eventID}?apikey=${process.env.REACT_APP_TM_API_KEY}`)
        .then(handleNetworkErrors)
        .then(response => response.json())
        .catch(error => {
            throw error
        })
}

const handleNetworkErrors = (response) => {
    if (!response.ok) {
        throw new Error(response.status)
    }
    return response
}
            