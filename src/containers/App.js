import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import CountryList from '../components/CountryList'
import EventsTable from './EventsTable'
import countryCodes from '../constants/CountryCodes'
import PageNotFound from '../components/PageNotFound'
import '../styles/main.css'

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/:code?' render={ ({ match }) => {
            if (!match.params.code) {
              return <Redirect to="/US" />
            }
          
            if (countryCodes.find(code => code.code === match.params.code)) {
                return (
                  <div className='main-container'>
                    <CountryList />
                    <EventsTable countryCode={match.params.code} />
                  </div>
                )
            } else {
                return <PageNotFound />
            }
          }
        } />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </Router>
)

export default App