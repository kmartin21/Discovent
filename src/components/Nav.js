import React, { Component } from 'react'
import CountryList from '../components/CountryList'
import Logo from '../components/Logo'
import { Link } from 'react-router-dom';
import CountryLink from '../containers/CountryLink'
import countryCodes from '../constants/CountryCodes'

class Nav extends Component {

    navToggle = () => {

        let narrowCountryList = document.querySelector('.narrow-country-list');
        
		if (narrowCountryList.style.width === '0px') {
            narrowCountryList.style.width = '250px';
		} else {
            narrowCountryList.style.width = '0px';
		}
    }

    render() {
        return (
            <nav>
                <div className="nav-wide">
                    <CountryList />
                    <Logo />
                </div>

                <div className="nav-narrow"  onClick={this.navToggle}>
                    <Logo />
                    <div className="narrow-country-list">
                        <div>
                            <ul className="country-list__ul">
                                {countryCodes.map(code => (
                                    <li><Link key={code.code} to={`/${code.code}`}><CountryLink code={code.code} name={code.name}/></Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav