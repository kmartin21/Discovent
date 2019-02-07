import React from 'react'
import { shallow } from 'enzyme'
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

    describe('rendered list item', () => {
        it('`key` prop is set to the country code of the current iteration', () => {
            const listItems = shallowCountryList.find('li')
    
            for(let i = 0; i < countryCodes.length; i++) {
                expect(listItems.at(i).key()).toEqual(countryCodes[i].code)
            }
        })
    })

    it('always renders a `Link` for each item in the countryCodes array', () => {
        expect(shallowCountryList.find(Link).length).toEqual(countryCodes.length)
    })

    describe('rendered `Link`', () => {
        let shallowCountryList
        let linkItems
        beforeEach(() => {
            shallowCountryList = shallow(<CountryList />)
            linkItems = shallowCountryList.find(Link)
        })

        it('`key` prop is set to the country code of the current iteration', () => {
        
            for(let i = 0; i < countryCodes.length; i++) {
                expect(linkItems.at(i).key()).toEqual(countryCodes[i].code)
            }
        })

        it('`to` prop is set to `/(country code)` of the current iteration', () => {

            for(let i = 0; i < countryCodes.length; i++) {
                expect(linkItems.at(i).props().to).toEqual(`/${countryCodes[i].code}`)
            }
        })
    })

    it('always renders a `CountryLink` for each item in the countryCodes array', () => {
        expect(shallowCountryList.find(CountryLink).length).toEqual(countryCodes.length)
    })

    describe('rendered `CountryLink`', () => {
        let shallowCountryList
        let countryLinkItems
        beforeEach(() => {
            shallowCountryList = shallow(<CountryList />)
            countryLinkItems = shallowCountryList.find(CountryLink)
        })

        it('`code` prop is set to the country code of the current iteration', () => {
            
            for(let i = 0; i < countryCodes.length; i++) {
                expect(countryLinkItems.at(i).props().code).toEqual(countryCodes[i].code)
            }
        })

        it('`name` prop is set to the country name of the current iteration', () => {
            
            for(let i = 0; i < countryCodes.length; i++) {
                expect(countryLinkItems.at(i).props().name).toEqual(countryCodes[i].name)
            }
        })
    })
})



