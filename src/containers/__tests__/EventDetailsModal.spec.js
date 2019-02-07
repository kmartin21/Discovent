import React from 'react'
import { EventDetailsModal } from '../EventDetailsModal'
import { mount } from 'enzyme'
import ErrorPage from '../../components/ErrorPage'

describe('EventDetailsModal', () => {
    let props
    let mountedEventDetailsModal
    
    beforeEach(() => {
        props = {
            error: null,
            url: 'https://testingUrl.com',
            imageUrl: 'https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_877061_TABLET_LANDSCAPE_LARGE_16_9.jpg',
            name: 'Atlanta Hawks vs. Los Angeles Lakers',
            seatingImageUrl: 'https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_877061_TABLET_LANDSCAPE_LARGE_16_9.jpg',
            info: 'Lakers vs hawks basketball game',
            venue: 'Staples center',
            date: '2019-02-23',
            time: '18:00:00',
            onClose: jest.fn()
        }

        mountedEventDetailsModal = undefined
    }) 

    it('should render a div', () => {
        mountedEventDetailsModal = mount(<EventDetailsModal {...props}/>)
        expect(mountedEventDetailsModal.find('div').length).toBeGreaterThan(0)
    })

    describe('when `error` is not null and defined', () => {
        beforeEach(() => {
            props.error = new Error('Internal server error')
        }) 

        it('should render a button', () => {
            mountedEventDetailsModal = mount(<EventDetailsModal {...props}/>)
            expect(mountedEventDetailsModal.find('button').length).toBeGreaterThan(0)
        })

        it('calls onClose event on click of button', () => {
            mountedEventDetailsModal = mount(<EventDetailsModal {...props}/>)
            
            mountedEventDetailsModal.find('button').simulate('click')
            expect(props.onClose).toBeCalled()
        })

        it('should render a error page', () => {
            mountedEventDetailsModal = mount(<EventDetailsModal {...props}/>)
            expect(mountedEventDetailsModal.find(ErrorPage).length).toBe(1)
        })
    })

    describe('when `error` is null', () => {
        it('should render a button', () => {
            mountedEventDetailsModal = mount(<EventDetailsModal {...props}/>)
            expect(mountedEventDetailsModal.find('button').length).toBeGreaterThan(0)
        })

        it('calls onClose event on click of button', () => {
            mountedEventDetailsModal = mount(<EventDetailsModal {...props}/>)
            
            mountedEventDetailsModal.find('button').simulate('click')
            expect(props.onClose).toBeCalled()
        })

        it('should set the `eventSlideRef`', () => {
            mountedEventDetailsModal = mount(<EventDetailsModal {...props}/>)
            expect(mountedEventDetailsModal.instance().eventSlideRef.current).not.toBe(null)
        })

        it('should render the event image', () => {
            mountedEventDetailsModal = mount(<EventDetailsModal {...props}/>)
            const eventImage = mountedEventDetailsModal.find('img')
            expect(eventImage.length).toBeGreaterThan(0)
            expect(eventImage.first().prop('src')).toBe(props.imageUrl)
        })

        describe('when `seatingImageUrl` is not null and defined', () => {
            it('should set the `seatingSlideRef`', () => {
                mountedEventDetailsModal = mount(<EventDetailsModal {...props}/>)
                expect(mountedEventDetailsModal.instance().seatingSlideRef.current).not.toBe(null)
            })

            it('should render the seating image', () => {
                mountedEventDetailsModal = mount(<EventDetailsModal {...props}/>)
                const eventImage = mountedEventDetailsModal.find('img')
                expect(eventImage.length).toBeGreaterThan(0)
                expect(eventImage.at(1).prop('src')).toBe(props.seatingImageUrl)
            })

            it('should render two slide dots', () => {
                mountedEventDetailsModal = mount(<EventDetailsModal {...props}/>)
                expect(mountedEventDetailsModal.find('span').length).toEqual(2)
            })

            it('should call `currentSlide` on click of slide dot', () => {
                mountedEventDetailsModal = mount(<EventDetailsModal {...props}/>)
                
                mountedEventDetailsModal.instance().currentSlide = jest.fn()
                mountedEventDetailsModal.instance().forceUpdate()

                const slideDots = mountedEventDetailsModal.find('span')
        
                const toggleCurrentSlideSpy = jest.spyOn(mountedEventDetailsModal.instance(), 'currentSlide')
                slideDots.at(0).simulate('click')
                slideDots.at(1).simulate('click')

                expect(toggleCurrentSlideSpy).toHaveBeenCalledTimes(2)
            })
        })

        describe('when `seatingImageUrl` is null', () => {
            beforeEach(() => {
                props.seatingImageUrl = null
            })

            it('should render only the event image', () => {
                mountedEventDetailsModal = mount(<EventDetailsModal {...props}/>)
                const eventImage = mountedEventDetailsModal.find('img')
                expect(eventImage.length).toEqual(1)
                expect(eventImage.prop('src')).toBe(props.imageUrl)
            })
        })

        it('should render the event name', () => {
            mountedEventDetailsModal = mount(<EventDetailsModal {...props}/>)
            expect(mountedEventDetailsModal.find('h4').text()).toEqual('Atlanta Hawks vs. Los Angeles Lakers')
        })

        it('should render the venue name', () => {
            mountedEventDetailsModal = mount(<EventDetailsModal {...props}/>)
            expect(mountedEventDetailsModal.find('h5').at(0).text()).toEqual('Staples center')
        })

        it('should render the date and time', () => {
            mountedEventDetailsModal = mount(<EventDetailsModal {...props}/>)
            const dateTime = new Date(`${props.date} ${props.time}`).toDateString()
            expect(mountedEventDetailsModal.find('h5').at(1).text()).toEqual(dateTime)
        })

        it('should render a link', () => {
            mountedEventDetailsModal = mount(<EventDetailsModal {...props}/>)
            expect(mountedEventDetailsModal.find('a').length).toBeGreaterThan(0)
        })

        describe('rendered link', () => {
            it('should set the href as the passed `url`', () => {
                mountedEventDetailsModal = mount(<EventDetailsModal {...props}/>)
                expect(mountedEventDetailsModal.find('a').prop('href')).toEqual(props.url)
            })
        })
    })
})