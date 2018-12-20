import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Nav from '../components/Nav'
import EventsTable from './EventsTable'
import countryCodes from '../constants/CountryCodes'
import ErrorPage from '../components/ErrorPage'
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
                  <div>
                    <div className='nav-container'>
                      <Nav />
                    </div>
                    <div className='main-container'>
                      <EventsTable countryCode={match.params.code} />
                    </div>
                  </div>
                )
            } else {
                return (
                  <div>
                    <div className='nav-container'>
                      <Nav />
                    </div>
                    <ErrorPage errorMessage="404. Looks like you're a bit lost, we couldn't find that page."/>
                  </div>
                )
            }
            
          }
        } />
        <Route path="*" render={ () => {
                return (
                  <div>
                    <ErrorPage errorMessage="404. Looks like you're a bit lost, we couldn't find that page."/>
                  </div>
                )
            }} />
      </Switch>
    </div>
  </Router>
)

export default App