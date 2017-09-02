import React, { Component } from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'

import Bundle from '../Bundle/Bundle'
import Login from 'bundle-loader?lazy&name=bundle-[name]!../Login/Login'
import Logout from 'bundle-loader?lazy&name=bundle-[name]!../Logout/Logout'
import Signup from 'bundle-loader?lazy&name=bundle-[name]!../Signup/Signup'
import About from 'bundle-loader?lazy&name=bundle-[name]!../About/About'
import Posts from 'bundle-loader?lazy&name=bundle-[name]!../Posts/Posts'
import Rows from 'bundle-loader?lazy&name=bundle-[name]!../Rows/Rows'
import PostDetail from 'bundle-loader?lazy&name=bundle-[name]!../PostDetail/PostDetail'
import RowHandler from 'bundle-loader?lazy&name=bundle-[name]!../RowHandler/RowHandler'
import NotFound from 'bundle-loader?lazy&name=bundle-[name]!../NotFound/NotFound'
import posts from '../../blog-posts.json'
import Auth from '../../modules/Auth'

const LazyAbout = (props) => (
  <Bundle load={About}>
    {LazyAbout => <LazyAbout {...props} />}
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

const LazyPosts = (props) => (
  <Bundle load={Posts}>
    {LazyPosts => <LazyPosts {...props} />}
  </Bundle>
)

const LazyRows = (props) => (
  <Bundle load={Rows}>
    {LazyRows => <LazyRows {...props} />}
  </Bundle>
)

const LazyPostDetail = (props) => (
  <Bundle load={PostDetail}>
    {LazyPostDetail => <LazyPostDetail {...props} />}
  </Bundle>
)

const LazyRowHandler = (props) => (
  <Bundle load={RowHandler}>
    {LazyRowHandler => <LazyRowHandler {...props} />}
  </Bundle>
)

const LazyNotFound = (props) => (
  <Bundle load={NotFound}>
    {LazyNotFound => <LazyNotFound {...props} />}
  </Bundle>
)

class Routes extends Component {
  componentDidMount () {
    About(() => {})
    Login(() => {})
    Logout(() => {})
    Signup(() => {})
    Posts(() => {})
    Rows(() => {})
    PostDetail(() => {})
    RowHandler(() => {})
    NotFound(() => {})
  }

  render () {
    return (
      <Switch>
        {!Auth.isUserAuthenticated() && <Route path='/' component={LazyLogin} />}
        <Route exact path='/' render={() => (
          <h2>Welcome to my Blog! My Web App SW should update automatically...!</h2>
        )} />
        <Route path='/login' component={LazyLogin} />
        <Route path='/logout' component={LazyLogout} />
        <Route path='/signup' component={LazySignup} />
        <Route path='/posts/:slug' component={(props) => <LazyPostDetail posts={posts} match={props.match} />} />
        <Route path='/posts' component={() => <LazyPosts posts={posts} />} />
        <Route path='/rows/:id' component={LazyRowHandler} />
        <Route path='/rows' component={() => <LazyRows />} />
        <Route exact path='/about' component={LazyAbout} />
        <Route component={() => <LazyNotFound message='Url does not exist' />} />
        <style jsx>{`
        `}</style>
      </Switch>
    )
  }
}

export default Routes
