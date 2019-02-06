import { eventsByCountry, eventDetailsById, selectedCountry, selectedEvent } from '../Events'
import * as types from '../../actions/ActionTypes'

describe('eventsByCountry reducer', () => {
    it('should return the initial state', () => {
        expect(eventsByCountry(undefined, {})).toEqual(
            {}
        )
    })

    it('should handle FETCH_EVENTS_BEGIN', () => {
        expect(eventsByCountry({}, {
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

    it('should handle FETCH_EVENTS_SUCCESS', () => {
        const realDateNow = Date.now.bind(global.Date)
        const dateNowStub = jest.fn(() => 1530518207007)
        global.Date.now = dateNowStub

        expect(eventsByCountry({'US': {
            isLoading: true,
            error: null,
            items: [],
            lastFetched: 0
        }}, {
            type: types.FETCH_EVENTS_SUCCESS,
            payload: { 
                countryCode: 'US',
                numOfEvents: 1,
                events: [{
                    id: 'vvG1zZ4848CU8N',
                    name: 'Atlanta Hawks vs. Los Angeles Lakers',
                    images: [{
                                ratio: "16_9",
                                url: "https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_877061_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                                width: 2048,
                                height: 1152,
                                fallback: false
                        }]
                }]
            }
        })).toEqual({
            US: {
                isLoading: false,
                error: null,
                items: [{
                    id: 'vvG1zZ4848CU8N',
                    name: 'Atlanta Hawks vs. Los Angeles Lakers',
                    imageUrl: 'https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_877061_TABLET_LANDSCAPE_LARGE_16_9.jpg'
                }],
                lastFetched: Date.now()
            }
        })
        global.Date.now = realDateNow
    })

    it('should handle FETCH_EVENTS_FAILURE', () => {
        expect(eventsByCountry({'US': {
            isLoading: true,
            error: null,
            items: [],
            lastFetched: 0
        }}, {
            type: types.FETCH_EVENTS_FAILURE,
            payload: {
                countryCode: 'US',
                error: new Error('Could not parse json')
            }
        })).toEqual({
            US: {
                isLoading: false,
                error: new Error('Could not parse json'),
                items: [],
                lastFetched: 0
            }
        })

    })
})

describe('eventDetailsById reducer', () => {
    it('should return the initial state', () => {
        expect(eventDetailsById(undefined, {})).toEqual({})
    })

    it('should handle FETCH_EVENT_DETAILS_BEGIN', () => {
        expect(eventDetailsById({}, {
            type: types.FETCH_EVENT_DETAILS_BEGIN,
            payload: { id: 'vvG1zZ4848CU8N' }
        })).toEqual({
            vvG1zZ4848CU8N: {
                id: 'vvG1zZ4848CU8N',
                isLoading: true,
                error: null,
                imageUrl: null,
                name: null,
                seatingImageUrl: null,
                info: null,
                venue: null,
                date: null,
                time: null,
                lastFetched: 0
            }
        })
    })

    it('should handle FETCH_EVENT_DETAILS_SUCCESS', () => {
        const realDateNow = Date.now.bind(global.Date)
        const dateNowStub = jest.fn(() => 1530518207007)
        global.Date.now = dateNowStub

        expect(eventDetailsById({
                vvG1zZ4848CU8N: {
                    id: 'vvG1zZ4848CU8N',
                    isLoading: true,
                    error: null,
                    imageUrl: null,
                    name: null,
                    seatingImageUrl: null,
                    info: null,
                    venue: null,
                    date: null,
                    time: null,
                    lastFetched: 0
                }
            }, {
                type: types.FETCH_EVENT_DETAILS_SUCCESS,
                payload: {
                    id: 'vvG1zZ4848CU8N',
                    eventDetails: {
                        name: 'Atlanta Hawks vs. Los Angeles Lakers',
                        url: 'https://testingUrl.com',
                        images: [{
                            ratio: "16_9",
                            url: "https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_877061_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                            width: 2048,
                            height: 1152,
                            fallback: false
                        }],
                        seatmap: {
                            staticUrl: 'https://testingStaticUrl.com'
                        },
                        info: 'Lakers vs hawks basketball game',
                        _embedded: {
                            venues: [{
                                name: 'Staples center'
                            }]
                        },
                        dates: {
                            start: {
                                localDate: '2019-02-23',
                                localTime: '18:00:00'
                            }
                        }
                    }
                }
        })).toEqual({
                vvG1zZ4848CU8N: {
                    id: 'vvG1zZ4848CU8N',
                    isLoading: false,
                    error: null,
                    url: 'https://testingUrl.com',
                    imageUrl: 'https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_877061_TABLET_LANDSCAPE_LARGE_16_9.jpg',
                    name: 'Atlanta Hawks vs. Los Angeles Lakers',
                    seatingImageUrl: 'https://testingStaticUrl.com',
                    info: 'Lakers vs hawks basketball game',
                    venue: 'Staples center',
                    date: '2019-02-23',
                    time: '18:00:00',
                    lastFetched: Date.now()
                }
            }
        )
        global.Date.now = realDateNow
    })

    it('should handle FETCH_EVENT_DETAILS_FAILURE', () => {
        expect(eventDetailsById({
            vvG1zZ4848CU8N: {
                id: 'vvG1zZ4848CU8N',
                isLoading: true,
                error: null,
                imageUrl: null,
                name: null,
                seatingImageUrl: null,
                info: null,
                venue: null,
                date: null,
                time: null,
                lastFetched: 0
            }
        }, {
            type: types.FETCH_EVENT_DETAILS_FAILURE,
            payload: {
                id: 'vvG1zZ4848CU8N',
                error: new Error('Could not parse json')
            }
        }))
    })
})

describe('selectedCountry reducer', () => {
    it('should return the initial state', () => {
        expect(selectedCountry(undefined, {})).toEqual("")
    })

    it('should handle SELECT_COUNTRY', () => {
        expect(selectedCountry("", {
            type: types.SELECT_COUNTRY,
            payload: {
                countryCode: 'US'
            }
        })).toEqual('US')
    })
})

describe('selectedEvent reducer', () => {
    it('should return the initial state', () => {
        expect(selectedEvent(undefined, {})).toEqual(null)
    })

    it('should handle SELECT_EVENT', () => {
        expect(selectedEvent(null, {
            type: types.SELECT_EVENT,
            payload: {
                eventId: '12345'
            }
        })).toEqual('12345')
    })

    it('should handle DESELECT_EVENT', () => {
        expect(selectedEvent('12345', {
            type: types.DESELECT_EVENT
        })).toEqual(null)
    })
})