import React from 'react'
import { Link } from 'react-router-dom';
import CountryLink from '../containers/CountryLink'
import countryCodes from '../constants/CountryCodes'

const CountryList = () => (
    <div>
        {countryCodes.map(code => (
            <Link key={code.code} to={`/${code.code}`}><CountryLink code={code.code} name={code.name}/></Link>
        ))}
    </div>
)

export default CountryList