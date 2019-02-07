import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import { Route } from 'react-router-dom'
import App from '../App'
import Nav from '../../components/Nav'
import { EventsTable }  from '../EventsTable'
import ErrorPage from '../../components/ErrorPage'
import TestProvider from '../../setupTests'

describe('App', () => {

    describe('A valid path with no parameters', () => {
        const mountedApp = mount(
            <TestProvider>
                <MemoryRouter initialEntries={[ '/' ]}>
                    <Route component={App} />
                </MemoryRouter>
            </TestProvider> 
        )

        it('always renders a redirect to /US', () => {
            expect(mountedApp.find(App).props().location.pathname).toBe("/US")
            mountedApp.unmount()
        })
    })

    describe('A valid path with a parameter that matches a countryCode in the countryCode array', () => {
        const mountedApp = mount(
            <TestProvider>
                <MemoryRouter initialEntries={[ '/ES' ]}>
                    <Route component={App} />
                </MemoryRouter>
            </TestProvider> 
        )

        it('always renders a div', () => {
            expect(mountedApp.find('div').length).toBeGreaterThan(0)
        })

        it('always renders a `Nav`', () => {
            expect(mountedApp.find(Nav)).toHaveLength(1)
        })

        describe('rendered `Nav`', () => {
            it('does not recieve any props', () => {
                const nav = mountedApp.find(Nav)
                expect(Object.keys(nav.props()).length).toBe(0)
            })
        })

        it('always renders a `EventsTable`', () => {
            expect(mountedApp.find(EventsTable)).toHaveLength(1)
        })

        it('sets the `EventsTable` `countryCode` prop as the parameter', () => {
            const eventsTable = mountedApp.find(EventsTable)
            
            expect(eventsTable.props().countryCode).toEqual('ES')
            mountedApp.unmount()
        }) 
    })

    describe('A valid path with a parameter that does not matche a countryCode in the countryCode array', () => {
        const mountedApp = mount(
            <TestProvider>
                <MemoryRouter initialEntries={[ '/FOO' ]}>
                    <Route component={App} />
                </MemoryRouter>
            </TestProvider> 
        )

        it('always renders a div', () => {
            expect(mountedApp.find('div').length).toBeGreaterThan(0)
        })

        it('always renders a `Nav`', () => {
            expect(mountedApp.find(Nav)).toHaveLength(1)
        })

        describe('rendered `Nav`', () => {
            it('does not recieve any props', () => {
                const nav = mountedApp.find(Nav)
                expect(Object.keys(nav.props()).length).toBe(0)
            })
        })

        it('always renders a `ErrorPage`', () => {
            expect(mountedApp.find(ErrorPage)).toHaveLength(1)
        })

        it('sets the `ErrorPage` `errorMessage` prop with a error message', () => {
            const errorPage = mountedApp.find(ErrorPage)
            
            expect(errorPage.props().errorMessage).toBeDefined()
            mountedApp.unmount()
        }) 
    })

    describe('A invalid path', () => {
        const mountedApp = mount(
            <TestProvider>
                <MemoryRouter initialEntries={[ '/FOO/BAR' ]}>
                    <Route component={App} />
                </MemoryRouter>
            </TestProvider> 
        )

        it('always renders a div', () => {
            expect(mountedApp.find('div').length).toBeGreaterThan(0)
        })

        it('always renders a `ErrorPage`', () => {
            expect(mountedApp.find(ErrorPage)).toHaveLength(1)
        })

        it('sets the `ErrorPage` `errorMessage` prop with a error message', () => {
            const errorPage = mountedApp.find(ErrorPage)
            
            expect(errorPage.props().errorMessage).toBeDefined()
            mountedApp.unmount()
        }) 
    })
    
})



