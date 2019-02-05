import { eventsByCountry } from '../Events'
import * as types from '../../actions/ActionTypes'

describe('eventsByCountry reducer', () => {
    it('should return the initial state', () => {
        expect(eventsByCountry(undefined, {})).toEqual(
            {}
        )
    })

    it('should handle FETCH_EVENTS_BEGIN', () => {
        expect(eventsByCountry(types.FETCH_EVENTS_BEGIN, {
            type: types.FETCH_EVENTS_BEGIN,
            payload: {countryCode: 'US'} 
        })).toEqual(
            {'US': {
                isLoading: true,
                error: null,
                items: [],
                lastFetched: 0
            }}
        )
    })
})