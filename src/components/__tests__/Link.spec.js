import React from 'react'
import Link from '../Link'
import { shallow, mount } from 'enzyme'

describe('Link', () => {
    let props
    let shallowLink

    beforeEach(() => {
        props = {
            active: false,
            name: 'US',
            onClick: jest.fn()
        }
        shallowLink = shallow(<Link {...props}/>)
    })

    it('always renders a div', () => {
        expect(shallowLink.find('div').length).toBeGreaterThan(0)
    })

    it('always renders a button', () => {
        expect(shallowLink.find('button').length).toBeGreaterThan(0)
    })

    it('calls onClick event on click of button', () => {
        let mountedLink = mount(<Link {...props}/>)
        
        mountedLink.find('button').simulate('click')
        expect(props.onClick).toBeCalled()
    })

})