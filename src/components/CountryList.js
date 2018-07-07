import React from 'react'
import { Link } from 'react-router-dom';
import CountryLink from '../containers/CountryLink'
import countryCodes from '../constants/CountryCodes'
import '../styles/main.css'

const CountryList = () => (
    <div className="wrapper">
        <div className="country-list">
            <img src= {require('../images/logo.png')} className='country-list__logo'/>
            <ul className="country-list__ul">
                {countryCodes.map(code => (
                    <li><Link key={code.code} to={`/${code.code}`}><CountryLink code={code.code} name={code.name}/></Link></li>
                ))}
            </ul>
        </div>
    </div>
)

export default CountryList