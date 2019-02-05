import * as eventsActions from '../Events'
import * as actionTypes from '../ActionTypes'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

describe('Events actions', () => {
    it('should create an action to select a country', () => {
        const countryCode = 'US'
        const expectedAction = {
            type: actionTypes.SELECT_COUNTRY,
            payload: { countryCode }
        }

        expect(eventsActions.selectCountry(countryCode)).toEqual(expectedAction)
    })

    it('should create an action to select an event', () => {
        const eventId = '125487'
        const expectedAction = {
            type: actionTypes.SELECT_EVENT,
            payload: { eventId }
        }

        expect(eventsActions.selectEvent(eventId)).toEqual(expectedAction)
    })

    
    it('should create an action to deselect the currently selected event', () => {
        const expectedAction = {
            type: actionTypes.DESELECT_EVENT
        }

        expect(eventsActions.deselectEvent()).toEqual(expectedAction)
    })

    it('should create an action to signal the start of an event fetch for a country', () => {
        const countryCode = 'US'
        const expectedAction = {
            type: actionTypes.FETCH_EVENTS_BEGIN,
            payload: { countryCode }
        }

        expect(eventsActions.fetchEventsBegin(countryCode)).toEqual(expectedAction)
    })

    it('should create an action to signal the start of an event details fetch', () => {
        const id = '125487'
        const expectedAction = {
            type: actionTypes.FETCH_EVENT_DETAILS_BEGIN,
            payload: { id }
        }

        expect(eventsActions.fetchEventDetailsBegin(id)).toEqual(expectedAction)
    })

    it('should create an action to signal the success of an event fetch for a country', () => {
        const json = {
            page: {
                totalElements: 1
            },
            _embedded: {
                events: 
                    [{
                        name: "Superbowl"
                    }]
            }
        }
        const countryCode = 'US'

        const expectedAction = {
            type: actionTypes.FETCH_EVENTS_SUCCESS,
            payload: { 
                countryCode,
                numOfEvents: json.page.totalElements, 
                events: json.page.totalElements > 0 ? json._embedded.events : []
            }
        }

        expect(eventsActions.fetchEventsSuccess(json, countryCode)).toEqual(expectedAction)
    })

    it('should create an action to signal the success of an event details fetch', () => {
        const id = '125487'
        const json = {
            page: {
                totalElements: 1
            },
            _embedded: {
                events: 
                    [{
                        name: "Superbowl"
                    }]
            }
        }

        const expectedAction = {
            type: actionTypes.FETCH_EVENT_DETAILS_SUCCESS,
            payload: { 
                id,
                eventDetails: json
            }
        }

        expect(eventsActions.fetchEventDetailsSuccess(id, json)).toEqual(expectedAction)
    })

    it('should create an action to signal the failure of an event fetch for a country', () => {
        const error = 'Could not parse json'
        const countryCode = 'Could not parse json'
    
        const expectedAction = {
            type: actionTypes.FETCH_EVENTS_FAILURE,
            payload: { error, countryCode }
        }

        expect(eventsActions.fetchEventsFailure(error, countryCode)).toEqual(expectedAction)
    })

    it('should create an action to signal the failure of an event details fetch', () => {
        const id = '125487'
        const error = 'Could not parse json'

        const expectedAction = {
            type: actionTypes.FETCH_EVENT_DETAILS_FAILURE,
            payload: { id, error }
        }

        expect(eventsActions.fetchEventDetailsFailure(id, error)).toEqual(expectedAction)
    })
})

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
describe('Async Events actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates FETCH_EVENTS_BEGIN and FETCH_EVENTS_SUCCESS actions if the fetch response was successful', () => {
        const json = {
            page: {
                totalElements: 1
            },
            _embedded: {
                events: 
                    [{
                        name: "Superbowl"
                    }]
            }
        }
        const countryCode = 'US'

        fetchMock.getOnce(`https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TM_API_KEY}&countryCode=${countryCode}`, {
            body: json,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            { type: actionTypes.FETCH_EVENTS_BEGIN, payload: { countryCode } },
            { type: actionTypes.FETCH_EVENTS_SUCCESS, payload: { 
                    countryCode,
                    numOfEvents: json.page.totalElements, 
                    events: json.page.totalElements > 0 ? json._embedded.events : []
                } 
            }
        ]

        const store = mockStore({ eventsByCountry: {} })

        return store.dispatch(eventsActions.fetchEventsByCountry(countryCode)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates FETCH_EVENTS_BEGIN and FETCH_EVENTS_FAILURE actions if the fetch response failed', () => {
        const error = new Error('Could not parse json')
       
        const countryCode = 'US'

        fetchMock.getOnce(`https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TM_API_KEY}&countryCode=${countryCode}`, {
            throws: error
        })

        const expectedActions = [
            { type: actionTypes.FETCH_EVENTS_BEGIN, payload: { countryCode } },
            { type: actionTypes.FETCH_EVENTS_FAILURE, payload: { 
                    error,
                    countryCode
                } 
            }
        ]

        const store = mockStore({ eventsByCountry: {} })

        return store.dispatch(eventsActions.fetchEventsByCountry(countryCode)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
