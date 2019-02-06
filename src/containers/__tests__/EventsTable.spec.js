import React from 'react'
import { EventsTable } from '../EventsTable'
import { shallow, mount } from 'enzyme'
import ErrorPage from '../../components/ErrorPage'
import Event from '../../components/Event'
import Modal from '../../components/Modal'
import EventDetailsModal from '../EventDetailsModal'
import TestProvider from '../../setupTests'
import { MemoryRouter } from 'react-router'
import { Route } from 'react-router-dom'
import App from '../App'

describe('EventsTable', () => {
    let props
    let shallowEventsTable

    beforeEach(() => {
        props = {
            countryCode: 'US',
            isLoading: false,
            error: null,
            items: [{
                id: '12345',
                imageUrl: 'https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_877061_TABLET_LANDSCAPE_LARGE_16_9.jpg',
                name: 'Hawks vs Lakers'
            },
            {
                id: '12346',
                imageUrl: 'https://testingImageUrl.com/q42.jpg',
                name: 'Jets vs Giants'
            }],
            selectedCountry: 'ES',
            selectedEventId: null,
            dispatch: jest.fn()
        }
        
        shallowEventsTable = undefined
    })

    it('should render a div', () => {
        shallowEventsTable = shallow(<EventsTable {...props} />)
        expect(shallowEventsTable.find('div').length).toBeGreaterThan(0)
    })

    describe('when `error` is not null', () => {
        beforeEach(() => {
            props.error = new Error('Internal server error')
        })

        it('should render a `ErrorPage`', () => {
            shallowEventsTable = shallow(<EventsTable {...props} />)
            expect(shallowEventsTable.find(ErrorPage).length).toBeGreaterThan(0)
        })
    })

    describe('when it is not loading and there are no items', () => {
        beforeEach(() => {
            props.isLoading = false
            props.items = []
        })

        it('should render a `ErrorPage`', () => {
            shallowEventsTable = shallow(<EventsTable {...props} />)
            expect(shallowEventsTable.find(ErrorPage).length).toBeGreaterThan(0)
        })
    })

    describe('when there is no error and there are event items', () => {
        it('should render a `Event` for each event item', () => {
            shallowEventsTable = shallow(<EventsTable {...props} />)
            expect(shallowEventsTable.find(Event).length).toEqual(props.items.length)
        })

        describe('rendered `Event` item', () => {
            it('should set the `key` prop value to be the item `id` of the current iteration', () => {
                shallowEventsTable = shallow(<EventsTable {...props} />)
                const events = shallowEventsTable.find(Event)

                for(let i = 0; i < props.items.length; i++) {
                    expect(props.items[i].id).toEqual(events.at(i).key())
                }
            })

            it('should set the `imageUrl` prop value to be the item `imageUrl` of the current iteration', () => {
                shallowEventsTable = shallow(<EventsTable {...props} />)
                const events = shallowEventsTable.find(Event)

                for(let i = 0; i < props.items.length; i++) {
                    expect(props.items[i].imageUrl).toEqual(events.at(i).props().imageUrl)
                }
            })

            it('should set the `name` prop value to be the item `name` of the current iteration', () => {
                shallowEventsTable = shallow(<EventsTable {...props} />)
                const events = shallowEventsTable.find(Event)

                for(let i = 0; i < props.items.length; i++) {
                    expect(props.items[i].name).toEqual(events.at(i).props().name)
                }
            })

            it('should call `showModal` on click of `Event`', () => {
                shallowEventsTable = shallow(<EventsTable {...props} />)
                
                shallowEventsTable.instance().showModal = jest.fn()
                shallowEventsTable.instance().forceUpdate()

                const events = shallowEventsTable.find(Event)
        
                const toggleShowModalSpy = jest.spyOn(shallowEventsTable.instance(), 'showModal')
                events.first().simulate('click')

                expect(toggleShowModalSpy).toHaveBeenCalled()
            })
        })
    })

    describe('when `state.show` is true', () => {
        beforeEach(() => {
            props.selectedEventId = '12321'
        })

        it('should render a modal', () => {
            shallowEventsTable = shallow(<EventsTable {...props} />)
            shallowEventsTable.setState({ show: true })
            expect(shallowEventsTable.find(Modal).length).toBeGreaterThan(0)
        })

        describe('rendered modal', () => {
            it('should render a div', () => {
                shallowEventsTable = shallow(<EventsTable {...props} />)
                shallowEventsTable.setState({ show: true })
                expect(shallowEventsTable.find(Modal).find('div').length).toBeGreaterThan(0)
            })

            it('should render a `EventDetailsModal`', () => {
                shallowEventsTable = shallow(<EventsTable {...props} />)
                shallowEventsTable.setState({ show: true })
                expect(shallowEventsTable.find(Modal).find(EventDetailsModal).length).toBeGreaterThan(0)
            })
        })

        describe('rendered `EventDetailsModal`', () => {
            it('should set the `eventId` prop value to be the `selectedEventId`', () => {
                shallowEventsTable = shallow(<EventsTable {...props} />)
                shallowEventsTable.setState({ show: true })
                expect(shallowEventsTable.find(EventDetailsModal).props().eventId).toEqual(props.selectedEventId)
            })

            it('should call `hideModal` when `onClose` event is fired', () => {
                const mountedEventsTable = mount(<EventsTable {...props} />)
                mountedEventsTable.setState({ show: true })
                mountedEventsTable.instance().hideModal = jest.fn()
                mountedEventsTable.instance().forceUpdate()
        
                const toggleHideModalSpy = jest.spyOn(mountedEventsTable.instance(), 'hideModal')
                mountedEventsTable.find(EventDetailsModal).find('button').simulate('click')
                expect(toggleHideModalSpy).toHaveBeenCalled()
                mountedEventsTable.unmount()
            })
        })
    })
})


