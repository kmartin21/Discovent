import React from 'react'
import { mount, shallow } from 'enzyme'
import CountryList from '../CountryList'
import countryCodes from '../../constants/CountryCodes'
import { Link } from 'react-router-dom';
import CountryLink from '../../containers/CountryLink'

describe('CountryList', () => {
    let shallowCountryList

    beforeEach(() => shallowCountryList = shallow(<CountryList />))

    it('always renders a div', () => {
        expect(shallowCountryList.find('div').length).toBeGreaterThan(0)
    })

    it('always renders a list', () => {
        expect(shallowCountryList.find('ul').length).toBeGreaterThan(0)
    })

    it('always renders a list item for each item in the countryCodes array', () => {
        expect(shallowCountryList.find('li').length).toEqual(countryCodes.length)
    })

    it('sets each list items `key` prop to the country code of the current iteration', () => {
        const listItems = shallowCountryList.find('li')

        for(let i = 0; i < countryCodes.length; i++) {
            expect(listItems.at(i).key()).toEqual(countryCodes[i].code)
        }
    })

    it('always renders a `Link` for each item in the countryCodes array', () => {
        expect(shallowCountryList.find(Link).length).toEqual(countryCodes.length)
    })

    it('always renders a `CountryLink` for each item in the countryCodes array', () => {
        expect(shallowCountryList.find(CountryLink).length).toEqual(countryCodes.length)
    })
})



