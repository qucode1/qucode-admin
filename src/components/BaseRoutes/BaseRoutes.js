import React, { Component } from 'react'
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import Bundle from '../Bundle/Bundle'
import Login from 'bundle-loader?lazy&name=bundle-[name]!../Login/Login'
import Logout from 'bundle-loader?lazy&name=bundle-[name]!../Logout/Logout'
import Signup from 'bundle-loader?lazy&name=bundle-[name]!../Signup/Signup'
import About from 'bundle-loader?lazy&name=bundle-[name]!../About/About'
import CMS from 'bundle-loader?lazy&name=bundle-[name]!../CMS/CMS'
import Sidebar from 'bundle-loader?lazy&name=bundle-[name]!../Sidebar/Sidebar'
import Routes from 'bundle-loader?lazy&name=bundle-[name]!../Routes/Routes'
import NotFound from 'bundle-loader?lazy&name=bundle-[name]!../NotFound/NotFound'
import Auth from '../../modules/Auth'

const LazyAbout = (props) => (
  <Bundle load={About}>
    {LazyAbout => <LazyAbout {...props} />}
  </Bundle>
)

const LazyCMS = (props) => (
  <Bundle load={CMS}>
    {LazyCMS => <LazyCMS {...props} />}
  </Bundle>
)

const LazySidebar = (props) => (
  <Bundle load={Sidebar}>
    {LazySidebar => <LazySidebar {...props} />}
  </Bundle>
)

const LazyRoutes = (props) => (
  <Bundle load={Routes}>
    {LazyRoutes => <LazyRoutes {...props} />}
  </Bundle>
)

const LazyLogin = (props) => (
  <Bundle load={Login}>
    {LazyLogin => <LazyLogin {...props} />}
  </Bundle>
)

const LazyLogout = (props) => (
  <Bundle load={Logout}>
    {LazyLogout => <LazyLogout {...props} />}
  </Bundle>
)

const LazySignup = (props) => (
  <Bundle load={Signup}>
    {LazySignup => <LazySignup {...props} />}
  </Bundle>
)

const LazyNotFound = (props) => (
  <Bundle load={NotFound}>
    {LazyNotFound => <LazyNotFound {...props} />}
  </Bundle>
)

class BaseRoutes extends Component {
  componentDidMount () {
    About(() => {})
    Login(() => {})
    Logout(() => {})
    Signup(() => {})
    NotFound(() => {})
  }

  render () {
    return (
      <Switch>
        {!Auth.isUserAuthenticated() && <Route path='/login' component={LazyLogin} />}
        {!Auth.isUserAuthenticated() && <Route path='/signup' component={LazySignup} />}
        {!Auth.isUserAuthenticated() && <Route path='/' render={() => (
          <Redirect push to='/login' />
        )} />}
        <Route exact path='/' render={() => (
          <h2>Welcome to the QuCode Admin Panel!</h2>
        )} />
        <Route path='/logout' component={LazyLogout} />
        {Auth.isUserAuthenticated() && <Route path="/login" render={() => (
          <Redirect to="/cms" />
        )} />}
        <Route path='/cms' component={(props) => (
          <LazyCMS>
            <LazySidebar />
            <LazyRoutes />
          </LazyCMS>
        )}/>
        <Route exact path='/about' component={LazyAbout} />
        <Route component={() => <LazyNotFound message='Url does not exist' />} />
        <style jsx>{`
        `}</style>
      </Switch>
    )
  }
}

export default BaseRoutes
