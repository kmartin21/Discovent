import React from 'react'
import { shallow, mount } from 'enzyme'
import Logo from '../Logo'

describe('Logo', () => {
    let shallowLogo
    let props

    beforeEach(() => {
        props = {
            toggleNav: jest.fn()
        }
        shallowLogo = shallow(<Logo {...props}/>)
    })

    it('always renders a div', () => {
        expect(shallowLogo.find('div').length).toBeGreaterThan(0)
    })

    it('always renders a image', () => {
        expect(shallowLogo.find('img').length).toBeGreaterThan(0)
    })

    it('calls toggleNav event on click of nav bar collapsed icon', () => {
        let mountedEvent = mount(<Logo {...props}/>)
        
        mountedEvent.find('li').simulate('click')
        expect(props.toggleNav).toBeCalled()
    })

})