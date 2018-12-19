import React, { Component } from 'react'
import CountryList from '../components/CountryList'
import Logo from '../components/Logo'

class Nav extends Component {

    navToggle = () => {

        let narrowCountryList = document.querySelector('.country-list-container--narrow');
        
		if (narrowCountryList.style.width === '0px') {
            narrowCountryList.style.width = '200px';
		} else {
            narrowCountryList.style.width = '0px';
		}
    }

    render() {
        return (
            <nav>
                <div className="nav--wide">
                    <CountryList />
                    <Logo />
                </div>

                <div className="nav--narrow"  onClick={this.navToggle}>
                    <Logo />
                    <div className="country-list-container--narrow">
                            <CountryList />
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav