import fetch from 'cross-fetch'

const API_KEY = 'iat6z2listQ44Tt9nwZPT4GdIoCGVKov'
const BASE_URL = `https://app.ticketmaster.com`
const DISCOVERY_BASE_URL = `${BASE_URL}/discovery/v2/`

export const getEventsByCountry = (countryCode) => {
    return fetch(`${DISCOVERY_BASE_URL}events?apikey=${API_KEY}&countryCode=${countryCode}`)
    .then(handleNetworkErrors)
    .then(response => response.json())
    .catch(error => error)
}

export const getEventDetails = (eventID) => {
    return fetch(`${DISCOVERY_BASE_URL}events/${eventID}?apikey=${API_KEY}`)
        .then(handleNetworkErrors)
        .then(response => response.json())
        .catch(error => error)
}

const handleNetworkErrors = (response) => {
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response
}
            