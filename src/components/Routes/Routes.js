import React, { Component } from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'

import Bundle from      '../Bundle/Bundle'
import Login from       'bundle-loader?lazy&name=bundle-[name]!../Login/Login'
import Logout from      'bundle-loader?lazy&name=bundle-[name]!../Logout/Logout'
import Signup from      'bundle-loader?lazy&name=bundle-[name]!../Signup/Signup'
import About from       'bundle-loader?lazy&name=bundle-[name]!../About/About'
import Posts from       'bundle-loader?lazy&name=bundle-[name]!../Posts/Posts'
import Projects from    'bundle-loader?lazy&name=bundle-[name]!../Projects/Projects'
import AddProject from  'bundle-loader?lazy&name=bundle-[name]!../Forms/ProjectForm'
import Rows from        'bundle-loader?lazy&name=bundle-[name]!../Rows/Rows'
import Row from         'bundle-loader?lazy&name=bundle-[name]!../Row/Row'
import PostDetail from  'bundle-loader?lazy&name=bundle-[name]!../PostDetail/PostDetail'
import RowHandler from  'bundle-loader?lazy&name=bundle-[name]!../RowHandler/RowHandler'
import NotFound from    'bundle-loader?lazy&name=bundle-[name]!../NotFound/NotFound'
import posts from       '../../blog-posts.json'
import Auth from        '../../modules/Auth'

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

const LazyProjects = (props) => (
  <Bundle load={Projects}>
    {LazyProjects => <LazyProjects {...props} />}
  </Bundle>
)

const LazyAddProject = (props) => (
  <Bundle load={AddProject}>
    {LazyAddProject => <LazyAddProject {...props} />}
  </Bundle>
)

const LazyRows = (props) => (
  <Bundle load={Rows}>
    {LazyRows => <LazyRows {...props} />}
  </Bundle>
)

const LazyRow = (props) => (
  <Bundle load={Row}>
    {LazyRow => <LazyRow {...props} />}
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
    Projects(() => {})
    AddProject(() => {})
    Rows(() => {})
    Row(() => {})
    PostDetail(() => {})
    RowHandler(() => {})
    NotFound(() => {})
  }

  render () {
    return (
      <Switch>
        {!Auth.isUserAuthenticated() && <Route path='/' component={LazyLogin} />}
        <Route exact path='/cms' render={() => (
          <h2>Welcome to my CMS!</h2>
        )} />
        <Route
          path='/cms/blog/posts/:slug' 
          component={(props) => <LazyPostDetail
            posts={posts}
            match={props.match} />} />
        <Route
          path='/cms/blog/posts'
          component={() => <LazyPosts posts={posts} />} />
        <Route
          path='/cms/rows/new'
          component={() => <LazyRow name='New Row' details newRow/>} />
        <Route
          path='/cms/rows/:id'
          component={LazyRowHandler} />
        <Route
          path='/cms/rows'
          component={() => <LazyRows />} />
        <Route
          path='/cms/projects/add'
          component={() => <LazyAddProject /> } />
        <Route
          path='/cms/projects/:id'
          component={(props) => <LazyAddProject
            edit
            project={props.location.state}
            match={props.match}/> } />
        <Route
          path='/cms/projects'
          component={() => <LazyProjects /> } />
        <Route
          component={() => <LazyNotFound message='Url does not exist' />} />
        <style jsx>{`
        `}</style>
      </Switch>
    )
  }
}

export default Routes
