import React from 'react'
import ErrorPage from '../ErrorPage'
import { shallow } from 'enzyme'

describe('ErrorPage', () => {
    let props
    let shallowErrorPage

    beforeEach(() => {
        props = {
            errorMessage: "404. Looks like you're a bit lost, we couldn't find that page."
        }
        shallowErrorPage = shallow(<ErrorPage {...props} />)
    })

    it('always renders a div', () => {
        expect(shallowErrorPage.find('div').length).toBeGreaterThan(0)
    })
})
