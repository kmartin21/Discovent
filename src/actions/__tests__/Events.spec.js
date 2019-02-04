import React from 'react'
import * as eventsActions from '../Events'
import * as actionTypes from '../ActionTypes'

describe('Events Actions', () => {
    it('always creates an action to select a country', () => {
        const countryCode = 'US'
        const expectedAction = {
            type: actionTypes.SELECT_COUNTRY,
            payload: { countryCode }
        }

        expect(eventsActions.selectCountry(countryCode)).toEqual(expectedAction)
    })

    it('always creates an action to select an event', () => {
        const eventId = '125487'
        const expectedAction = {
            type: actionTypes.SELECT_EVENT,
            payload: { eventId }
        }

        expect(eventsActions.selectEvent(eventId)).toEqual(expectedAction)
    })

    
    it('always creates an action to deselect the currently selected event', () => {
        const expectedAction = {
            type: actionTypes.DESELECT_EVENT
        }

        expect(eventsActions.deselectEvent()).toEqual(expectedAction)
    })

    it('always creates an action to signal the start of an event fetch for a country', () => {
        const countryCode = 'US'
        const expectedAction = {
            type: actionTypes.FETCH_EVENTS_BEGIN,
            payload: { countryCode }
        }

        expect(eventsActions.fetchEventsBegin(countryCode)).toEqual(expectedAction)
    })

    it('always creates an action to signal the start of an event details fetch', () => {
        const id = '125487'
        const expectedAction = {
            type: actionTypes.FETCH_EVENT_DETAILS_BEGIN,
            payload: { id }
        }

        expect(eventsActions.fetchEventDetailsBegin(id)).toEqual(expectedAction)
    })

    it('always creates an action to signal the success of an event fetch for a country', () => {
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

    it('always creates an action to signal the success of an event details fetch', () => {
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
})
