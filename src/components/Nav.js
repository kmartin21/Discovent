import React, { Component } from 'react'
import CountryList from '../components/CountryList'
import Logo from '../components/Logo'

class Nav extends Component {

    navToggle = () => {

        let narrowCountryList = document.querySelector('.narrow-country-list');
        
		if (narrowCountryList.style.width === '0px') {
            narrowCountryList.style.width = '200px';
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
                            <CountryList />
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav