import React from 'react'
import { Link } from 'react-router-dom';
import CountryLink from '../containers/CountryLink'
import countryCodes from '../constants/CountryCodes'
import '../styles/main.css'

const CountryList = () => (
    <div className="country-list-container">
        <ul className="country-list">
            {countryCodes.map(code => (
                <li key={code.code} className="country-list__item">
                    <Link key={code.code} to={`/${code.code}`}><CountryLink code={code.code} name={code.name}/></Link>
                </li>
            ))}
        </ul>
    </div>
)

export default CountryList