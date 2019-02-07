import React from 'react'
import Nav from '../Nav'
import CountryList from '../CountryList'
import Logo from '../Logo'
import { shallow, mount } from 'enzyme'
import TestProvider from '../../setupTests'
import { MemoryRouter } from 'react-router'
import { Route } from 'react-router-dom'
import App from '../../containers/App'
import { BrowserRouter as Router } from 'react-router-dom';

describe('Nav', () => {
    let shallowNav

    beforeEach(() => {
        shallowNav = shallow(<Nav />)
    })

    it('always renders a nav', () => {
        expect(shallowNav.find('nav').length).toBeGreaterThan(0)
    })

    it('always renders a `CountryList`', () => {
        expect(shallowNav.find(CountryList).length).toBeGreaterThan(0)
    })

    it('always renders a `Logo`', () => {
        expect(shallowNav.find(Logo).length).toBeGreaterThan(0)
    })

    describe('when div with .nav--narrow class is displayed', () => {
        it('always calls toggleNav on click of `Logo`', () => {
            const mountedApp = mount(
                <TestProvider>
                    <MemoryRouter initialEntries={[ '/US' ]}>
                        <Route component={App} />
                    </MemoryRouter>
                </TestProvider> 
            )
    
            const mountedNav = mountedApp.find(Nav)
            mountedNav.instance().toggleNav = jest.fn()
            mountedNav.instance().forceUpdate()
    
            const toggleNavSpy = jest.spyOn(mountedNav.instance(), 'toggleNav')
            mountedNav.find('div.nav--narrow').find(Logo).find('li').simulate('click')
            expect(toggleNavSpy).toHaveBeenCalled()
            mountedApp.unmount()
        })
    })
})