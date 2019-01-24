import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import App from '../App'
import Nav from '../../components/Nav'
import { EventsTable }  from '../EventsTable'
import ErrorPage from '../../components/ErrorPage'
import TestProvider from '../../setupTests'
import configureStore from '../../store/configureStore'

describe('App', () => {
    
    it('should render a <div />', () => {
        const wrapper = mount(
            <TestProvider>
                <MemoryRouter initialEntries={[ '/' ]}>
                    <App />
                </MemoryRouter>
            </TestProvider> 
        )

        expect(wrapper.find('div').length).toBeGreaterThan(0)
        wrapper.unmount()
    })
})



