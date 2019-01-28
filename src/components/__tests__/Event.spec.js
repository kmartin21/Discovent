import React from 'react'
import Event from '../Event'
import { mount, shallow } from 'enzyme'
import TextEllipsis from 'react-text-ellipsis';

describe('Event', () => {
    let props
    let shallowEvent

    beforeEach(() => {
        props = {
            imageUrl: "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_ARTIST_PAGE_3_2.jpg",
            name: "Rock concert",
            onClick: jest.fn()
        }
        shallowEvent = shallow(<Event {...props} />)
    })

    it('always renders a div', () => {
        expect(shallowEvent.find('div').length).toBeGreaterThan(0)
    })

    it('always sets the event image as the passed in imageUrl', () => {
        const wrappingDiv = shallowEvent.find('img')
        expect(wrappingDiv.prop('src')).toBe(props.imageUrl)
    })

    it('calls onClick event on click of image', () => {
        let mountedEvent = mount(<Event {...props}/>)
        mountedEvent.find('img').simulate('click')
        expect(props.onClick).toBeCalled()
    })

    it('always renders `TextEllipsis`', () => {
        expect(shallowEvent.find(TextEllipsis).length).toBeGreaterThan(0)
    })
})





